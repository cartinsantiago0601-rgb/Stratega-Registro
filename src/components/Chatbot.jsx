import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { askStrategaChat } from '../services/chatService';

const Chatbot = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente inteligente de Stratega. Puedo ayudarte a analizar los registros de llamadas o responder dudas sobre el equipo. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await askStrategaChat(input, logs);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chat-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="chat-badge"><Sparkles size={10} /></span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chat-window glass"
          >
            <div className="chat-header">
              <div className="bot-title">
                <div className="bot-icon">
                  <Bot size={20} color="var(--gold)" />
                </div>
                <div>
                  <h4>Stratega AI</h4>
                  <span>En línea y analizando</span>
                </div>
              </div>
              <button className="header-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            <div className="chat-messages" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`message-bubble ${msg.role}`}>
                  {msg.role === 'assistant' ? <Bot size={14} className="msg-icon" /> : <User size={14} className="msg-icon" />}
                  <div className="msg-content">{msg.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="message-bubble assistant typing">
                  <Bot size={14} className="msg-icon" />
                  <div className="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Pregúntame sobre las llamadas..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" disabled={isTyping} className="send-btn">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 2000;
        }
        .chat-trigger {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gold-gradient);
          color: black;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(255, 184, 0, 0.3);
          position: relative;
          transition: transform 0.2s;
        }
        .chat-trigger:hover {
          transform: scale(1.1);
        }
        .chat-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ff4d4d;
          padding: 4px;
          border-radius: 50%;
          border: 2px solid #0f0f15;
          color: white;
        }
        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 360px;
          height: 500px;
          background: rgba(15, 15, 25, 0.98);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .chat-header {
          padding: 20px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bot-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bot-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 184, 0, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bot-title h4 { margin: 0; font-size: 0.95rem; }
        .bot-title span { font-size: 0.75rem; color: var(--neon-green); }
        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .message-bubble {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }
        .message-bubble.assistant { align-self: flex-start; }
        .message-bubble.user { align-self: flex-end; flex-direction: row-reverse; }
        .msg-icon {
          width: 20px;
          margin-top: 4px;
          opacity: 0.6;
        }
        .msg-content {
          padding: 12px 16px;
          border-radius: 15px;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .assistant .msg-content {
          background: rgba(255,255,255,0.05);
          border-bottom-left-radius: 2px;
        }
        .user .msg-content {
          background: var(--gold-gradient);
          color: black;
          border-bottom-right-radius: 2px;
        }
        .chat-input-area {
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 10px;
        }
        .chat-input-area input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 10px 15px;
          color: white;
          outline: none;
          font-size: 0.9rem;
        }
        .send-btn {
          background: var(--gold-gradient);
          border: none;
          color: black;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .typing-dots span {
          animation: blink 1.4s infinite both;
          font-size: 20px;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
