import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export const SEOHead = () => {
  const { 
    currentPage, 
    viewMode, 
    seoSettings, 
    settings, 
    products, 
    activeCategory,
    quickViewProduct 
  } = useStore();

  useEffect(() => {
    const baseUrl = seoSettings.canonicalUrl || 'https://zigzet.com';
    let pageTitle = seoSettings.siteTitle || 'Zigzet - Shop Smarter. Live Better.';
    let pageDescription = seoSettings.defaultDescription;
    let pageKeywords = seoSettings.defaultKeywords;
    let pageUrl = `${baseUrl}/${currentPage === 'home' ? '' : currentPage}`;
    let pageImage = seoSettings.ogImage;
    let pageType = 'website';
    let productPrice = null;
    let productCurrency = 'USD';

    // 1. Dynamic Product Specific Meta Override
    if (quickViewProduct) {
      pageTitle = quickViewProduct.metaTitle 
        ? quickViewProduct.metaTitle 
        : `${quickViewProduct.name} - Only $${Number(quickViewProduct.price).toFixed(2)} | Zigzet`;
      pageDescription = quickViewProduct.metaDescription 
        ? quickViewProduct.metaDescription 
        : (quickViewProduct.description || `Buy ${quickViewProduct.name} online at best price on Zigzet. Free fast USA shipping & guaranteed authentic.`);
      pageKeywords = `${quickViewProduct.name}, buy ${quickViewProduct.name}, ${quickViewProduct.categoryName || quickViewProduct.category}, online deals`;
      pageImage = quickViewProduct.image;
      pageUrl = `${baseUrl}/shop?product=${quickViewProduct.id}`;
      pageType = 'product';
      productPrice = Number(quickViewProduct.price).toFixed(2);
    } else if (viewMode === 'admin') {
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

    // 3. Dynamic Website Favicon Update
    if (settings?.faviconUrl) {
      let faviconTag = document.querySelector("link[rel*='icon']");
      if (!faviconTag) {
        faviconTag = document.createElement('link');
        faviconTag.rel = 'icon';
        document.head.appendChild(faviconTag);
      }
      faviconTag.href = settings.faviconUrl;
    }

    // 4. Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (content === undefined || content === null) return;
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
    setMetaTag('property', 'og:type', pageType);
    setMetaTag('property', 'og:site_name', settings.storeName || 'Zigzet');

    if (productPrice) {
      setMetaTag('property', 'product:price:amount', productPrice);
      setMetaTag('property', 'product:price:currency', productCurrency);
    }

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', pageImage);

    // Canonical Tag
    setLinkTag('canonical', pageUrl);

    // 4. Schema.org JSON-LD Structured Data Graph
    const schemaGraph = [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": settings.storeName || "Zigzet",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": seoSettings.ogImage
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
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": settings.storeName || "Zigzet",
        "description": seoSettings.defaultDescription,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/shop?q={search_term_string}`,
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
            "item": `${baseUrl}/`
          },
          ...(currentPage !== 'home' ? [{
            "@type": "ListItem",
            "position": 2,
            "name": quickViewProduct ? quickViewProduct.name : (currentPage.charAt(0).toUpperCase() + currentPage.slice(1)),
            "item": pageUrl
          }] : [])
        ]
      }
    ];

    // If viewing a specific product, add Schema.org Product Entity
    if (quickViewProduct) {
      schemaGraph.push({
        "@type": "Product",
        "@id": `${baseUrl}/shop?product=${quickViewProduct.id}#product`,
        "name": quickViewProduct.metaTitle || quickViewProduct.name,
        "image": quickViewProduct.images && quickViewProduct.images.length > 0 ? quickViewProduct.images : [quickViewProduct.image],
        "description": quickViewProduct.metaDescription || quickViewProduct.description || `${quickViewProduct.name} available on Zigzet`,
        "sku": quickViewProduct.sku || `ZG-${quickViewProduct.id}`,
        "mpn": quickViewProduct.id,
        "brand": {
          "@type": "Brand",
          "name": quickViewProduct.brand || "Zigzet"
        },
        "offers": {
          "@type": "Offer",
          "url": pageUrl,
          "priceCurrency": "AED",
          "price": Number(quickViewProduct.price).toFixed(2),
          "priceValidUntil": "2026-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": (quickViewProduct.stock === undefined || quickViewProduct.stock > 0) 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": settings.storeName || "Zigzet"
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "AE",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0.00",
              "currency": "AED"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "AE"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "DAY"
              }
            }
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": quickViewProduct.rating || 4.8,
          "reviewCount": quickViewProduct.reviewsCount || 48,
          "bestRating": "5",
          "worstRating": "1"
        }
      });
    } else if (currentPage === 'shop' || currentPage === 'home') {
      // Add ItemList Schema for Product Inventory indexing
      schemaGraph.push({
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        "numberOfItems": products.length,
        "itemListElement": products.slice(0, 12).map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": p.name,
          "url": `${baseUrl}/shop?product=${p.id}`,
          "image": p.image
        }))
      });
    } else if (currentPage === 'contact' || currentPage === 'about') {
      // Add FAQ Schema for Rich Google Snippets
      schemaGraph.push({
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast is shipping on Zigzet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide fast tracked USA delivery in 2-4 business days. Free shipping applies to all orders over $50."
            }
          },
          {
            "@type": "Question",
            "name": "What is the return policy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a 30-day risk-free money-back guarantee with hassle-free prepaid returns."
            }
          },
          {
            "@type": "Question",
            "name": "Are payment methods encrypted and secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all checkout transactions are 256-bit SSL encrypted supporting Visa, MasterCard, American Express, Apple Pay, and Google Pay."
            }
          }
        ]
      });
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": schemaGraph
    };

    let scriptTag = document.querySelector('#zigzet-schema-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'zigzet-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [currentPage, viewMode, seoSettings, settings, quickViewProduct, products]);

  return null;
};
