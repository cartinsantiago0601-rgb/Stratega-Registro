import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import GlassCard from './GlassCard';

const callData = [
    { name: 'Oct 28', volume: 120 },
    { name: 'Get 27', volume: 150 },
    { name: 'Mar 29', volume: 220 },
    { name: 'Wax 30', volume: 180 },
    { name: 'Fri 1', volume: 289 },
    { name: 'Sat 15', volume: 210 },
    { name: 'Oct 25', volume: 190 },
];

const sentimentData = [
  { name: '1', pos: 40, neg: 24, neu: 30 },
  { name: '2', pos: 30, neg: 40, neu: 40 },
  { name: '3', pos: 60, neg: 20, neu: 30 },
  { name: '4', pos: 45, neg: 35, neu: 50 },
  { name: '5', pos: 76, neg: 25, neu: 35 },
  { name: '6', pos: 65, neg: 30, neu: 45 },
];

const MainCharts = () => {
  return (
    <div className="charts-grid">
      <GlassCard className="chart-container" delay={0.5}>
        <div className="chart-header">
          <h3>Volumen de Llamadas - Últimos 7 Días</h3>
          <span className="current-stat">289 hoy</span>
        </div>
        <div className="chart-body" style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <LineChart data={callData}>
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <Tooltip 
                contentStyle={{ background: 'rgba(20, 20, 30, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--gold)' }}
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="var(--gold)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'var(--gold)', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="chart-container" delay={0.6}>
        <div className="chart-header">
          <h3>Análisis de Sentimiento en Tiempo Real</h3>
          <button className="btn-premium">Ver Todo</button>
        </div>
        <div className="chart-body" style={{ flex: 1, position: 'relative' }}>
          <div className="legend">
            <span className="legend-item"><i className="dot gray"></i> Neutral</span>
            <span className="legend-item"><i className="dot green"></i> Positivo</span>
            <span className="legend-item"><i className="dot red"></i> Negativo</span>
          </div>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart data={sentimentData}>
              <XAxis hide={true} />
              <Area type="monotone" dataKey="pos" stroke="var(--neon-green)" fill="transparent" strokeWidth={3} />
              <Area type="monotone" dataKey="neu" stroke="var(--neon-blue)" fill="transparent" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="sentiment-percentage" style={{ position: 'absolute', right: '0', top: '40px' }}>76%</div>
        </div>
      </GlassCard>
    </div>
  );
};

export default MainCharts;
