import React from 'react';
import { ExerciseLog } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ProgressChartProps {
  logs: ExerciseLog[];
  width?: number | string;
  height?: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ logs, width = "100%", height = 200 }) => {
  if (logs.length < 2) {
    return (
      <div className="h-[200px] flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800 text-slate-500 text-sm">
        Log at least 2 sessions to see progress
      </div>
    );
  }

  // Calculate metrics: Total Reps per session
  const data = logs
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(log => {
      const totalReps = log.sets.reduce((sum, s) => sum + s.reps, 0);
      const maxWeight = Math.max(...log.sets.map(s => s.weight || 0));
      // Simple volume calculation for reference (reps * weight)
      // Note: For bodyweight exercises where weight is 0, this might be 0, so we focus on Reps primarily.
      
      return {
        date: new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        fullDate: new Date(log.timestamp).toLocaleDateString(),
        reps: totalReps,
        weight: maxWeight,
      };
    });

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#fb923c' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '5px' }}
          />
          <Area 
            type="monotone" 
            dataKey="reps" 
            stroke="#f97316" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorReps)" 
            name="Total Reps"
            activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};