@echo off
setlocal enabledelayedexpansion

REM Set variables
set "download_url=https://github.com/vidklopcic/PixelStreamingInfrastructure/tarball/UE5.4"
set "tarball_name=PixelStreamingInfrastructure.tar.gz"
set "extract_dir=PixelStreamingInfrastructure"

REM Delete existing PixelStreamingInfrastructure directory if it exists
if exist "%extract_dir%" (
    echo Removing existing PixelStreamingInfrastructure directory...
    rmdir /s /q "%extract_dir%"
)

REM Step 1: Download the tarball
echo Downloading PixelStreamingInfrastructure...
curl -L "%download_url%" -o "%tarball_name%"

REM Step 2: Create the extract directory and extract the tarball
echo Extracting the tarball...
mkdir "%extract_dir%"
tar -xzf "%tarball_name%" -C "%extract_dir%" --strip-components=1

REM Step 3: Navigate to LGMWebServer and run npm install and build
echo Running npm install and build in LGMWebServer...
cd "%extract_dir%\LGMWebServer"
call npm.cmd install
call npm.cmd run build

REM Step 4: Copy relevant scripts
cd ..
copy "Scripts\run_signalling.bat" "..\"

echo Deployment completed successfully!

REM Clean up
cd ..
del "%tarball_name%"

endlocal