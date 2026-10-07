import React, { useState, useMemo } from 'react';
import { ActivePage, ProductCategory, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/shop/ProductCard';
import { FreeShippingBar } from '../components/shop/FreeShippingBar';
import { Search, Filter, ArrowUpDown, Sparkles, AlertCircle, ShoppingBag, Truck } from 'lucide-react';

interface ShopPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ setActivePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: PRODUCTS.length },
    { id: 'eggs', label: 'Fresh Eggs', count: PRODUCTS.filter((p) => p.category === 'eggs').length },
    { id: 'broilers', label: 'Broilers', count: PRODUCTS.filter((p) => p.category === 'broilers').length },
    { id: 'kienyeji', label: 'Kienyeji Chicken', count: PRODUCTS.filter((p) => p.category === 'kienyeji').length },
    { id: 'chicks', label: 'Day-Old Chicks', count: PRODUCTS.filter((p) => p.category === 'chicks').length },
    { id: 'layers', label: 'Point of Lay', count: PRODUCTS.filter((p) => p.category === 'layers').length },
    { id: 'feeds', label: 'Feeds & Nutrition', count: PRODUCTS.filter((p) => p.category === 'feeds').length },
    { id: 'manure', label: 'Organic Manure', count: PRODUCTS.filter((p) => p.category === 'manure').length }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keyFeatures.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
      if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div style={{ paddingBottom: '80px', width: '100%' }}>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: 'var(--bg-section-alt)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'clamp(28px, 5vw, 48px) 0'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <Sparkles size={14} /> 24/7 Verified Agribusiness Catalogue
            </span>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '12px'
              }}
            >
              Live Farm Shop & Transparent Prices
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Order farm-fresh eggs, dressed broilers, hardy kienyeji chicken, and feeds in Kenya Shillings (KES).
              Dispatched with cold-chain care or available for free Farm Gate collection.
            </p>

            {/* Farm Highlights Banner */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="var(--primary-green)" /> Daily Delivery Across Kiambu & Nairobi
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingBag size={14} color="var(--accent-sky)" /> Farm Gate Collection KES 0
              </span>
              <span>•</span>
              <span>M-Pesa & Pay-on-Delivery Eligible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Area */}
      <div className="container" style={{ marginTop: '28px' }}>
        {/* Free Shipping Progress Indicator */}
        <FreeShippingBar />

        {/* Filter & Search Bar */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginTop: '20px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Search and Sort Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 260px',
                minWidth: '220px'
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search eggs, broilers, kienyeji, starter feeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: '0 0 auto'
              }}
            >
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <label htmlFor="shop-sort" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Sort by:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '9px 12px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs / Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'thin'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 600 : 500,
                    backgroundColor: isSelected ? 'var(--primary-green)' : 'var(--bg-input)',
                    color: isSelected ? '#07130e' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--primary-green)' : '1px solid var(--border-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      opacity: isSelected ? 0.9 : 0.6,
                      backgroundColor: isSelected ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.06)',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Quick Notice */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProducts.length}</strong> products
          </span>
          {selectedCategory === 'chicks' && (
            <button
              type="button"
              onClick={() => setActivePage('chicks')}
              style={{
                color: 'var(--accent-sky)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.82rem',
                textDecoration: 'underline'
              }}
            >
              View Hatch Calendar & Pre-Orders →
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-card)'
            }}
          >
            <AlertCircle size={44} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>
              No poultry products found
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>
              We could not find anything matching "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Wholesale Opportunity Callout */}
        <div
          style={{
            marginTop: '56px',
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--status-warning)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Wholesale & Commercial Supplies
          </span>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--text-primary)', maxWidth: '600px' }}>
            Supplying Hotels, Schools, Caterers & Supermarkets in Bulk
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Need 20+ crates of eggs per week or 50+ dressed broilers on a standing order? We provide preferential wholesale pricing,
            guaranteed supply schedules, and formal delivery notes.
          </p>
          <button
            type="button"
            onClick={() => setActivePage('wholesale')}
            className="btn btn-primary"
            style={{ marginTop: '8px' }}
          >
            Get Wholesale Volume Quote
          </button>
        </div>
      </div>
    </div>
  );
};
