import React from 'react';
import Button from '../atoms/Button';
import { Edit, Trash2, Package } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th className="text-right">Unidades Vendidas (mensual)</th>
            <th className="text-right">Horas de Producción (mensual)</th>
            <th className="text-right">Precio de Competencia</th>
            <th className="text-right">Precio de Venta</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td className="text-bold">{prod.name}</td>
              <td className="text-right">{formatNumber(prod.unitsSold)} u.</td>
              <td className="text-right">{formatNumber(prod.productionHours)} hs</td>
              <td className="text-right text-secondary">{formatCurrency(prod.competitorPrice)}</td>
              <td className="text-right text-primary-bold">{formatCurrency(prod.price)}</td>
              <td className="text-center">
                <div className="action-buttons">
                  <Button variant="secondary" size="sm" onClick={() => onEdit(prod)} title="Editar producto">
                    <Edit size={12} />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(prod.id)} title="Eliminar producto">
                    <Trash2 size={12} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-state">
                <Package size={32} className="empty-state-icon" />
                <h3>No se encontraron productos</h3>
                <p>No hay productos registrados o que coincidan con la búsqueda actual.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
