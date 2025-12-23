#!/bin/bash
# LGM Pixel Streaming Development Environment
# This script sets up a local development environment with:
# - HTTPS for WebRTC camera/mic access
# - Hot reload for lgm_metahuman frontend
# - Auto-rebuild of signalling server on changes
# - All dependencies built and linked

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() { echo -e "${GREEN}[DEV]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }

# Check for required tools
check_requirements() {
    log "Checking requirements..."

    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        error "npm is not installed"
        exit 1
    fi

    if ! command -v openssl &> /dev/null; then
        error "openssl is not installed (needed for SSL certificates)"
        exit 1
    fi

    # Check for concurrently (will install if missing)
    if ! npm list -g concurrently &> /dev/null; then
        warn "Installing concurrently globally..."
        npm install -g concurrently
    fi

    # Check for nodemon (will install if missing)
    if ! npm list -g nodemon &> /dev/null; then
        warn "Installing nodemon globally..."
        npm install -g nodemon
    fi

    log "Requirements satisfied"
}

# Generate SSL certificates if they don't exist
ensure_certificates() {
    local cert_dir="$SCRIPT_DIR/SignallingWebServer/certificates"

    if [ ! -f "$cert_dir/client-key.pem" ] || [ ! -f "$cert_dir/client-cert.pem" ]; then
        log "Generating SSL certificates for HTTPS..."
        mkdir -p "$cert_dir"
        cd "$cert_dir"

        # Generate private key
        openssl genrsa -out client-key.pem 2048 2>/dev/null

        # Generate self-signed certificate
        openssl req -new -x509 -key client-key.pem -out client-cert.pem -days 365 \
            -subj "/C=US/ST=Dev/L=Local/O=LGM/CN=localhost" \
            -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" 2>/dev/null

        cd "$SCRIPT_DIR"
        log "SSL certificates generated"
        warn "You may need to accept the self-signed certificate warning in your browser"
    else
        log "SSL certificates exist"
    fi
}

# Install dependencies for all packages
install_deps() {
    log "Installing dependencies..."

    # Common library
    log "  Installing Common dependencies..."
    (cd Common && npm install)

    # Signalling library
    log "  Installing Signalling dependencies..."
    (cd Signalling && npm install)

    # Frontend library
    log "  Installing Frontend library dependencies..."
    (cd Frontend/library && npm install)

    # lgm_metahuman frontend
    log "  Installing lgm_metahuman dependencies..."
    (cd Frontend/implementations/lgm_metahuman && npm install)

    # SignallingWebServer
    log "  Installing SignallingWebServer dependencies..."
    (cd SignallingWebServer && npm install)

    log "Dependencies installed"
}

# Build all packages in correct order
build_all() {
    log "Building all packages..."

    # 1. Common library
    log "  Building Common..."
    (cd Common && npm run build:cjs && npm run build:esm)

    # 2. Signalling library
    log "  Building Signalling..."
    (cd Signalling && npm run build)

    # 3. Frontend library
    log "  Building Frontend library..."
    (cd Frontend/library && npm run build)

    # 4. SignallingWebServer
    log "  Building SignallingWebServer..."
    (cd SignallingWebServer && npm run build)

    # 5. lgm_metahuman frontend
    log "  Building lgm_metahuman frontend..."
    (cd Frontend/implementations/lgm_metahuman && npm run build)

    log "All packages built"
}

# Start development servers
start_dev() {
    ensure_certificates

    log "Starting development environment..."
    info ""
    info "╔════════════════════════════════════════════════════════════╗"
    info "║           LGM Pixel Streaming Dev Environment              ║"
    info "╠════════════════════════════════════════════════════════════╣"
    info "║  Frontend:         https://localhost:3000                  ║"
    info "║  SignallingServer: https://localhost:8443 (WebSocket)      ║"
    info "║                                                            ║"
    info "║  Streamer Ports: 8888, 8890, 8891, 8892                    ║"
    info "║                                                            ║"
    info "║  NOTE: Accept the self-signed certificate warning          ║"
    info "║        in your browser for both URLs                       ║"
    info "║                                                            ║"
    info "║  Press Ctrl+C to stop all services                         ║"
    info "╚════════════════════════════════════════════════════════════╝"
    info ""

    # Run concurrently:
    # 1. SignallingWebServer with nodemon (rebuilds on TS changes)
    # 2. Frontend dev server with hot reload and proxy
    concurrently \
        --names "SIGNAL,FRONTEND" \
        --prefix-colors "blue,magenta" \
        --kill-others \
        --handle-input \
        "cd SignallingWebServer && nodemon --signal SIGTERM --watch src --watch ../Signalling/dist -e ts,js,json --exec 'npm run build && node ./dist/index.js'" \
        "cd Frontend/implementations/lgm_metahuman && npm run serve -- --port 3000 --host 0.0.0.0"
}

# Quick start (skip install if node_modules exist)
quick_start() {
    log "Quick start mode - checking if build is needed..."

    ensure_certificates

    # Check if builds exist
    if [ ! -d "Common/dist" ] || [ ! -d "Signalling/dist" ] || [ ! -d "SignallingWebServer/dist" ]; then
        warn "Some packages not built, running full build..."
        install_deps
        build_all
    else
        log "Builds found, skipping initial build"
    fi

    start_dev
}

# Watch mode for libraries (rebuilds libraries on change)
start_dev_watch() {
    ensure_certificates

    log "Starting development environment with library watching..."
    info ""
    info "╔════════════════════════════════════════════════════════════╗"
    info "║      LGM Pixel Streaming Dev Environment (Watch Mode)      ║"
    info "╠════════════════════════════════════════════════════════════╣"
    info "║  Frontend:         https://localhost:3000                  ║"
    info "║  SignallingServer: https://localhost:8443 (WebSocket)      ║"
    info "║                                                            ║"
    info "║  Watching: Common, Signalling, Frontend/library            ║"
    info "║                                                            ║"
    info "║  NOTE: Accept the self-signed certificate warning          ║"
    info "║        in your browser for both URLs                       ║"
    info "║                                                            ║"
    info "║  Press Ctrl+C to stop all services                         ║"
    info "╚════════════════════════════════════════════════════════════╝"
    info ""

    concurrently \
        --names "COMMON,SIGNAL-LIB,FE-LIB,SIGNAL-SRV,FRONTEND" \
        --prefix-colors "gray,cyan,green,blue,magenta" \
        --kill-others \
        --handle-input \
        "cd Common && npm run watch" \
        "cd Signalling && npm run watch" \
        "cd Frontend/library && npm run watch" \
        "cd SignallingWebServer && nodemon --signal SIGTERM --watch src --watch ../Signalling/dist -e ts,js,json --exec 'npm run build && node ./dist/index.js'" \
        "cd Frontend/implementations/lgm_metahuman && npm run serve -- --port 3000 --host 0.0.0.0"
}

# Print usage
usage() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start       Full setup: install deps, build all, start dev servers"
    echo "  quick       Quick start: skip install if node_modules exist"
    echo "  watch       Start with library watching (rebuilds Common/Signalling/Frontend on change)"
    echo "  build       Build all packages"
    echo "  install     Install all dependencies"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start    # First time setup"
    echo "  $0 quick    # Quick restart"
    echo "  $0 watch    # Full watch mode (for library development)"
}

# Main
case "${1:-start}" in
    start)
        check_requirements
        install_deps
        build_all
        start_dev
        ;;
    quick)
        check_requirements
        quick_start
        ;;
    watch)
        check_requirements
        install_deps
        build_all
        start_dev_watch
        ;;
    build)
        build_all
        ;;
    install)
        install_deps
        ;;
    help|--help|-h)
        usage
        ;;
    *)
        error "Unknown command: $1"
        usage
        exit 1
        ;;
esac
