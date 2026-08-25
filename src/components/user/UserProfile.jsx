import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2, Camera, Edit3 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserProfile = () => {
  const { currentUser, updateUserProfile } = useStore();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
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
        <p>Manage your personal information and preferences</p>
      </div>

      <div className="ud2-profile-grid">
        {/* Avatar Card */}
        <div className="ud2-section-card ud2-profile-avatar-card">
          <div className="ud2-profile-avatar2-wrap">
            <div className="ud2-profile-avatar2">
              <span>{currentUser?.name?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <button className="ud2-profile-camera"><Camera size={13} /></button>
          </div>
          <h3 className="ud2-profile-user-name">{currentUser?.name || 'User'}</h3>
          <p className="ud2-profile-user-email">{currentUser?.email || ''}</p>
          <span className="ud2-profile-since">Member since {currentUser?.joinedAt || 'Aug 2026'}</span>
        </div>

        {/* Form Card */}
        <div className="ud2-section-card ud2-profile-form-card">
          <div className="ud2-profile-form-head">
            <h3>Personal Information</h3>
            {!editing ? (
              <button className="ud2-profile-edit2" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="ud2-profile-cancel2" onClick={() => setEditing(false)}>Cancel</button>
                <button className="ud2-profile-save2" onClick={handleSave}>
                  {saved ? <><CheckCircle2 size={13} /> Saved!</> : <><Save size={13} /> Save</>}
                </button>
              </div>
            )}
          </div>

          <div className="ud2-profile-fields">
            <Field icon={User} label="Full Name" field="name" placeholder="Your full name" />
            <Field icon={Mail} label="Email" field="email" type="email" placeholder="you@example.com" />
            <Field icon={Phone} label="Phone" field="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="ud2-profile-divider">Shipping Address</div>
          <div className="ud2-profile-fields">
            <Field icon={MapPin} label="Street Address" field="address" placeholder="742 Evergreen Terrace" />
            <Field icon={MapPin} label="City" field="city" placeholder="Springfield" />
            <Field icon={MapPin} label="ZIP Code" field="zip" placeholder="97477" />
          </div>
        </div>
      </div>
    </div>
  );
};
