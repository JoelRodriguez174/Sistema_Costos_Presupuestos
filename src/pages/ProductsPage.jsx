import React from 'react';
import ProductsSection from '../components/sections/ProductsSection';
import Button from '../components/atoms/Button';
import { X } from 'lucide-react';
import useStore from '../store/useStore';
import useModal from '../hooks/useModal';

function ProductsPage() {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const editProduct = useStore((state) => state.editProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const {
    isOpen,
    editingItem,
    form,
    setForm,
    openForAdd,
    openForEdit,
    close
  } = useModal({ name: '', unitsSold: 0, productionHours: 0, competitorPrice: 0, price: 0 });

  const handleOpenEdit = (prod) => {
    openForEdit(prod, (item) => ({
      name: item.name,
      unitsSold: item.unitsSold,
      productionHours: item.productionHours,
      competitorPrice: item.competitorPrice,
      price: item.price
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto del catálogo? Se borrarán sus asignaciones.')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      editProduct({ ...editingItem, ...form });
    } else {
      addProduct({
        id: 'prod-' + Date.now(),
        ...form
      });
    }
    close();
  };

  return (
    <div>
      <ProductsSection 
        products={products}
        onAddProductClick={() => openForAdd()}
        onEditProductClick={handleOpenEdit}
        onDeleteProductClick={handleDelete}
      />

      {/* Product Form Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingItem ? 'Editar Producto Capilar' : 'Alta de Nuevo Producto'}</h3>
              <button className="close-btn" onClick={close}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre del Producto:</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Tinte Capilar Profesional Rubio Ceniza"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Unidades Vendidas (mensual):</label>
                    <input 
                      type="number" 
                      required 
                      min="0" 
                      value={form.unitsSold}
                      onChange={(e) => setForm({ ...form, unitsSold: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Horas de Producción (mensual):</label>
                    <input 
                      type="number" 
                      required 
                      min="0" 
                      value={form.productionHours}
                      onChange={(e) => setForm({ ...form, productionHours: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Precio Competencia ($):</label>
                    <input 
                      type="number" 
                      required 
                      min="0" 
                      value={form.competitorPrice}
                      onChange={(e) => setForm({ ...form, competitorPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio de Venta ($):</label>
                    <input 
                      type="number" 
                      required 
                      min="0" 
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button type="button" variant="secondary" onClick={close}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  {editingItem ? 'Guardar Cambios' : 'Registrar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
