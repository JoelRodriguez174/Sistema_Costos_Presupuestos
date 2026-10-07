import React from 'react';
import VoucherTable from '../organisms/VoucherTable';
import Button from '../atoms/Button';
import { Plus } from 'lucide-react';

function VouchersSection({ 
  vouchers, 
  products, 
  onAddVoucherClick, 
  onEditVoucherClick, 
  onDeleteVoucherClick
}) {
  return (
    <div>
      <div className="page-title-area">
        <div>
          <h2 className="page-title">Comprobantes y Registro de Gastos</h2>
          <p className="page-subtitle">Registro cronológico de facturas de compras de materias primas (MPD), sueldos directos (MOD + F-931) y costos generales de administración.</p>
        </div>
        
        <Button variant="primary" onClick={onAddVoucherClick}>
          <Plus size={16} /> Cargar Comprobante
        </Button>
      </div>

      <div className="panel">
        <VoucherTable 
          vouchers={vouchers}
          products={products}
          onEdit={onEditVoucherClick}
          onDelete={onDeleteVoucherClick}
        />
      </div>
    </div>
  );
}

export default VouchersSection;
