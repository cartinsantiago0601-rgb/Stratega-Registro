import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Tag } from 'lucide-react';

const LeadModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    caller: '',
    contact: '',
    duration: '00:00',
    tags: 'Ventas',
    snippet: '',
    scheduleDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date()
    });
    setFormData({ caller: '', contact: '', duration: '00:00', tags: 'Ventas', snippet: '', scheduleDate: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-content glass"
          >
            <div className="modal-header">
              <h2>Registrar Nueva Llamada</h2>
              <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label><User size={16} /> Llamante</label>
                <input 
                  type="text" 
                  placeholder="Nombre del cliente" 
                  required
                  value={formData.caller}
                  onChange={(e) => setFormData({...formData, caller: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label><Phone size={16} /> Contacto</label>
                <input 
                  type="text" 
                  placeholder="Teléfono o email" 
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label><Tag size={16} /> Etiqueta</label>
                <select 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                >
                  <option value="Ventas">Ventas</option>
                  <option value="Soporte">Soporte</option>
                  <option value="Información">Información</option>
                  <option value="Nuevo">Nuevo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notas / Transcripción</label>
                <textarea 
                  placeholder="Resumen de la llamada..."
                  value={formData.snippet}
                  onChange={(e) => setFormData({...formData, snippet: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group">
                <label><Calendar size={16} /> Agendar en Google Calendar</label>
                <input 
                  type="datetime-local" 
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})}
                />
                <p className="form-hint">Se creará un evento automático si seleccionas fecha.</p>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn-submit">Guardar Registro</button>
              </div>
            </form>
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 20px;
            }
            .modal-content {
              width: 100%;
              max-width: 500px;
              padding: 32px;
              background: rgba(20, 20, 30, 0.95);
              border: 1px solid var(--glass-border);
              border-radius: 20px;
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
            }
            .modal-header h2 {
              font-size: 1.5rem;
              color: var(--gold);
            }
            .close-btn {
              background: transparent;
              border: none;
              color: var(--text-secondary);
              cursor: pointer;
            }
            .modal-form {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
            .form-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .form-group label {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 0.9rem;
              color: var(--text-secondary);
            }
            .form-group input, .form-group select, .form-group textarea {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--glass-border);
              border-radius: 10px;
              padding: 12px;
              color: white;
              outline: none;
              font-family: inherit;
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
              border-color: var(--gold);
            }
            .form-group select option {
                background: #0f0f15;
            }
            .form-hint {
              font-size: 0.75rem;
              color: var(--neon-blue);
              margin-top: 4px;
            }
            .form-actions {
              display: flex;
              gap: 16px;
              margin-top: 12px;
            }
            .btn-submit {
              flex: 1;
              background: var(--gold-gradient);
              color: black;
              border: none;
              padding: 14px;
              border-radius: 12px;
              font-weight: 700;
              cursor: pointer;
            }
            .btn-cancel {
              padding: 14px 20px;
              background: transparent;
              color: var(--text-secondary);
              border: 1px solid var(--glass-border);
              border-radius: 12px;
              cursor: pointer;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
