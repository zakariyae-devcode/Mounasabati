"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false); // التحكم في فتح وإغلاق النافذة
  const currentUser = { id: 1, name: "زكرياء" };

  const [messages, setMessages] = useState([
    {
      id: 101,
      sender: { id: 2, name: "خبير التنسيق", avatar: "👑" },
      receiver: { id: 1, name: "زكرياء" },
      content: "مرحباً بك في مناسباتي الفاخرة. كيف يمكننا تنسيق حفلكم الملوكي اليوم؟",
      is_read: true,
      created_at: "3:45 م"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msgStructure = {
      id: Date.now(),
      sender: { id: currentUser.id, name: currentUser.name },
      receiver: { id: 2, name: "خبير التنسيق" },
      content: newMessage,
      is_read: false,
      created_at: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msgStructure]);
    setNewMessage("");
  };

  // حساب الرسائل غير المقروءة للشارة التنبيهية
  const unreadCount = messages.filter(msg => !msg.is_read && msg.sender.id !== currentUser.id).length;

  return (
    <div className="position-fixed bottom-0 start-0 m-4" style={{ zIndex: 1050 }} dir="rtl">
      
      {/* 1️⃣ صندوق المحادثة المنبثق المبني بالكامل بكلاسات Bootstrap 5 */}
      <div 
        className={`card shadow-lg border-0 round-4 position-absolute bottom-100 start-0 mb-3 bg-white ${isOpen ? 'd-flex' : 'd-none'}`}
        style={{ 
          width: '360px', 
          height: '460px', 
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 1rem 3rem rgba(61, 11, 79, 0.25)'
        }}
      >
        {/* رأس المحادثة الفاخر */}
        <div className="card-header border-0 d-flex align-items-center justify-content-between p-3 text-white" 
             style={{ background: 'linear-gradient(135deg, #3D0B4F, #5E1777)', borderBottom: '2px solid #C9A227 !important' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center text-center shadow-sm" 
                 style={{ width: '36px', height: '36px', border: '1px solid #C9A227' }}>
              👑
            </div>
            <div>
              <h6 className="m-0 fw-bold" style={{ fontSize: '0.95rem' }}>مستشار مناسباتي</h6>
              <small className="d-flex align-items-center gap-1 opacity-75" style={{ fontSize: '0.7rem' }}>
                <span className="p-1 bg-success rounded-circle d-inline-block"></span> متصل لتنفيذ طلباتك
              </small>
            </div>
          </div>
          {/* زر الإغلاق */}
          <button type="button" className="btn-close btn-close-white shadow-none" aria-label="Close" onClick={() => setIsOpen(false)}></button>
        </div>

        {/* منطقة الرسائل الفليكس */}
        <div className="card-body overflow-auto p-3 d-flex flex-column gap-3" style={{ backgroundColor: '#FBF8F2', flex: '1' }}>
          {messages.map((msg) => {
            const isMe = msg.sender.id === currentUser.id;
            return (
              <div key={msg.id} className={`d-flex max-vw-75 ${isMe ? 'align-self-start' : 'align-self-end'}`}>
                <div className={`p-2 px-3 rounded-3 shadow-sm ${isMe ? 'text-white' : 'bg-white text-dark border'}`}
                     style={{ 
                       background: isMe ? '#5E1777' : '#ffffff', 
                       borderTopRightRadius: isMe ? '0px' : '8px',
                       borderTopLeftRadius: !isMe ? '0px' : '8px',
                       fontSize: '0.88rem' 
                     }}>
                  <p className="m-0 p-0 text-wrap" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  
                  {/* بيانات الميتا: الوقت وحالة القراءة */}
                  <div className={`d-flex align-items-center justify-content-end gap-1 mt-1 opacity-75`} style={{ fontSize: '0.65rem' }}>
                    <span>{msg.created_at}</span>
                    {isMe && (
                      <span className="ms-1">
                        <i className={`bi ${msg.is_read ? 'bi-check2-all text-info' : 'bi-check2'}`} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* شريط الإدخال السفلي */}
        <div className="card-footer bg-white border-0 p-3">
          <form onSubmit={handleSendMessage} className="input-group">
            <input
              type="text"
              className="form-control form-control-sm bg-light border-0 shadow-none px-3"
              placeholder="اكتب استفسارك هنا..."
              style={{ borderRadius: '8px 0 0 8px' }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn text-white px-3 shadow-none d-flex align-items-center justify-content-center" 
                    type="submit" 
                    style={{ background: '#5E1777', borderRadius: '0 8px 8px 0' }}>
              <i className="bi bi-send-fill" style={{ transform: 'scaleX(-1)' }} />
            </button>
          </form>
        </div>
      </div>

      {/* 2️⃣ الزر الدائري العائم المعتمد بالكامل على تسييق Bootstrap 5 */}
      <button 
        type="button" 
        className="btn p-0 rounded-circle d-flex align-items-center justify-content-center position-relative shadow-lg border border-2 text-white"
        style={{ 
          width: '60px', 
          height: '60px', 
          background: 'linear-gradient(135deg, #5E1777, #3D0B4F)',
          borderColor: '#C9A227'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <i className="bi bi-x-lg fs-5" />
        ) : (
          <>
            <i className="bi bi-chat-quote-fill fs-4 text-white" />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-warning text-dark border border-white" style={{ fontSize: '0.7rem', padding: '0.35em 0.5em' }}>
                {unreadCount}
              </span>
            )}
          </>
        )}
      </button>

    </div>
  );
}