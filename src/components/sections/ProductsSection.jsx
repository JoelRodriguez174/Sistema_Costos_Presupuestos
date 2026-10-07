import React from 'react';
import ProductTable from '../organisms/ProductTable';
import Button from '../atoms/Button';
import { Plus } from 'lucide-react';

function ProductsSection({ 
  products, 
  onAddProductClick, 
  onEditProductClick, 
  onDeleteProductClick
}) {
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
        <ProductTable 
          products={products}
          onEdit={onEditProductClick}
          onDelete={onDeleteProductClick}
        />
      </div>
    </div>
  );
}

export default ProductsSection;
