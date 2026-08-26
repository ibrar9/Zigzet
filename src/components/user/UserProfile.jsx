import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2, Camera, Edit3, Upload, X, Sparkles, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
];

export const UserProfile = () => {
  const { currentUser, updateUserProfile } = useStore();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    zip: currentUser?.zip || '',
  });

  const handleSave = () => {
    updateUserProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (dataUrl) {
        updateUserProfile({ avatar: dataUrl });
        setIsAvatarModalOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url) => {
    updateUserProfile({ avatar: url });
    setIsAvatarModalOpen(false);
  };

  const handleRemoveAvatar = () => {
    updateUserProfile({ avatar: null });
    setIsAvatarModalOpen(false);
  };

  const Field = ({ icon: Icon, label, field, type = 'text', placeholder }) => (
    <div className="ud2-profile-field">
      <label>{label}</label>
      <div className={`ud2-profile-input ${editing ? 'edit' : ''}`}>
        <Icon size={15} />
        {editing ? (
          <input
            type={type}
            value={form[field]}
            placeholder={placeholder}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          />
        ) : (
          <span>{form[field] || <em>Not set</em>}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>Account Settings</h2>
        <p>Manage your personal profile, delivery info, and security credentials</p>
      </div>

      <div className="ud2-profile-grid">
        {/* Avatar Card */}
        <div className="ud2-section-card ud2-profile-avatar-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 24, borderRadius: 16 }}>
          <div className="ud2-profile-avatar2-wrap" style={{ position: 'relative', width: 90, height: 90, marginBottom: 14 }}>
            <div 
              className="ud2-profile-avatar2" 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                display: 'grid', 
                placeItems: 'center', 
                fontSize: 32, 
                fontWeight: 700, 
                color: '#fff',
                border: '3px solid #fff',
                boxShadow: '0 8px 20px -4px rgba(124, 58, 237, 0.35)'
              }}
            >
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span>{currentUser?.name?.[0]?.toUpperCase() || 'U'}</span>
              )}
            </div>
            <button 
              className="ud2-profile-camera" 
              onClick={() => setIsAvatarModalOpen(true)}
              title="Change Profile Photo"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#7c3aed',
                color: '#fff',
                border: '2px solid #fff',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            >
              <Camera size={14} />
            </button>
          </div>

          <h3 className="ud2-profile-user-name" style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>
            {currentUser?.name || 'User'}
          </h3>
          <p className="ud2-profile-user-email" style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
            {currentUser?.email || ''}
          </p>
          <span className="ud2-profile-since" style={{ background: '#ede9fe', color: '#7c3aed', padding: '3px 10px', borderRadius: 12, fontSize: 11.5, fontWeight: 600 }}>
            Member since {currentUser?.joinedAt || 'Aug 2026'}
          </span>

          <button
            onClick={() => setIsAvatarModalOpen(true)}
            style={{
              marginTop: 16,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer'
            }}
          >
            Change Photo
          </button>
        </div>

        {/* Form Card */}
        <div className="ud2-section-card ud2-profile-form-card" style={{ padding: 24, borderRadius: 16 }}>
          <div className="ud2-profile-form-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Personal Information</h3>
            {!editing ? (
              <button 
                className="ud2-profile-edit2" 
                onClick={() => setEditing(true)}
                style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Edit3 size={14} /> Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="ud2-profile-cancel2" 
                  onClick={() => setEditing(false)}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  className="ud2-profile-save2" 
                  onClick={handleSave}
                  style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {saved ? <><CheckCircle2 size={13} /> Saved!</> : <><Save size={13} /> Save Changes</>}
                </button>
              </div>
            )}
          </div>

          <div className="ud2-profile-fields">
            <Field icon={User} label="Full Name" field="name" placeholder="Your full name" />
            <Field icon={Mail} label="Email Address" field="email" type="email" placeholder="you@example.com" />
            <Field icon={Phone} label="Phone Number" field="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="ud2-profile-divider" style={{ margin: '20px 0 16px 0', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
            Primary Delivery Address
          </div>
          <div className="ud2-profile-fields">
            <Field icon={MapPin} label="Street Address" field="address" placeholder="742 Evergreen Terrace" />
            <Field icon={MapPin} label="City" field="city" placeholder="Springfield" />
            <Field icon={MapPin} label="ZIP / Postal Code" field="zip" placeholder="97477" />
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 460, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Update Profile Picture</h3>
              <button 
                onClick={() => setIsAvatarModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Upload from device */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 12,
                border: '2px dashed #7c3aed',
                background: '#faf5ff',
                color: '#7c3aed',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 20
              }}
            >
              <Upload size={18} /> Upload Image from Computer / Phone
            </button>

            {/* Or choose preset avatars */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} color="#7c3aed" /> Or choose a stylish avatar:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(url)}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: currentUser?.avatar === url ? '3px solid #7c3aed' : '2px solid #e2e8f0',
                      padding: 0,
                      cursor: 'pointer',
                      boxShadow: currentUser?.avatar === url ? '0 0 0 3px rgba(124, 58, 237, 0.25)' : 'none'
                    }}
                  >
                    <img src={url} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Remove / Reset */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
              {currentUser?.avatar ? (
                <button
                  onClick={handleRemoveAvatar}
                  style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Trash2 size={13} /> Remove Custom Picture
                </button>
              ) : <div />}
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: 8, fontSize: 12.5, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
