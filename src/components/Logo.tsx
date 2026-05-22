import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <style>
          {`
            .orbit {
              stroke-dasharray: 100 170;
              animation: orbitAnim 3s linear infinite;
            }
            @keyframes orbitAnim {
              0% { stroke-dashoffset: 270; }
              100% { stroke-dashoffset: 0; }
            }
          `}
        </style>
      </defs>

      {/* Tilt the entire structure by -25 degrees */}
      <g transform="translate(60, 60) rotate(-25) translate(-60, -60)">
        
        {/* Faint Background Ellipse to define the volume */}
        <ellipse cx="60" cy="60" rx="55" ry="30" stroke="currentColor" strokeWidth="1" opacity="0.1" />

        {/* Orbiting Orange Ring */}
        <ellipse 
          cx="60" cy="60" 
          rx="55" ry="30" 
          stroke="#F97316" /* Orange color */
          strokeWidth="4" 
          strokeLinecap="round"
          className="orbit"
        />
        
        {/* Internal Network Connections */}
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.6">
          <line x1="20" y1="60" x2="40" y2="50" />
          <line x1="40" y1="50" x2="70" y2="45" />
          <line x1="70" y1="45" x2="100" y2="60" />
          
          <line x1="30" y1="75" x2="50" y2="70" />
          <line x1="50" y1="70" x2="80" y2="65" />
          <line x1="80" y1="65" x2="95" y2="55" />
          
          <line x1="40" y1="50" x2="30" y2="75" />
          <line x1="40" y1="50" x2="50" y2="70" />
          <line x1="70" y1="45" x2="50" y2="70" />
          <line x1="70" y1="45" x2="80" y2="65" />
        </g>

        {/* Internal Nodes */}
        <circle cx="20" cy="60" r="3" fill="currentColor" />
        <circle cx="40" cy="50" r="4.5" fill="var(--color-accent)" />
        <circle cx="70" cy="45" r="5" fill="currentColor" />
        <circle cx="100" cy="60" r="3" fill="currentColor" />
        
        <circle cx="30" cy="75" r="4" fill="currentColor" />
        <circle cx="50" cy="70" r="6" fill="var(--color-accent)" />
        <circle cx="80" cy="65" r="4" fill="currentColor" />
        <circle cx="95" cy="55" r="3" fill="currentColor" />
      </g>
    </svg>
  );
};
