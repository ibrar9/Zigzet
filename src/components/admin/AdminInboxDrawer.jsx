import React, { useState } from 'react';
import { X, Send, Search, CheckCheck } from 'lucide-react';
import { adminInboxMessages } from '../../data/adminMockData';

export const AdminInboxDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(adminInboxMessages);
  const [activeMsgId, setActiveMsgId] = useState('msg-1');
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  const activeMsg = messages.find((m) => m.id === activeMsgId) || messages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyText('');
  };

  return (
    <div className="admin-drawer-backdrop" onClick={onClose}>
      <div className="admin-drawer-panel inbox-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3>Customer Live Inbox</h3>
            <span className="drawer-badge purple">3 unread messages</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body: 2 Columns on Desktop */}
        <div className="inbox-drawer-content">
          {/* Thread List */}
          <div className="inbox-threads-sidebar">
            <div className="inbox-threads-list">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`inbox-thread-item ${m.id === activeMsgId ? 'active' : ''}`}
                  onClick={() => setActiveMsgId(m.id)}
                >
                  <div className="thread-avatar-box">
                    <img src={m.avatar} alt={m.sender} />
                    {m.unread && <span className="thread-unread-dot" />}
                  </div>
                  <div className="thread-preview-info">
                    <div className="thread-name-row">
                      <span className="thread-name">{m.sender}</span>
                      <span className="thread-time">{m.time}</span>
                    </div>
                    <div className="thread-subject">{m.subject}</div>
                    <div className="thread-preview-text">{m.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Conversation View */}
          <div className="inbox-conversation-area">
            {activeMsg ? (
              <>
                <div className="conversation-header">
                  <div className="conversation-sender-info">
                    <img src={activeMsg.avatar} alt={activeMsg.sender} className="conv-avatar" />
                    <div>
                      <h4>{activeMsg.sender}</h4>
                      <p>{activeMsg.subject}</p>
                    </div>
                  </div>
                </div>

                <div className="conversation-body">
                  <div className="chat-bubble incoming">
                    <p>{activeMsg.preview}</p>
                    <span className="chat-time">{activeMsg.time}</span>
                  </div>

                  <div className="chat-bubble outgoing">
                    <p>Hello {activeMsg.sender.split(' ')[0]}! Thanks for contacting Zigzet Support. We're glad to assist you with this right away.</p>
                    <span className="chat-time">Just now · Delivered</span>
                  </div>
                </div>

                <form className="conversation-input-bar" onSubmit={handleSendReply}>
                  <input
                    type="text"
                    placeholder="Type your reply to customer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button type="submit" className="send-btn">
                    <Send size={15} />
                  </button>
                </form>
              </>
            ) : (
              <div className="empty-inbox-state">Select a conversation to reply</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
