import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Minus,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Tag,
  DollarSign
} from 'lucide-react';
import { ProductCategory, ProductAvailability } from '../../types';

export const InventoryTab: React.FC = () => {
  const { products, updateProductStock, updateProductPrice } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdjustStock = (productId: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    const availability: ProductAvailability = newStock > 15 ? 'in-stock' : newStock > 0 ? 'limited' : 'pre-order';
    updateProductStock(productId, newStock, availability);
  };

  const handleAvailabilityToggle = (productId: string, avail: ProductAvailability) => {
    const p = products.find((prod) => prod.id === productId);
    if (!p) return;
    updateProductStock(productId, p.stockCountApprox || 0, avail);
  };

  const handleSavePrice = (productId: string) => {
    if (tempPrice > 0) {
      updateProductPrice(productId, tempPrice);
    }
    setEditingPriceId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Live Farm Stock & Catalog Manager
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            Modify live retail prices in KES, adjust physical warehouse counts, and toggle customer availability
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '14px'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '160px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '16px',
            outline: 'none'
          }}
        >
          <option value="all">All Categories</option>
          <option value="eggs">Fresh Eggs</option>
          <option value="broilers">Broilers</option>
          <option value="kienyeji">Kienyeji Chicken</option>
          <option value="chicks">Day-Old Chicks</option>
          <option value="layers">Point of Lay</option>
          <option value="feeds">Feeds & Supplements</option>
          <option value="manure">Organic Manure</option>
        </select>
      </div>

      {/* Products Inventory Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '16px'
        }}
      >
        {filteredProducts.map((product) => {
          const currentStock = product.stockCountApprox ?? 45;
          const isLowStock = currentStock < 15;
          const isEditingPrice = editingPriceId === product.id;

          return (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {product.name}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {product.packSize} • {product.category.toUpperCase()}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor:
                        product.availability === 'in-stock'
                          ? 'rgba(34, 197, 94, 0.15)'
                          : product.availability === 'limited'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(56, 189, 248, 0.15)',
                      color:
                        product.availability === 'in-stock'
                          ? 'var(--primary-green)'
                          : product.availability === 'limited'
                          ? 'var(--accent-amber)'
                          : 'var(--accent-sky)',
                      border: '1px solid currentColor',
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.availability.replace('-', ' ')}
                  </span>
                </div>

                {/* Price Editor */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-section-alt)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price in KES:</span>
                  {isEditingPrice ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(parseFloat(e.target.value) || 0)}
                        style={{ width: '80px', padding: '4px 6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePrice(product.id)}
                        className="btn-primary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '1.05rem' }}>
                        KES {product.priceKes.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPriceId(product.id);
                          setTempPrice(product.priceKes);
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                        title="Edit price"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Physical Stock Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Warehouse Stock Count:</span>
                    <span style={{ fontWeight: 700, color: isLowStock ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                      {currentStock} {product.unit} {isLowStock && '⚠️ (Low)'}
                    </span>
                  </div>

                  {/* Increment / Decrement Stepper */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, currentStock, -5)}
                      style={{ flex: 1, padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      -5
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, currentStock, -1)}
                      style={{ flex: 1, padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      -1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, currentStock, 1)}
                      style={{ flex: 1, padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustStock(product.id, currentStock, 10)}
                      style={{ flex: 1, padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                {(['in-stock', 'limited', 'pre-order'] as ProductAvailability[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleAvailabilityToggle(product.id, st)}
                    style={{
                      flex: 1,
                      padding: '5px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: product.availability === st ? '1px solid var(--border-card)' : '1px solid transparent',
                      backgroundColor: product.availability === st ? 'var(--bg-input)' : 'transparent',
                      color: product.availability === st ? 'var(--text-primary)' : 'var(--text-muted)'
                    }}
                  >
                    {st.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
