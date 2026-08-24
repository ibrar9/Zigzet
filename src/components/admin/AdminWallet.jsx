import React, { useState } from 'react';
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
  RotateCcw
} from 'lucide-react';
import { walletOverview } from '../../data/adminMockData';

export const AdminWallet = ({ isTransactionsOnly = false }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTxns = walletOverview.recentTransactions.filter((txn) => {
    if (activeFilter === 'completed') return txn.status === 'Completed';
    if (activeFilter === 'refunds') return txn.status === 'Refunded';
    return true;
  });

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
            <h3 className="metric-number">{walletOverview.totalBalance}</h3>
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
            <h3 className="metric-number">{walletOverview.availablePayout}</h3>
            <div className="metric-footer-row">
              <button className="payout-now-btn">
                <span>Request Instant Payout</span>
              </button>
            </div>
          </div>

          <div className="dash-card wallet-metric-card">
            <div className="metric-header">
              <span className="metric-tag">Pending Settlements</span>
              <Clock size={20} className="metric-icon orange" />
            </div>
            <h3 className="metric-number">{walletOverview.pendingSettlement}</h3>
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
              {isTransactionsOnly ? 'All Transaction Records' : 'Recent Wallet Transactions'}
            </h2>
            <p className="dash-card-subtitle">Detailed ledger of payments, payouts, and customer refunds</p>
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

            <button className="export-csv-btn">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
