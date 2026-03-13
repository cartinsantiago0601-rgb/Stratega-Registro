import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({ label, value, subtext, color = "gold", delay = 0 }) => {
  const colorMap = {
    gold: "var(--gold)",
    green: "var(--neon-green)",
    blue: "var(--neon-blue)",
  };

  const pillStyle = {
    backgroundColor: color === 'green' ? 'rgba(0,255,163,0.1)' : color === 'blue' ? 'rgba(0,224,255,0.1)' : 'rgba(255,184,0,0.1)',
    color: colorMap[color]
  };

  return (
    <GlassCard className="stat-card" delay={delay}>
      <div className="stat-label">
        {label} 
        <span className="neon-pill" style={pillStyle}>NEON</span>
      </div>
      <div className="stat-value">{value}</div>
      {subtext && <div className="stat-subtext" style={{ color: colorMap[color] }}>{subtext}</div>}
    </GlassCard>
  );
};

const StatsHeader = ({ logs = [] }) => {
  const totalCalls = logs.length;
  // Simulación de cálculos basados en datos reales si existieran más campos
  const avgDuration = totalCalls > 0 ? "3:45 min" : "0:00 min";
  const sentiment = totalCalls > 0 ? "76%" : "0%";
  const totalRegistros = logs.length;

  return (
    <div className="stats-header">
      <StatCard label="Total de Llamadas" value={totalCalls.toLocaleString()} delay={0.1} />
      <StatCard label="Duración Promedio" value={avgDuration} delay={0.2} />
      <StatCard label="Sentimiento" value={sentiment} subtext="Positivo" color="green" delay={0.3} />
      <StatCard label="Registros" value={totalRegistros} color="blue" delay={0.4} />

      <style jsx>{`
        .stats-header {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default StatsHeader;
