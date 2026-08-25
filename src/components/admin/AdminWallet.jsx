import React, { useState, useMemo } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Building,
  TrendingUp,
  DownloadCloud,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminWallet = ({ isTransactionsOnly = false }) => {
  const { walletTransactions, orders, requestPayout, showToast } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');

  // Compute live wallet figures
  const totalOrdersAmount = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  }, [orders]);

  const totalPayouts = useMemo(() => {
    return walletTransactions
      .filter((t) => t.amount.startsWith('-'))
      .reduce((sum, t) => {
        const val = parseFloat(t.amount.replace(/[^0-9.-]+/g, '')) || 0;
        return sum + Math.abs(val);
      }, 0);
  }, [walletTransactions]);

  const liveTotalBalance = 48920.40 + totalOrdersAmount - totalPayouts;
  const liveAvailablePayout = Math.max(0, 14250.00 + totalOrdersAmount * 0.7 - totalPayouts);
  const livePendingSettlement = Math.max(0, 3890.00 + totalOrdersAmount * 0.3);

  const filteredTxns = walletTransactions.filter((txn) => {
    if (activeFilter === 'completed') return txn.status === 'Completed';
    if (activeFilter === 'refunds') return txn.status === 'Refunded';
    return true;
  });

  const handleExportCSV = () => {
    const headers = 'Transaction ID,Type & Description,Date,Amount,Status\n';
    const rows = filteredTxns
      .map((t) => `"${t.id}","${t.type}","${t.date}","${t.amount}","${t.status}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zigzet_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exported', 'Transaction records downloaded.');
  };

  return (
    <div className="admin-page-container">
      {/* Wallet Financial Metric Cards */}
      {!isTransactionsOnly && (
        <div className="wallet-metrics-grid">
          <div className="dash-card wallet-metric-card primary-gradient">
            <div className="metric-header">
              <span className="metric-tag">Total Store Balance</span>
              <Wallet size={20} className="metric-icon" />
            </div>
            <h3 className="metric-number">
              ${liveTotalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="metric-footer-row">
              <span className="metric-growth-text">
                <TrendingUp size={13} />
                +24.8% vs last month
              </span>
              <span className="metric-sub">Auto-settles weekly</span>
            </div>
          </div>

          <div className="dash-card wallet-metric-card">
            <div className="metric-header">
              <span className="metric-tag">Available for Payout</span>
              <ArrowDownLeft size={20} className="metric-icon green" />
            </div>
            <h3 className="metric-number">
              ${liveAvailablePayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="metric-footer-row">
              <button 
                className="payout-now-btn"
                onClick={() => requestPayout(Math.min(5000, liveAvailablePayout))}
              >
                <span>Request Instant Payout</span>
              </button>
            </div>
          </div>

          <div className="dash-card wallet-metric-card">
            <div className="metric-header">
              <span className="metric-tag">Pending Settlements</span>
              <Clock size={20} className="metric-icon orange" />
            </div>
            <h3 className="metric-number">
              ${livePendingSettlement.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="metric-footer-row">
              <span className="metric-sub">Estimated release in 48 hours</span>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table Box */}
      <div className="dash-card transactions-table-card">
        <div className="dash-card-header">
          <div>
            <h2 className="dash-card-title">
              {isTransactionsOnly ? 'All Transaction Records' : 'Recent Wallet Transactions'} ({walletTransactions.length})
            </h2>
            <p className="dash-card-subtitle">Detailed ledger of customer payments, bank payouts, and settlements</p>
          </div>

          <div className="transactions-filters-group">
            {['all', 'completed', 'refunds'].map((tab) => (
              <button
                key={tab}
                className={`filter-pill-btn ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}

            <button className="export-csv-btn" onClick={handleExportCSV}>
              <DownloadCloud size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type & Description</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((txn) => (
                <tr key={txn.id}>
                  <td className="table-bold-cell">{txn.id}</td>
                  <td>
                    <div className="txn-type-cell">
                      {txn.type.includes('Payout') ? (
                        <Building size={16} className="txn-icon blue" />
                      ) : txn.type.includes('Refund') ? (
                        <RotateCcw size={16} className="txn-icon red" />
                      ) : (
                        <CreditCard size={16} className="txn-icon green" />
                      )}
                      <span>{txn.type}</span>
                    </div>
                  </td>
                  <td className="table-date-cell">{txn.date}</td>
                  <td className={`table-bold-cell ${txn.amount.startsWith('+') ? 'text-green' : 'text-red'}`}>
                    {txn.amount}
                  </td>
                  <td>
                    <span className={`status-pill ${txn.status.toLowerCase()}`}>
                      {txn.status === 'Completed' && <CheckCircle2 size={12} />}
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredTxns.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
                    No transactions found in this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
