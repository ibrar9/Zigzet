import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, Home, Building2, Phone, User, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserAddresses = () => {
  const { userAddresses, addUserAddress, updateUserAddress, deleteUserAddress, setDefaultAddress } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    isDefault: false
  });

  const openAddModal = () => {
    setEditingAddr(null);
    setFormData({
      type: 'Home',
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      isDefault: userAddresses.length === 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingAddr(addr);
    setFormData({
      type: addr.type || 'Home',
      name: addr.name || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      zip: addr.zip || '',
      country: addr.country || 'United States',
      isDefault: addr.isDefault || false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.street || !formData.city) return;

    if (editingAddr) {
      updateUserAddress(editingAddr.id, formData);
    } else {
      addUserAddress(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Address Book</h2>
          <p>Manage your saved delivery addresses for fast and seamless checkout</p>
        </div>
        <button 
          className="ud2-btn-track" 
          onClick={openAddModal}
          style={{ background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      {userAddresses.length === 0 ? (
        <div className="ud2-empty-page">
          <MapPin size={48} />
          <h3>No Addresses Saved</h3>
          <p>Add a shipping address to speed up your checkout process.</p>
          <button onClick={openAddModal}>Add Your First Address</button>
        </div>
      ) : (
        <div className="ud2-addresses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {userAddresses.map((addr) => {
            const isHome = addr.type?.toLowerCase() === 'home';
            return (
              <div 
                key={addr.id} 
                className="ud2-section-card" 
                style={{ 
                  position: 'relative', 
                  border: addr.isDefault ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                  borderRadius: 14,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                  boxShadow: addr.isDefault ? '0 8px 24px -6px rgba(124, 58, 237, 0.12)' : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span 
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: 5, 
                          background: isHome ? '#ede9fe' : '#f1f5f9', 
                          color: isHome ? '#7c3aed' : '#475569', 
                          padding: '4px 10px', 
                          borderRadius: 8, 
                          fontSize: 12, 
                          fontWeight: 600 
                        }}
                      >
                        {isHome ? <Home size={13} /> : <Building2 size={13} />}
                        {addr.type || 'Home'}
                      </span>
                      {addr.isDefault && (
                        <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 size={11} /> Default Shipping
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button 
                        onClick={() => openEditModal(addr)} 
                        title="Edit Address"
                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#475569' }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteUserAddress(addr.id)} 
                        title="Delete Address"
                        style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#dc2626' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={15} style={{ color: '#64748b' }} /> {addr.name}
                  </p>
                  <p style={{ color: '#475569', fontSize: 13.5, lineHeight: 1.5, marginBottom: 8 }}>
                    {addr.street}<br />
                    {addr.city}, {addr.state} {addr.zip}<br />
                    {addr.country}
                  </p>
                  <p style={{ color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={13} /> {addr.phone || '+1 (555) 000-0000'}
                  </p>
                </div>

                <div style={{ paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {!addr.isDefault ? (
                    <button 
                      onClick={() => setDefaultAddress(addr.id)}
                      style={{ background: 'transparent', border: 'none', color: '#7c3aed', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span style={{ fontSize: 12.5, color: '#64748b', fontStyle: 'italic' }}>Primary Address</span>
                  )}
                  <span style={{ fontSize: 11.5, color: '#94a3b8' }}>ID: {addr.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
                {editingAddr ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Type Select */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Address Type</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Home', 'Office', 'Other'].map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData(f => ({ ...f, type: t }))}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: formData.type === t ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                        background: formData.type === t ? '#ede9fe' : '#fff',
                        color: formData.type === t ? '#7c3aed' : '#475569',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="Recipient's Name"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Street Address *</label>
                <input
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="House #, Street name, Apt / Suite"
                  value={formData.street}
                  onChange={e => setFormData(f => ({ ...f, street: e.target.value }))}
                />
              </div>

              {/* City, State, ZIP */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>City *</label>
                  <input
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="City"
                    value={formData.city}
                    onChange={e => setFormData(f => ({ ...f, city: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>State</label>
                  <input
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={e => setFormData(f => ({ ...f, state: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>ZIP / Postal</label>
                  <input
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                    placeholder="90210"
                    value={formData.zip}
                    onChange={e => setFormData(f => ({ ...f, zip: e.target.value }))}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Country</label>
                <select
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                  value={formData.country}
                  onChange={e => setFormData(f => ({ ...f, country: e.target.value }))}
                >
                  <option value="United States">United States</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>

              {/* Default Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer', marginTop: 4 }}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={e => setFormData(f => ({ ...f, isDefault: e.target.checked }))}
                  style={{ width: 16, height: 16, accentColor: '#7c3aed' }}
                />
                Set as my default delivery address
              </label>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  {editingAddr ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
