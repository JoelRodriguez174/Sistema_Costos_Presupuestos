import React, { useState, useMemo } from 'react';
import VoucherTable from '../organisms/VoucherTable';
import Button from '../atoms/Button';
import { Plus, Search, X } from 'lucide-react';
import { normalizeSearchText, translateType } from '../../utils/formatters';

function VouchersSection({ 
  vouchers, 
  products, 
  onAddVoucherClick, 
  onEditVoucherClick, 
  onDeleteVoucherClick 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'direct_materials', label: 'Insumos (MPD)' },
    { id: 'indirect_labor', label: 'Mano de Obra (MOI)' },
    { id: 'cif', label: 'Costos Indirectos (CIF)' },
    { id: 'fixed_gasto', label: 'Admin y Comercialización' }
  ];

  const filteredVouchers = useMemo(() => {
    const term = normalizeSearchText(searchTerm);
    return vouchers.filter(v => {
      const matchesCategory = selectedCategory === 'all' || v.functionalType === selectedCategory;
      if (!matchesCategory) return false;
      if (!term) return true;

      const concept = normalizeSearchText(v.concept);
      const linkedProduct = products?.find(p => p.id === v.associatedProduct);
      const prodName = linkedProduct ? normalizeSearchText(linkedProduct.name) : '';
      const typeText = normalizeSearchText(translateType(v.functionalType));

      return concept.includes(term) || prodName.includes(term) || typeText.includes(term);
    });
  }, [vouchers, products, selectedCategory, searchTerm]);

  return (
    <div>
      <div className="page-title-area">
        <div>
          <h2 className="page-title">Comprobantes y Registro de Gastos</h2>
          <p className="page-subtitle">Registro cronológico de facturas de compras de materias primas (MPD), sueldos indirectos (MOI) y costos generales de salón.</p>
        </div>
        
        <Button variant="primary" onClick={onAddVoucherClick}>
          <Plus size={16} /> Cargar Comprobante
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
              placeholder="Buscar por concepto o detalle de gasto..."
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


          <div className="filter-pills">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <VoucherTable 
          vouchers={filteredVouchers}
          products={products}
          onEdit={onEditVoucherClick}
          onDelete={onDeleteVoucherClick}
        />
      </div>
    </div>
  );
}

export default VouchersSection;
