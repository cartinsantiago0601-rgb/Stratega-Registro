import React from 'react';
import GlassCard from './GlassCard';
import { Trophy, TrendingUp } from 'lucide-react';

const Leaderboard = ({ logs = [] }) => {
  // Aggregate calls by team member (if recorded, otherwise simulated for proof of concept)
  const stats = logs.reduce((acc, log) => {
    const name = log.member || (log.id % 2 === 0 ? "Jesús" : "Santi"); // Simulation
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const ranking = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count], index) => ({ name, count, rank: index + 1 }));

  return (
    <GlassCard className="leaderboard-card" delay={0.8}>
      <div className="leaderboard-header">
        <div className="title-area">
          <Trophy size={20} color="var(--gold)" />
          <h3>Ranking de Equipo</h3>
        </div>
        <TrendingUp size={18} color="var(--neon-green)" />
      </div>

      <div className="ranking-list">
        {ranking.map((user) => (
          <div key={user.name} className="ranking-item">
            <span className={`rank rank-${user.rank}`}>{user.rank}</span>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(user.count / (ranking[0]?.count || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="user-count">{user.count} llamadas</span>
          </div>
        ))}
      </div>

      <style>{`
        .leaderboard-card {
          padding: 24px;
        }
        .leaderboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .title-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .leaderboard-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }
        .ranking-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ranking-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .rank {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.8rem;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.1);
        }
        .rank-1 { background: var(--gold); color: black; }
        .rank-2 { background: #E6E6E6; color: black; }
        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .user-name {
          font-weight: 500;
          font-size: 0.95rem;
        }
        .progress-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--gold-gradient);
          border-radius: 2px;
          transition: width 0.5s ease-out;
        }
        .user-count {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
      `}</style>
    </GlassCard>
  );
};

export default Leaderboard;
