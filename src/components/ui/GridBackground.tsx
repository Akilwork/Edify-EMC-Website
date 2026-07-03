"use client";

import React from "react";

interface GridBackgroundProps {
  className?: string;
  lineColor?: string;
  dotColor?: string;
  gridSize?: number;
  dotSize?: number;
  showVignette?: boolean;
  vignetteIntensity?: number; // 0-100, higher = more fade at edges
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  className = "",
  lineColor = "rgba(255, 255, 255, 0.05)",
  dotColor = "rgba(255, 255, 255, 0.1)",
  gridSize = 50,
  dotSize = 1.5,
  showVignette = true,
  vignetteIntensity = 70,
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Grid with dots */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(${lineColor} 1px, transparent 1px),
            linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      >
        {/* Dots at intersections */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="gridDots"
              x="0"
              y="0"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r={dotSize}
                fill={dotColor}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridDots)" />
        </svg>
      </div>

      {/* Radial gradient fade overlay (vignette effect) */}
      {showVignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent ${100 - vignetteIntensity}%, #000000 ${100 - Math.max(vignetteIntensity - 10, 20)}%)`,
          }}
        />
      )}
    </div>
  );
};

export default GridBackground;
