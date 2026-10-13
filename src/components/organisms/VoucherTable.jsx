import React from 'react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { Edit, Trash2, FileText } from 'lucide-react';
import { formatCurrency, translateType, translateBehavior } from '../../utils/formatters';

function VoucherTable({ vouchers, products, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Concepto / Gasto</th>
            <th>Tipo Funcional</th>
            <th>Comportamiento</th>
            <th>Asociado A</th>
            <th className="text-right">Importe ($)</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map(v => {
            const linkedProduct = products.find(p => p.id === v.associatedProduct);
            
            // Badge color mapping
            let typeColor = 'rose';
            if (v.functionalType === 'indirect_labor' || v.functionalType === 'direct_labor') typeColor = 'purple';
            if (v.functionalType === 'cif') typeColor = 'amber';
            if (v.functionalType === 'fixed_gasto') typeColor = 'cyan';

            return (
              <tr key={v.id}>
                <td style={{ fontWeight: 500 }}>{v.concept}</td>
                <td>
                  <Badge variant={typeColor}>
                    {translateType(v.functionalType)}
                  </Badge>
                </td>
                <td>
                  <Badge variant={v.behavior === 'fixed' ? 'cyan' : 'emerald'}>
                    {translateBehavior(v.behavior)}
                  </Badge>
                </td>
                <td className="text-secondary" style={{ fontSize: '0.8rem' }}>
                  {v.functionalType === 'direct_materials' 
                    ? (linkedProduct ? linkedProduct.name : 'Producto Desconocido') 
                    : 'Base Consolidada (CIF/SIF)'}
                </td>
                <td className="text-right text-bold">{formatCurrency(v.amount)}</td>
                <td className="text-center">
                  <div className="action-buttons">
                    <Button variant="secondary" size="sm" onClick={() => onEdit(v)} title="Editar comprobante">
                      <Edit size={12} />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(v.id)} title="Eliminar comprobante">
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
          {vouchers.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-state">
                <FileText size={32} className="empty-state-icon" />
                <h3>No se encontraron comprobantes</h3>
                <p>No hay gastos que coincidan con los filtros o la búsqueda actual.</p>
              </td>
            </tr>
          )}
          {vouchers.length > 0 && (
            <tr className="totals-row">
              <td colSpan="4">
                Subtotal Filtrado ({vouchers.length} {vouchers.length === 1 ? 'comprobante' : 'comprobantes'})
              </td>
              <td className="text-right text-bold" style={{ color: 'var(--primary)' }}>
                {formatCurrency(vouchers.reduce((sum, v) => sum + (Number(v.amount) || 0), 0))}
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoucherTable;
