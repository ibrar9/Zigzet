import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Plus,
  Image as ImageIcon,
  Sparkles,
  Tag,
  DollarSign,
  Layers,
  Upload,
  Trash2,
  Star,
  Check,
  Link as LinkIcon,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { categories } from '../../data/categories';
import { CustomDropdown } from '../common/CustomDropdown';
import { useStore } from '../../context/StoreContext';

export const ProductModal = ({ isOpen, onClose, onSave, editingProduct }) => {
  const { showToast } = useStore();
  const primaryFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    categoryName: 'Electronics',
    price: '',
    originalPrice: '',
    stock: 25,
    image: '',
    images: [],
    description: '',
    sku: '',
    brand: 'Zigzet',
    metaTitle: '',
    metaDescription: ''
  });

  const [showSeoFields, setShowSeoFields] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [showAddUrlBox, setShowAddUrlBox] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
    dot: c.id === 'electronics' ? '#3b82f6' : c.id === 'fashion' ? '#ec4899' : c.id === 'beauty' ? '#8b5cf6' : '#10b981'
  }));

  useEffect(() => {
    if (editingProduct) {
      const initialImages = editingProduct.images && editingProduct.images.length > 0
        ? [...editingProduct.images]
        : (editingProduct.image ? [editingProduct.image] : []);

      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || 'electronics',
        categoryName: editingProduct.categoryName || 'Electronics',
        price: editingProduct.price !== undefined ? editingProduct.price.toString() : '',
        originalPrice: editingProduct.originalPrice ? editingProduct.originalPrice.toString() : '',
        stock: editingProduct.stock !== undefined ? editingProduct.stock : 20,
        image: editingProduct.image || (initialImages[0] || ''),
        images: initialImages,
        description: editingProduct.description || '',
        sku: editingProduct.sku || `ZG-${editingProduct.id || 'PROD'}`,
        brand: editingProduct.brand || 'Zigzet',
        metaTitle: editingProduct.metaTitle || '',
        metaDescription: editingProduct.metaDescription || ''
      });
    } else {
      const defaultImg = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
      setFormData({
        name: '',
        category: 'electronics',
        categoryName: 'Electronics',
        price: '',
        originalPrice: '',
        stock: 25,
        image: defaultImg,
        images: [defaultImg],
        description: '',
        sku: `ZG-PROD-${Math.floor(100 + Math.random() * 900)}`,
        brand: 'Zigzet',
        metaTitle: '',
        metaDescription: ''
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleCategorySelect = (catId) => {
    const catObj = categories.find((c) => c.id === catId);
    setFormData({
      ...formData,
      category: catId,
      categoryName: catObj ? catObj.name : 'General'
    });
  };

  // 1. File Upload Handler for Primary Featured Image
  const handlePrimaryFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Invalid File', 'Please select an image file (PNG, JPG, WebP).', 'info');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormData((prev) => {
        const nextImages = prev.images.includes(dataUrl)
          ? prev.images
          : [dataUrl, ...prev.images];
        return {
          ...prev,
          image: dataUrl,
          images: nextImages
        };
      });
      showToast('Image Uploaded', `${file.name} set as primary product photo.`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 2. Drag and Drop Handler for Primary Image
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormData((prev) => {
        const nextImages = prev.images.includes(dataUrl)
          ? prev.images
          : [dataUrl, ...prev.images];
        return {
          ...prev,
          image: dataUrl,
          images: nextImages
        };
      });
      showToast('Image Uploaded', 'Product photo updated successfully.');
    };
    reader.readAsDataURL(file);
  };

  // 3. Multi-file Gallery Upload Handler
  const handleGalleryFilesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      showToast('Invalid Files', 'Please select image files.', 'info');
      return;
    }

    let loadedCount = 0;
    const newImages = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        loadedCount++;
        if (loadedCount === validFiles.length) {
          setFormData((prev) => {
            const combined = [...prev.images, ...newImages];
            // Remove duplicates
            const unique = Array.from(new Set(combined));
            return {
              ...prev,
              image: prev.image || unique[0],
              images: unique
            };
          });
          showToast('Gallery Updated', `Added ${validFiles.length} photo(s) to gallery.`);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // 4. Add Image to Gallery via URL
  const handleAddGalleryUrl = (e) => {
    e.preventDefault();
    if (!galleryUrlInput.trim()) return;

    const url = galleryUrlInput.trim();
    setFormData((prev) => {
      const updated = prev.images.includes(url) ? prev.images : [...prev.images, url];
      return {
        ...prev,
        image: prev.image || url,
        images: updated
      };
    });
    setGalleryUrlInput('');
    setShowAddUrlBox(false);
    showToast('Photo Added', 'Image URL added to gallery.');
  };

  // 5. Set any gallery photo as the Featured Cover Photo
  const handleSetPrimary = (imgUrl) => {
    setFormData((prev) => ({
      ...prev,
      image: imgUrl
    }));
    showToast('Cover Photo Updated', 'Selected image set as primary cover.');
  };

  // 6. Remove an image from gallery
  const handleRemoveGalleryImage = (imgUrl, e) => {
    e.stopPropagation();
    setFormData((prev) => {
      const nextImages = prev.images.filter((img) => img !== imgUrl);
      const nextPrimary = prev.image === imgUrl ? (nextImages[0] || '') : prev.image;
      return {
        ...prev,
        image: nextPrimary,
        images: nextImages
      };
    });
    showToast('Photo Removed', 'Image removed from gallery.', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      showToast('Validation Error', 'Please provide product name and a valid price.', 'info');
      return;
    }

    const trimmedName = formData.name.trim();
    const finalMetaTitle = formData.metaTitle.trim() || `${trimmedName} - Buy Online | Zigzet`;
    const finalMetaDesc = formData.metaDescription.trim() || formData.description.trim() || `Buy ${trimmedName} online at best price on Zigzet with fast UAE express delivery.`;

    const finalPrimaryImage = formData.image || (formData.images && formData.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
    const finalGallery = formData.images && formData.images.length > 0
      ? (formData.images.includes(finalPrimaryImage) ? formData.images : [finalPrimaryImage, ...formData.images])
      : [finalPrimaryImage];

    onSave({
      ...formData,
      name: trimmedName,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      image: finalPrimaryImage,
      images: finalGallery,
      metaTitle: finalMetaTitle,
      metaDescription: finalMetaDesc,
      sku: formData.sku.trim() || `ZG-${Date.now().toString().slice(-4)}`,
      brand: formData.brand.trim() || 'Zigzet'
    });
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {editingProduct ? 'Inventory Update' : 'New Catalog Item'}
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: '2px', color: '#0f172a' }}>
            {editingProduct ? `Edit "${editingProduct.name}"` : 'Create New Product'}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkout-form-grid">
            {/* Product Name */}
            <div className="form-group full-width">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Advanced Clear Sunscreen 100 SPF50 PA++++ – 50ml"
                required
              />
            </div>

            {/* Category Custom Dropdown */}
            <div className="form-group">
              <label>Category *</label>
              <CustomDropdown
                options={categoryOptions}
                value={formData.category}
                onChange={handleCategorySelect}
                width="100%"
              />
            </div>

            {/* Stock Quantity */}
            <div className="form-group">
              <label>Initial Stock Units *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
                required
              />
            </div>

            {/* Price (AED / $) */}
            <div className="form-group">
              <label>Selling Price (AED / $) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="34.00"
                required
              />
            </div>

            {/* Original Price */}
            <div className="form-group">
              <label>Original Price (For Sale badge)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="45.00"
              />
            </div>

            {/* ========================================================================= */}
            {/* 1. PRIMARY FEATURED PHOTO UPLOAD & CHANGE SECTION */}
            {/* ========================================================================= */}
            <div className="form-group full-width" style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ margin: 0, fontSize: '13.5px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={15} color="#eab308" fill="#eab308" />
                  <span>Featured Cover Photo *</span>
                </label>

                {/* Mode Switcher: Upload File vs Image URL */}
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('upload')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: imageInputMode === 'upload' ? '#ffffff' : 'transparent',
                      color: imageInputMode === 'upload' ? '#7c3aed' : '#64748b',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: imageInputMode === 'upload' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Upload size={12} /> Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: imageInputMode === 'url' ? '#ffffff' : 'transparent',
                      color: imageInputMode === 'url' ? '#7c3aed' : '#64748b',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: imageInputMode === 'url' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <LinkIcon size={12} /> Paste URL
                  </button>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={primaryFileInputRef}
                accept="image/*"
                onChange={handlePrimaryFileSelect}
                style={{ display: 'none' }}
              />

              {/* UPLOAD FILE MODE */}
              {imageInputMode === 'upload' ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  style={{
                    border: isDragging ? '2px dashed #7c3aed' : '1.5px dashed #cbd5e1',
                    background: isDragging ? '#f5f3ff' : '#f8fafc',
                    borderRadius: '12px',
                    padding: '16px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => primaryFileInputRef.current?.click()}
                >
                  {formData.image ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                      <div
                        style={{
                          width: '74px',
                          height: '74px',
                          borderRadius: '10px',
                          border: '2px solid #7c3aed',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(124, 58, 237, 0.15)'
                        }}
                      >
                        <img
                          src={formData.image}
                          alt="Primary Featured"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '12px' }}>
                            ✓ Active Cover Photo
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '4px 0 2px 0' }}>
                          Click to Replace / Change Photo
                        </p>
                        <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                          or drag and drop a new image file here (PNG, JPG, WebP)
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          primaryFileInputRef.current?.click();
                        }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#0f172a',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Upload size={13} /> Change
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '12px 0' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px auto',
                          color: '#7c3aed'
                        }}
                      >
                        <Upload size={20} />
                      </div>
                      <p style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>
                        Click to upload featured photo, or drag & drop
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        PNG, JPG, WebP or SVG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* URL INPUT MODE */
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        image: val,
                        images: prev.images.includes(val) ? prev.images : [val, ...prev.images.filter(Boolean)]
                      }));
                    }}
                    placeholder="https://cdn.shopify.com/... or https://images.unsplash.com/..."
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <ImageIcon size={18} color="#94a3b8" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* 2. PRODUCT IMAGE GALLERY (MULTI-PHOTO MULTI-ANGLE) SECTION */}
            {/* ========================================================================= */}
            <div
              className="form-group full-width"
              style={{
                marginTop: '12px',
                padding: '16px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}
            >
              {/* Gallery Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <label style={{ margin: 0, fontSize: '13.5px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={16} color="#7c3aed" />
                    <span>Product Image Gallery (Zoom & Angle Views)</span>
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '1px 8px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed' }}>
                      {formData.images?.length || 0} Photos
                    </span>
                  </label>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '3px 0 0 0' }}>
                    Upload multiple angles, packaging, or texture shots for the customer product zoom viewer.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Hidden Multi-file input */}
                  <input
                    type="file"
                    ref={galleryFileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFilesSelect}
                    style={{ display: 'none' }}
                  />

                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #7c3aed',
                      background: '#f5f3ff',
                      color: '#7c3aed',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Plus size={13} /> + Upload Files
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddUrlBox(!showAddUrlBox)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <LinkIcon size={12} /> Add URL
                  </button>
                </div>
              </div>

              {/* Add by URL Popover */}
              {showAddUrlBox && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <input
                    type="url"
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="Paste image URL to add to gallery..."
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    style={{ padding: '7px 14px', borderRadius: '6px', background: '#7c3aed', color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Thumbnails Grid */}
              {formData.images && formData.images.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                  {formData.images.map((imgUrl, idx) => {
                    const isPrimary = formData.image === imgUrl;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSetPrimary(imgUrl)}
                        style={{
                          position: 'relative',
                          aspectRatio: '1 / 1',
                          borderRadius: '10px',
                          border: isPrimary ? '2.5px solid #7c3aed' : '1px solid #e2e8f0',
                          background: '#f8fafc',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: isPrimary ? '0 4px 12px rgba(124, 58, 237, 0.2)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                        />

                        {/* Primary Badge */}
                        {isPrimary ? (
                          <span
                            style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              background: '#7c3aed',
                              color: '#ffffff',
                              fontSize: '9.5px',
                              fontWeight: '800',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            ★ Cover
                          </span>
                        ) : (
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '4px',
                              left: '4px',
                              background: 'rgba(15, 23, 42, 0.75)',
                              color: '#ffffff',
                              fontSize: '9.5px',
                              fontWeight: '600',
                              padding: '2px 5px',
                              borderRadius: '4px'
                            }}
                          >
                            Set Cover
                          </span>
                        )}

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={(e) => handleRemoveGalleryImage(imgUrl, e)}
                          title="Remove photo"
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.9)',
                            border: 'none',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                  <ImageIcon size={24} color="#94a3b8" style={{ margin: '0 auto 6px auto' }} />
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                    No gallery images added yet. Click "+ Upload Files" to add multiple photos.
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group full-width" style={{ marginTop: '12px' }}>
              <label>Description & Features</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key specifications, ingredients, materials, and benefits..."
              />
            </div>

            {/* Collapsible SEO & Google Snippet Section */}
            <div className="form-group full-width" style={{ marginTop: '6px' }}>
              <div 
                onClick={() => setShowSeoFields(!showSeoFields)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: showSeoFields ? '#f5f3ff' : '#f8fafc',
                  border: '1px solid ' + (showSeoFields ? '#ddd6fe' : '#e2e8f0'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#7c3aed" />
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>
                    Search Engine Optimization (SEO) & Google Rich Snippets
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>
                  {showSeoFields ? 'Hide SEO Options ▴' : 'Edit Google SEO ▾'}
                </span>
              </div>

              {showSeoFields && (
                <div style={{
                  marginTop: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Product SKU / Identifier
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="e.g. CFSC0153"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g. Cell Fusion C"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Custom Google Meta Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder={formData.name ? `${formData.name} - Buy Online | Zigzet` : 'Title for Google...'}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Custom Google Meta Description (Optional)
                    </label>
                    <textarea
                      rows="2"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder={formData.description || 'Description for Google search results...'}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  {/* Mini Google SERP Preview */}
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'arial, sans-serif'
                  }}>
                    <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Google Search Result Preview
                    </span>
                    <span style={{ fontSize: '11px', color: '#202124', display: 'block' }}>
                      https://zigzet.com › shop › {formData.name ? formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product'}
                    </span>
                    <span style={{ fontSize: '15px', color: '#1a0dab', fontWeight: '400', display: 'block', margin: '2px 0' }}>
                      {formData.metaTitle || (formData.name ? `${formData.name} - Only AED ${formData.price || '0.00'} | Zigzet` : 'Product Title')}
                    </span>
                    <span style={{ fontSize: '12px', color: '#4d5156', display: 'block', lineHeight: '1.4' }}>
                      {formData.metaDescription || (formData.description ? formData.description.slice(0, 130) + '...' : 'Buy authentic K-Beauty skincare online with fast UAE express delivery on Zigzet.')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '13.5px', border: 'none', cursor: 'pointer' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hero-cta-btn"
              style={{ padding: '10px 28px', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={15} />
              <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
