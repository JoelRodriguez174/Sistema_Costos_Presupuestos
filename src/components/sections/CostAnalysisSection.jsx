import React from 'react';
import CostAnalysisTable from '../organisms/CostAnalysisTable';
import CifBaseToggle from '../molecules/CifBaseToggle';
import { Info } from 'lucide-react';

function CostAnalysisSection({
  productDetails,
  totalUnitsSold,
  totalRevenue,
  totalVariableCosts,
  totalContributionMargin,
  averageIMC,
  breakEvenUnits,
  breakEvenPesos,
  targetUtility,
  onTargetUtilityChange,
  cifBase,
  onCifBaseToggle
}) {
  return (
    <div>
      <div className="page-title-area">
        <div>
          <h2 className="page-title">Análisis de Costos y Márgenes</h2>
          <p className="page-subtitle">Desglose de costos unitarios [Materia Prima + Cuota Consolidada CIF/SIF] y absorción total.</p>
        </div>
        
        <CifBaseToggle cifBase={cifBase} onToggle={onCifBaseToggle} />
      </div>

      {/* Target Margin controls */}
      <div className="panel margin-control-panel">
        <div className="margin-control-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Utilidad Deseada Objetivo: <span className="text-primary-bold">{targetUtility}%</span></label>
            <input
              type="range"
              min="5"
              max="90"
              value={targetUtility}
              onChange={(e) => onTargetUtilityChange(Number(e.target.value))}
            />
          </div>

          <div className="margin-info">
            <Info size={14} className="text-primary-icon" />
            <span>
              <strong>Cálculo de Margen:</strong> <code>Precio = Costo Total / (1 - Margen%)</code>
              <br />
              Absorbe el 100% de la masa indirecta consolidada (MOI + CIF + Gastos Fijos) asegurando utilidad neta real.
            </span>
          </div>
        </div>
      </div>

      <CostAnalysisTable
        productDetails={productDetails}
        totalUnitsSold={totalUnitsSold}
        totalRevenue={totalRevenue}
        totalVariableCosts={totalVariableCosts}
        totalContributionMargin={totalContributionMargin}
        averageIMC={averageIMC}
        breakEvenUnits={breakEvenUnits}
        breakEvenPesos={breakEvenPesos}
        targetUtility={targetUtility}
        cifBase={cifBase}
      />
    </div>
  );
}

export default CostAnalysisSection;
