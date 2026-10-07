import React from 'react';
import KPICard from '../molecules/KPICard';
import CifBaseToggle from '../molecules/CifBaseToggle';
import ProductChart from '../organisms/ProductChart';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';
import { 
  ShoppingCart, 
  Layers, 
  Percent, 
  Activity, 
  CheckCircle, 
  AlertTriangle
} from 'lucide-react';

function DashboardSection({ 
  metrics, 
  cifBase, 
  onCifBaseToggle, 
  simOverrides, 
  onOverrideChange
}) {
  const isProfitable = metrics.resultadoOperativo >= 0;

  return (
    <div>
      {/* Title & Top Configuration */}
      <div className="page-title-area">
        <div>
          <h2 className="page-title">Tablero de Control Capilar</h2>
          <p className="page-subtitle">Monitoreo general de costos, cobertura de costos fijos e indicadores de utilidad.</p>
        </div>
        
        <CifBaseToggle cifBase={cifBase} onToggle={onCifBaseToggle} />
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <KPICard 
          title="Ingresos Totales (Simulado)"
          value={formatCurrency(metrics.totalRevenue)}
          desc={`Venta de ${formatNumber(metrics.totalUnitsSold)} unidades capilares`}
          icon={ShoppingCart}
        />
        <KPICard 
          title="Costo Variable (Simulado)"
          value={formatCurrency(metrics.totalVariableCosts)}
          desc="Insumos (MPD) + MOD + CIF variables asignados"
          icon={Layers}
        />
        <KPICard 
          title="Margen Contribución"
          value={formatCurrency(metrics.totalContributionMargin)}
          trend={`${formatPercent(metrics.averageIMC)} de Margen Promedio`}
          trendDirection="up"
          icon={Percent}
        />
        <KPICard 
          title="Resultado Operativo"
          value={formatCurrency(metrics.resultadoOperativo)}
          desc="Neto después de absorber costos fijos totales"
          icon={Activity}
          className={isProfitable ? 'success' : 'danger'}
          style={{ color: isProfitable ? 'var(--success)' : 'var(--danger)' }}
        />
      </div>

      {/* Cobertura de Costos Fijos Alert */}
      {isProfitable ? (
        <div className="alert-box success">
          <CheckCircle className="alert-icon" size={20} />
          <div className="alert-content">
            <h4>Superávit Operativo Alcanzado</h4>
            <p>
              El volumen de ventas y precios actuales cubren la totalidad de los costos fijos consolidados ({formatCurrency(metrics.totalFixedCosts)}) y generan una utilidad operativa estimada de {formatCurrency(metrics.resultadoOperativo)}.
            </p>
          </div>
        </div>
      ) : (
        <div className="alert-box danger">
          <AlertTriangle className="alert-icon" size={20} />
          <div className="alert-content">
            <h4>Alerta de Cobertura: Pérdida Operativa</h4>
            <p>
              El escenario actual no genera suficiente margen para absorber los costos fijos totales de {formatCurrency(metrics.totalFixedCosts)}. Se requiere un incremento de precios o cantidades para revertir el déficit de {formatCurrency(Math.abs(metrics.resultadoOperativo))}.
            </p>
          </div>
        </div>
      )}

      {/* Integrated SVG Chart and sliders inside ProductChart organism */}
      <ProductChart 
        productDetails={metrics.productDetails}
        simOverrides={simOverrides}
        onOverrideChange={onOverrideChange}
      />
    </div>
  );
}

export default DashboardSection;
