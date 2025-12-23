import React from 'react';
import { ExerciseLog } from '../types';

interface ProgressChartProps {
  logs: ExerciseLog[];
  width?: number;
  height?: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ logs, width = 300, height = 150 }) => {
  if (logs.length < 2) {
    return (
      <div className="h-[150px] flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800 text-slate-500 text-sm">
        Not enough data for chart
      </div>
    );
  }

  // Calculate metrics: Total Reps per session
  const dataPoints = logs
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(log => ({
      date: new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      totalReps: log.sets.reduce((sum, s) => sum + s.reps, 0),
      // totalVolume: log.sets.reduce((sum, s) => sum + (s.reps * (s.weight || 0 || 1)), 0) // Optional volume calc
    }));

  const maxVal = Math.max(...dataPoints.map(d => d.totalReps)) * 1.1; // Add 10% headroom
  const minVal = Math.min(...dataPoints.map(d => d.totalReps)) * 0.9;
  
  const padding = 20;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // Helper to map values to coordinates
  const getX = (index: number) => padding + (index / (dataPoints.length - 1)) * chartW;
  const getY = (value: number) => height - padding - ((value - minVal) / (maxVal - minVal || 1)) * chartH;

  // Generate SVG path
  const pathData = dataPoints.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(point.totalReps)}`
  ).join(' ');

  // Gradient area path
  const areaPath = `
    ${pathData} 
    L ${getX(dataPoints.length - 1)} ${height - padding} 
    L ${getX(0)} ${height - padding} 
    Z
  `;

  return (
    <div className="w-full overflow-hidden">
       <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

        {/* Area */}
        <path d={areaPath} fill="url(#gradient)" />

        {/* Line */}
        <path d={pathData} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {dataPoints.map((point, i) => (
          <g key={i}>
            <circle 
              cx={getX(i)} 
              cy={getY(point.totalReps)} 
              r="4" 
              className="fill-slate-900 stroke-brand-500 stroke-2 hover:fill-brand-500 transition-colors cursor-pointer" 
            />
            {/* Tooltip-ish text for last point */}
            {i === dataPoints.length - 1 && (
               <text 
                 x={getX(i)} 
                 y={getY(point.totalReps) - 10} 
                 textAnchor="middle" 
                 fill="#f97316" 
                 fontSize="10" 
                 fontWeight="bold"
               >
                 {point.totalReps}
               </text>
            )}
            <text 
              x={getX(i)} 
              y={height - 5} 
              textAnchor="middle" 
              fill="#64748b" 
              fontSize="10"
            >
              {point.date}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};