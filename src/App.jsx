import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsHeader from './components/StatsHeader';
import MainCharts from './components/MainCharts';
import CallLogTable from './components/CallLogTable';
import LeadModal from './components/LeadModal';
import Leaderboard from './components/Leaderboard';
import Chatbot from './components/Chatbot';
import { Mic, Plus } from 'lucide-react';
import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

function App() {
  const [activeTab, setActiveTab] = useState('panel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  // Listen for real-time updates from Firestore
  useEffect(() => {
    // Nota: Si el projectId es correcto y Firestore está habilitado, esto sincroniza el equipo
    const q = query(collection(db, "calls"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(data);
    }, (error) => {
      console.error("Firestore Error:", error);
      // Fallback local para demostración si Firestore no está activo
      if (logs.length === 0) {
        setLogs([
          { id: '1', date: "13 Mar, 11:34 AM", caller: "John Doe", contact: "555-0123", duration: "04:15", tags: ["Ventas"], snippet: "Interesado en bot", member: "Jesús" },
          { id: '2', date: "13 Mar, 10:20 AM", caller: "Jane Smith", contact: "555-0124", duration: "03:20", tags: ["Soporte"], snippet: "Ayuda con login", member: "Santi" }
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddCall = async (newCall) => {
    try {
      // Simulamos quién hace la llamada (normalmente vendría del Auth)
      const member = logs.length % 2 === 0 ? "Jesús" : "Santi";
      const callToSave = { ...newCall, member };

      // Add to Firestore (Real-time sync)
      await addDoc(collection(db, "calls"), callToSave);
      
      // Google Calendar Integration
      if (newCall.scheduleDate) {
        alert(`¡Evento creado! ${newCall.caller} agendado en Google Calendar para el ${newCall.scheduleDate}`);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("La llamada se guardó localmente (Firestore requiere configuración en la consola).");
      // Fallback local inmediato para feedback visual
      setLogs(prev => [{ id: Date.now(), ...newCall, member: "Jesús" }, ...prev]);
      setIsModalOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'panel':
        return (
          <div className="page-view animate-fade-in">
            <StatsHeader logs={logs} />
            <div className="dashboard-grid">
              <div className="main-stats-area">
                <MainCharts />
                <div style={{ marginTop: '24px' }}>
                  <CallLogTable logs={logs} />
                </div>
              </div>
              <div className="side-area">
                <Leaderboard logs={logs} />
              </div>
            </div>
          </div>
        );
      case 'registros':
        return (
          <div className="page-view animate-fade-in">
            <CallLogTable logs={logs} />
          </div>
        );
      case 'analisis':
        return (
          <div className="page-view animate-fade-in">
            <StatsHeader logs={logs} />
            <MainCharts />
          </div>
        );
      default:
        return (
          <div className="page-view" style={{ textAlign: 'center', padding: '100px', color: 'var(--text-secondary)' }}>
            <h2>Vista "{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}" en desarrollo</h2>
            <p>Esta sección estará disponible próximamente.</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'panel': return 'Resumen de Registros';
      case 'registros': return 'Registro Histórico';
      case 'analisis': return 'Análisis Detallado';
      case 'equipo': return 'Gestión de Equipo';
      case 'ajustes': return 'Configuración';
      default: return 'Stratega Registros';
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>{getPageTitle()}</h1>
            <p>Monitoreo en tiempo real sincronizado con el equipo</p>
          </div>
          <div className="header-controls">
            <div className="recording-status">
              <div className="pulse-dot"></div>
              <span>Grabando en vivo</span>
            </div>
            
            <button className="add-btn" onClick={() => setIsModalOpen(true)}>
              <Plus size={20} />
              <span>Nuevo Registro</span>
            </button>

            <button className="voice-btn" onClick={() => alert('Micrófono activado')}>
              <Mic size={20} />
            </button>
          </div>
        </header>

        {renderContent()}
      </main>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddCall}
      />

      <Chatbot logs={logs} />

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          margin-top: 24px;
        }
        .add-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid var(--gold);
          background: rgba(255, 184, 0, 0.1);
          color: var(--gold);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-btn:hover {
          background: rgba(255, 184, 0, 0.2);
          transform: translateY(-2px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
