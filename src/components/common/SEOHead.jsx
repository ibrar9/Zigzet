import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export const SEOHead = () => {
  const { 
    currentPage, 
    viewMode, 
    seoSettings, 
    settings, 
    products, 
    activeCategory 
  } = useStore();

  useEffect(() => {
    // 1. Determine Title & Meta Description based on route / override
    let pageTitle = seoSettings.siteTitle || 'Zigzet - Shop Smarter. Live Better.';
    let pageDescription = seoSettings.defaultDescription;
    let pageKeywords = seoSettings.defaultKeywords;
    let pageUrl = `${seoSettings.canonicalUrl || 'https://zigzet.com'}/${currentPage === 'home' ? '' : currentPage}`;
    let pageImage = seoSettings.ogImage;

    // If viewing Admin Panel, prevent indexing
    if (viewMode === 'admin') {
      pageTitle = 'Admin Portal Suite | Zigzet Management';
      pageDescription = 'Secure store administration and operations suite.';
    } else if (currentPage === 'user-dashboard') {
      pageTitle = 'My Account Dashboard | Zigzet';
      pageDescription = 'Manage your orders, profile addresses, wishlist, and rewards points.';
    } else if (currentPage === 'user-login') {
      pageTitle = 'Sign In or Register | Zigzet Account';
      pageDescription = 'Sign in to access your saved wishlist, track orders, and redeem loyalty rewards.';
    } else if (seoSettings.pageOverrides && seoSettings.pageOverrides[currentPage]) {
      const override = seoSettings.pageOverrides[currentPage];
      if (override.title) pageTitle = override.title;
      if (override.description) pageDescription = override.description;
      if (override.keywords) pageKeywords = override.keywords;
    }

    // 2. Set Document Title
    document.title = pageTitle;

    // 3. Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tags
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('name', 'keywords', pageKeywords);
    setMetaTag('name', 'robots', viewMode === 'admin' || !seoSettings.allowIndexing ? 'noindex, nofollow' : 'index, follow');

    // Google Site Verification
    if (seoSettings.googleSiteVerification) {
      setMetaTag('name', 'google-site-verification', seoSettings.googleSiteVerification);
    }

    // Open Graph (Facebook / WhatsApp / LinkedIn)
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:image', pageImage);
    setMetaTag('property', 'og:url', pageUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', settings.storeName || 'Zigzet');

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', pageImage);

    // Canonical Tag
    setLinkTag('canonical', pageUrl);

    // 4. Schema.org JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${seoSettings.canonicalUrl || 'https://zigzet.com'}/#organization`,
          "name": settings.storeName || "Zigzet",
          "url": seoSettings.canonicalUrl || "https://zigzet.com",
          "logo": {
            "@type": "ImageObject",
            "url": pageImage
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-019-2834",
            "contactType": "Customer Support",
            "email": settings.contactEmail || "support@zigzet.com",
            "availableLanguage": ["English"]
          }
        },
        {
          "@type": "WebSite",
          "@id": `${seoSettings.canonicalUrl || 'https://zigzet.com'}/#website`,
          "url": seoSettings.canonicalUrl || "https://zigzet.com",
          "name": settings.storeName || "Zigzet",
          "description": pageDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${seoSettings.canonicalUrl || 'https://zigzet.com'}/shop?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${seoSettings.canonicalUrl || 'https://zigzet.com'}/`
            },
            ...(currentPage !== 'home' ? [{
              "@type": "ListItem",
              "position": 2,
              "name": currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
              "item": pageUrl
            }] : [])
          ]
        }
      ]
    };

    let scriptTag = document.querySelector('#zigzet-schema-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'zigzet-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [currentPage, viewMode, seoSettings, settings]);

  return null; // Head manager does not render visual DOM directly
};
