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
            if (v.functionalType === 'direct_labor') typeColor = 'purple';
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
                  {v.associatedProduct === 'all' ? 'General (Taller/Empresa)' : (linkedProduct ? linkedProduct.name : 'Desconocido')}
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
                <h3>No hay comprobantes cargados</h3>
                <p>Haga clic en "Cargar Comprobante" para registrar facturas e insumos.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VoucherTable;
