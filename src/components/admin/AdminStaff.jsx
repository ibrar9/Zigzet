import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Mail, 
  Lock, 
  Key, 
  Save, 
  X, 
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminStaff = () => {
  const { staffMembers, addStaffMember, deleteStaffMember, showToast } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Operations & Logistics Lead',
    department: 'Fulfillment & Inventory',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    permissions: ['orders', 'products']
  });

  const roleOptions = [
    { value: 'Store Owner / Super Admin', label: 'Store Owner / Super Admin', dot: '#7c3aed' },
    { value: 'Operations & Logistics Lead', label: 'Operations & Logistics Lead', dot: '#3b82f6' },
    { value: 'Customer Care Specialist', label: 'Customer Care Specialist', dot: '#10b981' },
    { value: 'Marketing & Growth Manager', label: 'Marketing & Growth Manager', dot: '#f59e0b' },
    { value: 'Financial Auditor', label: 'Financial Auditor', dot: '#64748b' }
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      showToast('Required Fields', 'Please enter staff name and a valid work email.', 'info');
      return;
    }

    addStaffMember(form);
    setIsModalOpen(false);
    setForm({
      name: '',
      email: '',
      role: 'Customer Care Specialist',
      department: 'Customer Support',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      permissions: ['inbox', 'orders']
    });
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Staff Members & Role Permissions ({staffMembers.length})</h2>
          <p className="admin-section-desc">Manage employee workspace access, delegate customer support, and assign security roles</p>
        </div>

        <div className="admin-page-actions">
          <button
            className="hero-cta-btn"
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '10px 22px', fontSize: '13.5px' }}
          >
            <Plus size={16} />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <Users size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Staff</span>
            <span className="stat-main-number">{staffMembers.length} Accounts</span>
            <span className="stat-sub-text">Active workspace seats</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Security Level</span>
            <span className="stat-main-number">2FA Enabled</span>
            <span className="stat-sub-text">Role-based ACL active</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <UserCheck size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Active Now</span>
            <span className="stat-main-number">2 Online</span>
            <span className="stat-sub-text">Working on store</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <Key size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Permissions</span>
            <span className="stat-main-number">Granular</span>
            <span className="stat-sub-text">Encrypted sessions</span>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="dash-card">
        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Role & Title</th>
                <th>Department</th>
                <th>Access Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((s) => (
                <tr key={s.id}>
                  {/* Avatar & Name */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                          border: '1.5px solid #e2e8f0',
                          flexShrink: 0
                        }}
                      >
                        <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{s.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{s.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span style={{ fontWeight: '700', color: '#7c3aed', background: '#f5f3ff', padding: '4px 10px', borderRadius: '8px', fontSize: '12px' }}>
                      {s.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td>
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                      {s.department || 'General Operations'}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className="status-pill completed">
                      <span className="status-dot-indicator" style={{ backgroundColor: '#10b981' }} />
                      {s.status || 'Active'}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748b' }}>
                      <Clock size={13} color="#94a3b8" />
                      <span>{s.lastActive}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    {s.role.includes('Super Admin') ? (
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>Primary Owner</span>
                    ) : (
                      <button
                        className="action-circle-btn delete"
                        onClick={() => {
                          if (window.confirm(`Revoke admin access for ${s.name}?`)) {
                            deleteStaffMember(s.id);
                          }
                        }}
                        title="Revoke access"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="modal-overlay open" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '540px', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setIsModalOpen(false)}>
              <X size={18} />
            </button>

            <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Team Security & Access
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px', color: '#0f172a' }}>
                Invite New Staff Member
              </h3>
            </div>

            <form onSubmit={handleAdd}>
              <div className="checkout-form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jordan@zigzet.com"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Assigned Staff Role</label>
                  <CustomDropdown
                    options={roleOptions}
                    value={form.role}
                    onChange={(val) => setForm({ ...form, role: val })}
                    width="100%"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="e.g. Customer Happiness & Live Chat"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '13.5px' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="hero-cta-btn"
                  style={{ padding: '10px 28px', fontSize: '13.5px' }}
                >
                  <Save size={15} />
                  <span>Grant Workspace Access</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
