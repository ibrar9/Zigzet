import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Truck, 
  Package, 
  Clock, 
  ShoppingBag, 
  X,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 1. Metric Calculations
  const totalOrders = orders.length;
  const processingCount = orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  }, [orders]);

  // 2. Dropdown Options
  const statusFilterOptions = [
    { value: 'all', label: 'All Statuses', dot: '#7c3aed', badge: totalOrders },
    { value: 'Processing', label: 'Processing', dot: '#3b82f6', badge: processingCount },
    { value: 'Shipped', label: 'Shipped', dot: '#f59e0b', badge: shippedCount },
    { value: 'Delivered', label: 'Delivered', dot: '#10b981', badge: deliveredCount },
    { value: 'Cancelled', label: 'Cancelled', dot: '#ef4444' }
  ];

  const updateStatusOptions = [
    { value: 'Pending', label: 'Pending', dot: '#64748b' },
    { value: 'Processing', label: 'Processing', dot: '#3b82f6' },
    { value: 'Shipped', label: 'Shipped', dot: '#f59e0b' },
    { value: 'Delivered', label: 'Delivered', dot: '#10b981' },
    { value: 'Cancelled', label: 'Cancelled', dot: '#ef4444' }
  ];

  // 3. Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        (o.email && o.email.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // 4. Pagination
  const itemsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const paginatedOrders = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPageNum, itemsPerPage]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admin-page-container">
      {/* 1. Header Title */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Customer Orders Management ({totalOrders})</h2>
          <p className="admin-section-desc">Track real-time checkout purchases, fulfill packages, and update shipment progress</p>
        </div>
      </div>

      {/* 2. Top Stats Overview Grid */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <ShoppingBag size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Orders</span>
            <span className="stat-main-number">{totalOrders}</span>
            <span className="stat-sub-text">Lifetime store orders</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <Clock size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Processing</span>
            <span className="stat-main-number">{processingCount}</span>
            <span className="stat-sub-text">Awaiting fulfillment</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <Truck size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">In Transit</span>
            <span className="stat-main-number">{shippedCount}</span>
            <span className="stat-sub-text">Shipped with carrier</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Completed Revenue</span>
            <span className="stat-main-number">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="stat-sub-text">{deliveredCount} orders delivered</span>
          </div>
        </div>
      </div>

      {/* 3. Modern Toolbar */}
      <div className="products-modern-toolbar">
        <div className="toolbar-left-group">
          {/* Search Box */}
          <div className="toolbar-search-box">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, or Email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPageNum(1);
              }}
            />
          </div>

          {/* Status Filter Custom Dropdown */}
          <CustomDropdown
            options={statusFilterOptions}
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPageNum(1);
            }}
            minWidth="180px"
          />
        </div>
      </div>

      {/* 4. Orders Table Card */}
      <div className="dash-card">
        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((ord) => {
                const isDelivered = ord.status === 'Delivered';
                const isShipped = ord.status === 'Shipped';
                const isProcessing = ord.status === 'Processing';
                const isCancelled = ord.status === 'Cancelled';

                const statusColor = isDelivered ? '#10b981' : isShipped ? '#f59e0b' : isProcessing ? '#3b82f6' : isCancelled ? '#ef4444' : '#64748b';

                return (
                  <tr key={ord.id}>
                    {/* Order ID */}
                    <td className="table-bold-cell">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>#{ord.id}</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9999px',
                            background: '#f1f5f9',
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '13px',
                            fontWeight: '700'
                          }}
                        >
                          {ord.customerName ? ord.customerName.charAt(0) : 'C'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a' }}>{ord.customerName}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{ord.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="table-date-cell">{ord.date}</td>

                    {/* Items */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>
                          {ord.items ? ord.items.length : 1} {ord.items && ord.items.length === 1 ? 'item' : 'items'}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#7c3aed',
                            background: '#f5f3ff',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          View
                        </button>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="table-bold-cell" style={{ color: '#0f172a' }}>
                      ${Number(ord.total).toFixed(2)}
                    </td>

                    {/* Payment Method */}
                    <td>
                      <span style={{ fontSize: '12.5px', color: '#475569', fontWeight: '500' }}>
                        {ord.paymentMethod || 'Credit Card'}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`status-pill ${ord.status.toLowerCase()}`}>
                        <span className="status-dot-indicator" style={{ backgroundColor: statusColor }} />
                        {ord.status}
                      </span>
                    </td>

                    {/* Update Status Custom Dropdown */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-block' }}>
                        <CustomDropdown
                          options={updateStatusOptions}
                          value={ord.status}
                          onChange={(newStatus) => updateOrderStatus(ord.id, newStatus)}
                          variant="compact"
                          minWidth="140px"
                          align="right"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                    <ShoppingBag size={40} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
                    <p style={{ fontWeight: '600', color: '#475569' }}>No orders found matching the filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="table-pagination-footer">
            <span className="pagination-info-text">
              Showing {(currentPageNum - 1) * itemsPerPage + 1} to {Math.min(currentPageNum * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </span>

            <div className="pagination-pill-group">
              <button
                className="pagination-nav-btn"
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`pagination-num-btn ${currentPageNum === num ? 'active' : ''}`}
                  onClick={() => setCurrentPageNum(num)}
                >
                  {num}
                </button>
              ))}

              <button
                className="pagination-nav-btn"
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay open" onClick={() => setSelectedOrder(null)}>
          <div className="modal-box" style={{ maxWidth: '600px', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setSelectedOrder(null)}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Invoice Summary</span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px' }}>
                  Order #{selectedOrder.id}
                </h3>
              </div>

              <span className={`status-pill ${selectedOrder.status.toLowerCase()}`} style={{ fontSize: '13px', padding: '6px 14px' }}>
                ● {selectedOrder.status}
              </span>
            </div>

            {/* Customer & Shipping Information */}
            <div style={{ backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '14px', marginBottom: '20px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Customer Recipient</span>
                <p style={{ fontWeight: '700', color: '#0f172a', fontSize: '13.5px', marginTop: '2px' }}>{selectedOrder.customerName}</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>{selectedOrder.email}</p>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Shipping Address</span>
                <p style={{ fontSize: '12.5px', color: '#334155', marginTop: '2px' }}>
                  {selectedOrder.shippingAddress || '742 Evergreen Terrace, Springfield, OR'}
                </p>
              </div>
            </div>

            {/* Items List */}
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '10px' }}>
              Ordered Items ({selectedOrder.items ? selectedOrder.items.length : 1})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto', marginBottom: '20px' }}>
              {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', background: '#fff', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', display: 'block' }}>{item.name}</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Summary Footer */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                <span>Subtotal</span>
                <span>${Number(selectedOrder.subtotal || selectedOrder.total * 0.9).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                <span>Shipping & Taxes</span>
                <span>${Number(selectedOrder.shipping || 0 + selectedOrder.tax || selectedOrder.total * 0.1).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                <span>Total Amount</span>
                <span style={{ color: '#10b981' }}>${Number(selectedOrder.total).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={handlePrint}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#64748b', background: '#f1f5f9', padding: '8px 16px', borderRadius: '8px' }}
              >
                <Printer size={15} />
                <span>Print Packing Slip</span>
              </button>

              <button
                className="hero-cta-btn"
                onClick={() => setSelectedOrder(null)}
                style={{ padding: '8px 24px', fontSize: '13.5px' }}
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
