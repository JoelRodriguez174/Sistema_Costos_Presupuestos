import React from 'react';
import Switch from '../atoms/Switch';

/**
 * CIF Base Allocation Toggle.
 * Previously duplicated identically in DashboardSection and CostAnalysisSection.
 */
function CifBaseToggle({ cifBase, onToggle }) {
  return (
    <div className="cif-toggle-container">
      <span className="cif-toggle-label">
        Base Asignación CIF:
      </span>
      <Switch 
        active={cifBase === 'horas_produccion'} 
        onChange={onToggle} 
        label={cifBase === 'unidades_vendidas' ? 'Unidades Vendidas (mensual)' : 'Horas Producción (mensual)'}
      />
    </div>
  );
}

export default CifBaseToggle;
