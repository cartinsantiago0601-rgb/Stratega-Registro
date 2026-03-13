import React, { useState } from 'react';
import { Search, Download, FileText, ChevronDown } from 'lucide-react';
import GlassCard from './GlassCard';

const initialLogData = [
  { id: 1, date: "13 Mar, 11:34 AM", caller: "John Doe", contact: "555-0123", duration: "04:15", tags: ["Ventas", "Soporte"], snippet: "...problema con la integración, necesito ayuda..." },
  { id: 2, date: "13 Mar, 10:20 AM", caller: "Jane Smith", contact: "555-0124", duration: "03:20", tags: ["Información"], snippet: "...cuáles son los precios de los planes premium..." },
  { id: 3, date: "12 Mar, 09:45 PM", caller: "Carlos Ruiz", contact: "555-0125", duration: "05:45", tags: ["Ventas"], snippet: "...quiero agendar una demostración para mañana..." },
  { id: 4, date: "12 Mar, 04:10 PM", caller: "Elena Sanz", contact: "555-0126", duration: "02:10", tags: ["Soporte"], snippet: "...mi cuenta no carga los datos de ayer..." },
  { id: 5, date: "12 Mar, 02:00 PM", caller: "Marc Costa", contact: "555-0127", duration: "01:15", tags: ["Nuevo"], snippet: "...interesado en el bot de Stratega para mi hotel..." },
];

const CallLogTable = ({ logs = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLogs = logs.filter(log => 
    log.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.contact.includes(searchTerm) ||
    (log.tags && Array.isArray(log.tags) ? log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) : String(log.tags).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <GlassCard className="table-container" delay={0.7}>
      <div className="table-header">
        <h3>Registro de Llamadas Recientes</h3>
        <div className="header-actions">
          <button className="btn-premium" style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' }}>Ver Todo</button>
          <div className="search-bar">
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, tag o número..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Fecha/Hora <ChevronDown size={14} /></th>
              <th>Llamante</th>
              <th>Contacto</th>
              <th>Duración</th>
              <th>Etiquetas</th>
              <th>Transcripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="date-cell">
                      <span className={`status-dot ${log.id % 2 === 0 ? 'yellow' : 'green'}`}></span>
                      {log.date}
                    </div>
                  </td>
                  <td>{log.caller}</td>
                  <td>{log.contact}</td>
                  <td>{log.duration}</td>
                  <td>
                    <div className="tags">
                      {Array.isArray(log.tags) ? log.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      )) : log.tags && (
                        <span className="tag">{log.tags}</span>
                      )}
                    </div>
                  </td>
                  <td className="snippet">{log.snippet}</td>
                  <td className="actions">
                    <FileText size={18} className="action-icon" />
                    <Download size={18} className="action-icon" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  No se encontraron resultados para "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default CallLogTable;
