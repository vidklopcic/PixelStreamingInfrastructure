import React, { CSSProperties, useEffect, useRef } from 'react';

interface LgmEmotionWheelProps {
    onEmotionSelected: (emotion: string, intensity: number) => void;
    size?: number;
    style?: CSSProperties;
}

export const LgmEmotionWheel: React.FC<LgmEmotionWheelProps> = ({ style, onEmotionSelected, size = 400 }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            const sections = svgRef.current.getElementById('sections');

            if (sections) {
                // Clone and rotate sections to create the full wheel
                for (let i = 1; i < 6; i++) {
                    const clone = sections.cloneNode(true) as any;
                    clone.setAttribute('transform', `rotate(${i * 60})`);
                    sections.parentNode?.appendChild(clone);
                }

                // Add event listeners to each section
                const allSections = svgRef.current.querySelectorAll('.section, .inner-circle');
                allSections.forEach((section) => {
                    section.addEventListener('click', (e) => {
                        const target = e.target as SVGElement;
                        const emotion = target.getAttribute('data-emotion') || 'NEUTRAL';
                        const intensity = calculateIntensity(target);
                        onEmotionSelected(emotion, intensity);

                        section.classList.add('flash');
                        setTimeout(() => {
                            section.classList.remove('flash');
                        }, 300);
                    });
                });
            }
        }
    }, [onEmotionSelected]);

    const calculateIntensity = (element: SVGElement): number => {
        const classNames = element.getAttribute('class')?.split(' ') || [];
        if (classNames.includes('inner-circle')) return 0;
        if (classNames.includes('section-1')) return 1;
        if (classNames.includes('section-2')) return 2;
        return 3; // outermost section
    };

    const emotions = ['SURPRISE', 'HAPPY', 'ANGER', 'DISGUST', 'SADNESS', 'FEAR'];

    return (
        <div style={{ ...ContainerStyle, width: size, height: size, ...style }}>
            <svg
                width={size}
                height={size}
                viewBox="-200 -200 400 400"
                ref={svgRef}
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                <style>
                    {`
            .section, .inner-circle {
              fill: transparent;
              stroke: white;
              stroke-width: 1;
              cursor: pointer;
            }
            .section:hover, .inner-circle:hover {
              fill: rgba(255, 255, 255, 0.1);
            }
            .flash {
              animation: flashAnimation 0.3s ease-in-out;
            }
            @keyframes flashAnimation {
              0% {
                fill: rgba(255, 255, 255, 0.1);
              }
              50% {
                fill: rgba(255, 255, 255, 1);
              }
              100% {
                fill: rgba(255, 255, 255, 0.1);
              }
            }
            .emotion-label {
              pointer-events: none;
              font-size: 14px;
              fill: white;
              text-anchor: middle;
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
            }
          `}
                </style>
                {/* Circles */}
                <circle r="180" fill="none" stroke="white" />
                <circle r="135" fill="none" stroke="white" />
                <circle r="90" fill="none" stroke="white" />
                {/* Innermost circle (hoverable) */}
                <circle className="inner-circle" r="45" data-emotion="NEUTRAL" />
                {/* Sections */}
                <g id="sections">
                    <path
                        className="section section-1"
                        d="M0,-45 L0,-90 A90,90 0 0,1 77.94,-45 L38.97,-22.5 A45,45 0 0,0 0,-45 Z"
                        data-emotion={emotions[0]}
                    />
                    <path
                        className="section section-2"
                        d="M0,-90 L0,-135 A135,135 0 0,1 116.91,-67.5 L77.94,-45 A90,90 0 0,0 0,-90 Z"
                        data-emotion={emotions[0]}
                    />
                    <path
                        className="section section-3"
                        d="M0,-135 L0,-180 A180,180 0 0,1 155.88,-90 L116.91,-67.5 A135,135 0 0,0 0,-135 Z"
                        data-emotion={emotions[0]}
                    />
                </g>
                {/* Emotion Labels */}
                {emotions.map((emotion, index) => {
                    let angle = index * 60 - 60; // Base angle, shifted by 30 degrees
                    let radians = (angle * Math.PI) / 180;
                    let x = Math.cos(radians) * 185;
                    let y = Math.sin(radians) * 185;
                    let rotate = angle + 90;

                    // Adjust "ANGER" and "DISGUST" labels
                    if ([60, 120].includes(angle)) {
                        rotate -= -180;
                        y += 8;
                        x += angle == 60 ? 4 : -4;
                    }

                    return (
                        <text
                            key={emotion}
                            x={x}
                            y={y}
                            className="emotion-label"
                            transform={`rotate(${rotate}, ${x}, ${y})`}
                        >
                            {emotion}
                        </text>
                    );
                })}
                {/* NEUTRAL label in the center */}
                <text x="0" y="5" className="emotion-label">
                    NEUTRAL
                </text>
            </svg>
        </div>
    );
};

const ContainerStyle: CSSProperties = {
    backgroundColor: 'transparent',
    display: 'inline-block',
    aspectRatio: '1 / 1'
};