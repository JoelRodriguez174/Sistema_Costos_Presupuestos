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
  activeSalesScenario,
  activePriceScenario,
  onOverrideChange,
  onClearOverrides,
  onResetProduct,
  onApplySalesScenario,
  onApplyPriceScenario,
  onApplyScenario
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
          desc="Insumos Directos (MPD) + Cuota Variable CIF/SIF"
          icon={Layers}
        />
        <KPICard 
          title="Margen Contribución"
          value={formatCurrency(metrics.totalContributionMargin)}
          trend={`${formatPercent(metrics.averageIMC)} de Margen Promedio`}
          trendDirection={metrics.averageIMC >= 0 ? 'up' : 'down'}
          icon={Percent}
        />
        <KPICard 
          title="Resultado Operativo"
          value={formatCurrency(metrics.resultadoOperativo)}
          desc="Utilidad neta tras absorber el 100% de costos fijos"
          icon={Activity}
          className={isProfitable ? 'success' : 'danger'}
          style={{ color: isProfitable ? 'var(--success)' : 'var(--danger)' }}
        />
      </div>

      {/* Estructura de Masa Consolidada CIF/SIF Info Banner */}
      <div className="panel" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Masa Consolidada de Indirectos (CIF/SIF): </strong>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatCurrency(metrics.totalCifConsolidado)}</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '0.35rem' }}>(100% absorbida vía driver)</span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
            <span>MOI General: <strong>{formatCurrency(metrics.moiTotal)}</strong></span>
            <span>CIF Operativo: <strong>{formatCurrency(metrics.cifOperativoTotal)}</strong></span>
            <span>Admin / Ventas: <strong>{formatCurrency(metrics.gastosAdminVentasTotal)}</strong></span>
          </div>
        </div>
      </div>

      {/* Breakeven & Financial Safety Gauge (kpi-dashboard-design) */}
      <div className="breakeven-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Cobertura del Punto de Equilibrio:
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, marginLeft: '0.4rem', color: isProfitable ? 'var(--success)' : 'var(--danger)' }}>
              {formatPercent((metrics.coverageRatio || 0) / 100)} absorbido
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Ventas mínimas para no perder dinero: <strong>{formatCurrency(metrics.breakEvenPesos)}</strong>
          </div>
        </div>

        <div className="progress-track">
          <div 
            className={`progress-fill ${isProfitable ? 'surplus' : 'deficit'}`} 
            style={{ width: `${Math.min(100, Math.max(5, metrics.coverageRatio || 0))}%` }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Ventas Simuladas: <strong>{formatCurrency(metrics.totalRevenue)}</strong></span>
          {isProfitable ? (
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>
              Colchón de seguridad: +{formatCurrency(metrics.safetyMarginPesos)} ({formatPercent((metrics.safetyMarginPercent || 0) / 100)})
            </span>
          ) : (
            <span style={{ color: 'var(--danger)', fontWeight: 600 }}>
              {metrics.averageIMC <= 0 
                ? 'Margen deficitario: El precio no cubre costos variables' 
                : `Faltante para equilibrio: -${formatCurrency(Math.max(0, metrics.breakEvenPesos - metrics.totalRevenue))}`}
            </span>
          )}
        </div>
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
        activeSalesScenario={activeSalesScenario}
        activePriceScenario={activePriceScenario}
        onOverrideChange={onOverrideChange}
        onClearOverrides={onClearOverrides}
        onResetProduct={onResetProduct}
        onApplySalesScenario={onApplySalesScenario}
        onApplyPriceScenario={onApplyPriceScenario}
        onApplyScenario={onApplyScenario}
      />
    </div>
  );
}

export default DashboardSection;
