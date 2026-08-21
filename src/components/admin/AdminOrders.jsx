import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, Truck, Package, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (o.email && o.email.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Customer Orders ({orders.length})</h2>
        <p style={{ fontSize: '13.5px', color: '#6b7280' }}>Track, fulfill, and update customer order statuses</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card-box" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-input-box" style={{ flex: 1, minWidth: '220px' }}>
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#6b7280" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="all">All Statuses</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card-box">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: '700' }}>#{ord.id}</td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{ord.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{ord.email}</div>
                  </td>
                  <td>{ord.date}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: '600' }}>{ord.items ? ord.items.length : 1} item(s)</span>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'underline' }}
                      >
                        (view)
                      </button>
                    </div>
                  </td>
                  <td style={{ fontWeight: '800' }}>${Number(ord.total).toFixed(2)}</td>
                  <td>
                    <span style={{ fontSize: '12px', color: '#4b5563' }}>{ord.paymentMethod}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${ord.status}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay open" onClick={() => setSelectedOrder(null)}>
          <div className="modal-box" style={{ maxWidth: '540px', padding: '28px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>
              Order Details #{selectedOrder.id}
            </h3>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '16px', fontSize: '13px' }}>
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.email})</p>
              <p style={{ marginTop: '4px' }}><strong>Shipping:</strong> {selectedOrder.shippingAddress || 'USA Standard Address'}</p>
              <p style={{ marginTop: '4px' }}><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
              <p style={{ marginTop: '4px' }}><strong>Date:</strong> {selectedOrder.date}</p>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Items in this order:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#fff', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{item.name} (x{item.quantity})</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="hero-cta-btn"
                onClick={() => setSelectedOrder(null)}
                style={{ padding: '8px 20px', fontSize: '13px' }}
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
