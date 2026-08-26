import React, { useState } from 'react';
import { 
  Star, MessageSquare, CheckCircle2, Clock, ThumbsUp, 
  Trash2, Edit3, ShoppingBag, Package, X, Award
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserReviews = () => {
  const { reviews, addCustomerReview, deleteCustomerReview, orders, currentUser, settings, navigatePage } = useStore();
  const [activeSubTab, setActiveSubTab] = useState('toReview'); // 'toReview' | 'myReviews'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);

  // Modal Review Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [headline, setHeadline] = useState('');

  // Collect all purchased items from user's orders
  const myOrders = orders.filter(o =>
    o.email?.toLowerCase() === currentUser?.email?.toLowerCase() || !currentUser?.email
  );

  const purchasedProductsMap = new Map();
  myOrders.forEach(o => {
    (o.items || []).forEach(item => {
      if (!purchasedProductsMap.has(item.id || item.name)) {
        purchasedProductsMap.set(item.id || item.name, {
          ...item,
          orderId: o.id,
          orderDate: o.date
        });
      }
    });
  });

  const allPurchasedItems = Array.from(purchasedProductsMap.values());

  // Filter user's published reviews
  const myPublishedReviews = reviews.filter(r => 
    r.author?.toLowerCase() === currentUser?.name?.toLowerCase() ||
    r.email?.toLowerCase() === currentUser?.email?.toLowerCase() ||
    r.isCurrentUserReview
  );

  // Items to review: purchased items that don't have a review yet
  const pendingReviewItems = allPurchasedItems.filter(item => 
    !myPublishedReviews.some(r => r.productId === item.id || r.productName === item.name)
  );

  const openReviewModal = (item) => {
    setReviewProduct(item);
    setRating(5);
    setHoverRating(0);
    setHeadline('');
    setComment('');
    setIsModalOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim() || !reviewProduct) return;

    addCustomerReview({
      productId: reviewProduct.id,
      productName: reviewProduct.name,
      author: currentUser?.name || 'Sarah Jenkins',
      email: currentUser?.email || 'sarah.j@example.com',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating,
      comment: headline ? `${headline} — ${comment}` : comment,
      isCurrentUserReview: true
    });

    setIsModalOpen(false);
    setActiveSubTab('myReviews');
  };

  return (
    <div className="ud2-orders-page">
      {/* Header */}
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Reviews &amp; Ratings</h2>
          <p>Share your authentic experience and help other shoppers choose better</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #e2e8f0', marginBottom: 24 }}>
        <button
          onClick={() => setActiveSubTab('toReview')}
          style={{
            padding: '12px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'toReview' ? '2.5px solid #7c3aed' : '2.5px solid transparent',
            color: activeSubTab === 'toReview' ? '#7c3aed' : '#64748b',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>To Review</span>
          <span style={{ 
            background: activeSubTab === 'toReview' ? '#ede9fe' : '#f1f5f9', 
            color: activeSubTab === 'toReview' ? '#7c3aed' : '#64748b', 
            padding: '2px 8px', 
            borderRadius: 10, 
            fontSize: 11.5 
          }}>
            {pendingReviewItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('myReviews')}
          style={{
            padding: '12px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'myReviews' ? '2.5px solid #7c3aed' : '2.5px solid transparent',
            color: activeSubTab === 'myReviews' ? '#7c3aed' : '#64748b',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>My Reviews</span>
          <span style={{ 
            background: activeSubTab === 'myReviews' ? '#ede9fe' : '#f1f5f9', 
            color: activeSubTab === 'myReviews' ? '#7c3aed' : '#64748b', 
            padding: '2px 8px', 
            borderRadius: 10, 
            fontSize: 11.5 
          }}>
            {myPublishedReviews.length}
          </span>
        </button>
      </div>

      {/* Sub-tab 1: Items to Review */}
      {activeSubTab === 'toReview' && (
        <div>
          {pendingReviewItems.length === 0 ? (
            <div className="ud2-empty-page">
              <Award size={48} />
              <h3>All Caught Up!</h3>
              <p>You have reviewed all your delivered purchases. Thank you for sharing your feedback!</p>
              <button onClick={() => navigatePage('shop')}>Explore More Products</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
              {pendingReviewItems.map(item => (
                <div 
                  key={item.id || item.name} 
                  className="ud2-section-card" 
                  style={{ 
                    padding: 18, 
                    borderRadius: 14, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    gap: 16,
                    border: '1px solid #e2e8f0' 
                  }}
                >
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: '#f8fafc', border: '1px solid #e2e8f0', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Package size={24} style={{ color: '#94a3b8' }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', marginBottom: 4, lineHeight: 1.3 }}>{item.name}</p>
                      <p style={{ fontSize: 12.5, color: '#64748b' }}>
                        Purchased on {item.orderDate} · {settings?.currency || 'AED'} {Number(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: 2, color: '#cbd5e1' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={15} fill="#cbd5e1" />
                      ))}
                    </div>
                    <button
                      onClick={() => openReviewModal(item)}
                      style={{
                        background: '#7c3aed',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 14px',
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <Edit3 size={13} /> Write Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-tab 2: Published Reviews */}
      {activeSubTab === 'myReviews' && (
        <div>
          {myPublishedReviews.length === 0 ? (
            <div className="ud2-empty-page">
              <MessageSquare size={48} />
              <h3>No Reviews Yet</h3>
              <p>You haven't written any reviews yet. Share your experience with your recent purchases.</p>
              <button onClick={() => setActiveSubTab('toReview')}>Review Delivered Items</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {myPublishedReviews.map(r => (
                <div 
                  key={r.id} 
                  className="ud2-section-card" 
                  style={{ padding: 20, borderRadius: 14, border: '1px solid #e2e8f0' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 4 }}>
                        {r.productName || 'Verified Product'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star 
                              key={s} 
                              size={15} 
                              fill={s <= r.rating ? '#f59e0b' : '#e2e8f0'} 
                              color={s <= r.rating ? '#f59e0b' : '#cbd5e1'} 
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: 12.5, color: '#64748b' }}>{r.date}</span>
                        {r.verifiedPurchase !== false && (
                          <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                            <CheckCircle2 size={11} /> Verified Purchase
                          </span>
                        )}
                        <span style={{ 
                          background: r.status === 'Approved' ? '#ede9fe' : '#fef3c7', 
                          color: r.status === 'Approved' ? '#7c3aed' : '#d97706', 
                          fontSize: 11, 
                          fontWeight: 700, 
                          padding: '2px 7px', 
                          borderRadius: 4 
                        }}>
                          {r.status || 'Approved'}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteCustomerReview(r.id)}
                      title="Delete Review"
                      style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#dc2626' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.5, background: '#f8fafc', padding: 14, borderRadius: 10 }}>
                    "{r.comment}"
                  </p>

                  {/* Admin reply if present */}
                  {r.adminReply && (
                    <div style={{ marginTop: 12, padding: 12, background: '#faf5ff', borderLeft: '3px solid #7c3aed', borderRadius: '0 8px 8px 0' }}>
                      <p style={{ fontWeight: 700, fontSize: 12.5, color: '#7c3aed', marginBottom: 2 }}>Zigzet Team Response:</p>
                      <p style={{ fontSize: 12.5, color: '#475569' }}>{r.adminReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 500, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Write a Review</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Product Header */}
            {reviewProduct && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background: '#fff', border: '1px solid #e2e8f0', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {reviewProduct.image ? (
                    <img src={reviewProduct.image} alt={reviewProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Package size={20} style={{ color: '#94a3b8' }} />
                  )}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13.5, color: '#1e293b' }}>{reviewProduct.name}</p>
                  <p style={{ fontSize: 12, color: '#64748b' }}>Rate your overall satisfaction</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{ display: 'inline-flex', gap: 8, cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                    >
                      <Star
                        size={32}
                        fill={(hoverRating || rating) >= star ? '#f59e0b' : '#e2e8f0'}
                        color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                        style={{ transition: 'transform 0.15s ease' }}
                      />
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', marginTop: 6 }}>
                  {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional!' :
                   rating === 4 ? '⭐⭐⭐⭐ Great product' :
                   rating === 3 ? '⭐⭐⭐ Average' :
                   rating === 2 ? '⭐⭐ Below expectations' :
                   '⭐ Disappointed'}
                </p>
              </div>

              {/* Review Headline */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Review Headline</label>
                <input
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="e.g. Best skincare hydration formula ever!"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                />
              </div>

              {/* Review Comment */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Detailed Experience *</label>
                <textarea
                  required
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="Tell us what you loved about texture, fragrance, results, packaging, etc..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
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
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
