import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Mic
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div 
    className={`sidebar-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <Icon size={20} className="icon" />
    <span>{label}</span>
  </div>
);

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'panel', icon: LayoutDashboard, label: 'Panel' },
    { id: 'registros', icon: FileText, label: 'Registros' },
    { id: 'analisis', icon: BarChart3, label: 'Análisis' },
    { id: 'equipo', icon: Users, label: 'Equipo' },
    { id: 'ajustes', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div className="sidebar glass">
      <div className="logo-container">
        <div className="logo-icon">
          <Mic size={24} color="#FFB800" />
        </div>
        <div className="logo-text">
          <span className="brand">STRATEGA</span>
          <span className="subbrand">REGISTROS</span>
        </div>
      </div>

      <div className="menu-section">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.id}
            icon={item.icon} 
            label={item.label} 
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="premium-badge">
          <span>VoxReg Premium</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
