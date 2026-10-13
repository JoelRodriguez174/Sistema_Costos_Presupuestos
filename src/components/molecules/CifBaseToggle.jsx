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
        Driver de Asignación CIF/SIF:
      </span>
      <Switch 
        active={cifBase === 'horas_produccion'} 
        onChange={onToggle} 
        label={cifBase === 'unidades_vendidas' ? 'Unidades Producidas' : 'Horas Hombre / Producción'}
      />
    </div>
  );
}

export default CifBaseToggle;
