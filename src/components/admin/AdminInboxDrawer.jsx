import React, { useState } from 'react';
import { X, Send, Search, CheckCheck, MessageSquare } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminInboxDrawer = ({ isOpen, onClose }) => {
  const { inboxMessages, sendInboxReply } = useStore();
  const [activeMsgId, setActiveMsgId] = useState(inboxMessages[0]?.id || 'msg-1');
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const unreadCount = inboxMessages.filter((m) => m.unread).length;
  
  const filteredMessages = inboxMessages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMsg = inboxMessages.find((m) => m.id === activeMsgId) || filteredMessages[0] || inboxMessages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMsg) return;
    sendInboxReply(activeMsg.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="admin-drawer-backdrop" onClick={onClose}>
      <div className="admin-drawer-panel inbox-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3>Customer Live Inbox</h3>
            <span className="drawer-badge purple">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
            </span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Drawer">
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body: 2 Columns on Desktop */}
        <div className="inbox-drawer-content">
          {/* Thread List */}
          <div className="inbox-threads-sidebar">
            <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9' }}>
              <div className="admin-search-wrapper" style={{ width: '100%' }}>
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search customer inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                  style={{ fontSize: '12px', padding: '6px 10px 6px 32px' }}
                />
              </div>
            </div>

            <div className="inbox-threads-list">
              {filteredMessages.map((m) => (
                <div
                  key={m.id}
                  className={`inbox-thread-item ${activeMsg && activeMsg.id === m.id ? 'active' : ''}`}
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

              {filteredMessages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#9ca3af', fontSize: '13px' }}>
                  No messages found.
                </div>
              )}
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
                      <p>{activeMsg.subject} {activeMsg.email ? `(${activeMsg.email})` : ''}</p>
                    </div>
                  </div>
                </div>

                <div className="conversation-body">
                  {activeMsg.messages && activeMsg.messages.length > 0 ? (
                    activeMsg.messages.map((msgItem, i) => (
                      <div key={i} className={`chat-bubble ${msgItem.isCustomer ? 'incoming' : 'outgoing'}`}>
                        <p>{msgItem.text}</p>
                        <span className="chat-time">{msgItem.time} {msgItem.isCustomer ? '' : '· Delivered'}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="chat-bubble incoming">
                        <p>{activeMsg.preview}</p>
                        <span className="chat-time">{activeMsg.time}</span>
                      </div>
                      <div className="chat-bubble outgoing">
                        <p>Hello {activeMsg.sender.split(' ')[0]}! Thanks for contacting Zigzet Support. We're glad to assist you with this right away.</p>
                        <span className="chat-time">Delivered</span>
                      </div>
                    </>
                  )}
                </div>

                <form className="conversation-input-bar" onSubmit={handleSendReply}>
                  <input
                    type="text"
                    placeholder={`Reply to ${activeMsg.sender}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button type="submit" className="send-btn" disabled={!replyText.trim()}>
                    <Send size={15} />
                  </button>
                </form>
              </>
            ) : (
              <div className="empty-inbox-state">
                <MessageSquare size={36} color="#cbd5e1" />
                <p style={{ marginTop: '12px', color: '#64748b' }}>Select a conversation to reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
