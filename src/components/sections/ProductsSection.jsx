import React, { useState, useMemo } from 'react';
import ProductTable from '../organisms/ProductTable';
import Button from '../atoms/Button';
import { Plus, Search, X } from 'lucide-react';
import { normalizeSearchText } from '../../utils/formatters';

function ProductsSection({ 
  products, 
  onAddProductClick, 
  onEditProductClick, 
  onDeleteProductClick
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const term = normalizeSearchText(searchTerm);
    if (!term) return products;
    return products.filter(p => {
      const name = normalizeSearchText(p.name);
      return name.includes(term);
    });
  }, [products, searchTerm]);

  return (
    <div>
      <div className="page-title-area">
        <div>
          <h2 className="page-title">Catálogo de Productos Peluquería</h2>
          <p className="page-subtitle">Gestión de líneas capilares, volúmenes de venta y base de precios de la competencia.</p>
        </div>
        
        <Button variant="primary" onClick={onAddProductClick}>
          <Plus size={16} /> Nuevo Producto
        </Button>
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <div className="search-box">
            <span className="search-icon-wrapper">
              <Search size={14} />
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nombre de producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="search-clear-btn"
                title="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>


          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </div>
        </div>

        <ProductTable 
          products={filteredProducts}
          onEdit={onEditProductClick}
          onDelete={onDeleteProductClick}
        />
      </div>
    </div>
  );
}

export default ProductsSection;
