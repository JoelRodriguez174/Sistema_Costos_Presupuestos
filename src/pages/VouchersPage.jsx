import React from 'react';
import VouchersSection from '../components/sections/VouchersSection';
import Button from '../components/atoms/Button';
import { X } from 'lucide-react';
import useStore from '../store/useStore';
import useModal from '../hooks/useModal';

function VouchersPage() {
  const vouchers = useStore((state) => state.vouchers);
  const products = useStore((state) => state.products);
  const addVoucher = useStore((state) => state.addVoucher);
  const editVoucher = useStore((state) => state.editVoucher);
  const deleteVoucher = useStore((state) => state.deleteVoucher);

  const defaultForm = { 
    concept: '', 
    amount: 0, 
    functionalType: products.length > 0 ? 'direct_materials' : 'cif', 
    behavior: 'variable', 
    associatedProduct: products.length > 0 ? products[0].id : 'all' 
  };

  const {
    isOpen,
    editingItem,
    form,
    setForm,
    openForAdd,
    openForEdit,
    close
  } = useModal(defaultForm);

  const handleOpenEdit = (v) => {
    openForEdit(v, (item) => ({
      concept: item.concept,
      amount: item.amount,
      functionalType: item.functionalType,
      behavior: item.behavior,
      associatedProduct: item.associatedProduct
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este comprobante de gasto?')) {
      deleteVoucher(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      editVoucher({ ...editingItem, ...form });
    } else {
      addVoucher({
        id: 'v-' + Date.now(),
        ...form
      });
    }
    close();
  };

  return (
    <div>
      <VouchersSection 
        vouchers={vouchers}
        products={products}
        onAddVoucherClick={() => openForAdd(defaultForm)}
        onEditVoucherClick={handleOpenEdit}
        onDeleteVoucherClick={handleDelete}
      />

      {/* Voucher Modal Form */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingItem ? 'Editar Comprobante' : 'Cargar Comprobante / Gasto'}</h3>
              <button className="close-btn" onClick={close}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Concepto / Detalle:</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Factura de envases goteros de vidrio"
                    value={form.concept}
                    onChange={(e) => setForm({ ...form, concept: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Importe ($):</label>
                    <input 
                      type="number" 
                      required 
                      min="1" 
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Comportamiento:</label>
                    <select 
                      value={form.behavior} 
                      onChange={(e) => setForm({ ...form, behavior: e.target.value })}
                    >
                      <option value="variable">Variable (Varía con el volumen)</option>
                      <option value="fixed">Fijo (Constante)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tipo Funcional:</label>
                  <select 
                    value={form.functionalType} 
                    onChange={(e) => {
                      const newType = e.target.value;
                      let newProd = form.associatedProduct;
                      if ((newType === 'direct_materials' || newType === 'direct_labor') && form.associatedProduct === 'all') {
                        newProd = products.length > 0 ? products[0].id : 'all';
                      }
                      setForm({ ...form, functionalType: newType, associatedProduct: newProd });
                    }}
                  >
                    <option value="direct_materials" disabled={products.length === 0}>
                      Materiales Directos (MPD) {products.length === 0 ? '(Requiere productos en catálogo)' : ''}
                    </option>
                    <option value="direct_labor" disabled={products.length === 0}>
                      Mano de Obra Directa (MOD) {products.length === 0 ? '(Requiere productos en catálogo)' : ''}
                    </option>
                    <option value="cif">Costos Indirectos de Fabricación (CIF)</option>
                    <option value="fixed_gasto">Gasto Administrativo o de Ventas</option>
                  </select>
                </div>

                {(form.functionalType === 'direct_materials' || form.functionalType === 'direct_labor') && (
                  <div className="form-group">
                    <label>Producto Directamente Asociado:</label>
                    <select 
                      value={form.associatedProduct} 
                      onChange={(e) => setForm({ ...form, associatedProduct: e.target.value })}
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <Button type="button" variant="secondary" onClick={close}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  {editingItem ? 'Guardar Cambios' : 'Cargar Gasto'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VouchersPage;
