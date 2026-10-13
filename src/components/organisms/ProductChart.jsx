import React from 'react';
import SimControl from '../molecules/SimControl';
import { Sliders, RotateCcw } from 'lucide-react';
import { formatCurrency, formatCompactCurrency, formatNumber } from '../../utils/formatters';

function ProductChart({ 
  productDetails = [], 
  simOverrides = {}, 
  activeSalesScenario = null, 
  activePriceScenario = null, 
  onOverrideChange, 
  onClearOverrides, 
  onResetProduct, 
  onApplySalesScenario, 
  onApplyPriceScenario 
}) {
  // Safe maxVal calculation taking all 3 series into account, preventing bar explosion
  const maxVal = Math.max(
    ...productDetails.flatMap(p => [
      p.revenue || 0, 
      p.variableCostsTotal || 0, 
      Math.max(0, p.margenContribucionTotal || 0)
    ]), 
    1000
  );

  const activeOverridesCount = Object.keys(simOverrides).length;

  return (
    <div className="panel">
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 className="panel-title">Estructura Económica y Simulador por Producto</h3>
          <p className="panel-title-desc">
            Monitoree ingresos, costos y márgenes en tiempo real con rangos de simulación dinámicos y seguros.
          </p>
        </div>

        {/* Divided Scenario Presets: Ventas and Precios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', width: '100%', marginTop: '0.4rem', padding: '0.75rem 0.85rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          
          {/* 1. Escenarios de Ventas (Volumen) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', minWidth: '135px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              📦 Escenarios Ventas:
            </span>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'sales_plus_30' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('sales_plus_30')}
              title="Temporada alta o pico de demanda (+30% en unidades)"
            >
              +30% Temporada Alta
            </button>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'sales_plus_20' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('sales_plus_20')}
              title="Crecimiento comercial sostenido (+20% en unidades)"
            >
              +20% Crecimiento
            </button>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'sales_plus_10' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('sales_plus_10')}
              title="Expansión moderada (+10% en unidades)"
            >
              +10% Moderado
            </button>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'sales_minus_15' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('sales_minus_15')}
              title="Contracción leve de demanda (-15% en unidades)"
            >
              -15% Contracción
            </button>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'sales_minus_25' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('sales_minus_25')}
              title="Temporada baja o caída fuerte (-25% en unidades)"
            >
              -25% Temporada Baja
            </button>
            <button
              type="button"
              className={`scenario-btn ${activeSalesScenario === 'breakeven' ? 'active' : ''}`}
              onClick={() => onApplySalesScenario?.('breakeven')}
              title="Ventas mínimas para no ganar ni perder (Punto de Equilibrio con Utilidad $0)"
            >
              ⚖️ Punto de Equilibrio
            </button>
          </div>

          {/* 2. Escenarios de Precios (Tarifas) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success, #10b981)', minWidth: '135px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              🏷️ Escenarios Precios:
            </span>
            <button
              type="button"
              className={`scenario-btn ${activePriceScenario === 'price_plus_25' ? 'active' : ''}`}
              onClick={() => onApplyPriceScenario?.('price_plus_25')}
              title="Ajuste inflacionario fuerte o reposición de insumos (+25% en tarifas)"
            >
              +25% Inflación / Costos
            </button>
            <button
              type="button"
              className={`scenario-btn ${activePriceScenario === 'price_plus_15' ? 'active' : ''}`}
              onClick={() => onApplyPriceScenario?.('price_plus_15')}
              title="Aumento tarifario para recomponer margen (+15% en precios)"
            >
              +15% Mejora Margen
            </button>
            <button
              type="button"
              className={`scenario-btn ${activePriceScenario === 'price_plus_10' ? 'active' : ''}`}
              onClick={() => onApplyPriceScenario?.('price_plus_10')}
              title="Ajuste moderado de lista (+10% en precios)"
            >
              +10% Ajuste Tarifas
            </button>
            <button
              type="button"
              className={`scenario-btn ${activePriceScenario === 'price_minus_10' ? 'active' : ''}`}
              onClick={() => onApplyPriceScenario?.('price_minus_10')}
              title="Descuento promocional estándar (-10% en precios)"
            >
              -10% Descuento Promo
            </button>
            <button
              type="button"
              className={`scenario-btn ${activePriceScenario === 'price_minus_20' ? 'active' : ''}`}
              onClick={() => onApplyPriceScenario?.('price_minus_20')}
              title="Campaña agresiva de liquidación u oferta flash (-20% en precios)"
            >
              -20% Oferta Flash
            </button>

            {activeOverridesCount > 0 && (
              <button
                type="button"
                className="scenario-btn reset-all"
                onClick={onClearOverrides}
                title="Restablecer todos los precios y unidades a valores base de catálogo"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  marginLeft: 'auto'
                }}
              >
                <RotateCcw size={12} />
                Restablecer Base ({activeOverridesCount})
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="chart-sim-split">
        {/* Left Side: SVG Chart */}
        <div>
          {productDetails.length === 0 ? (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No hay productos registrados para proyectar en el gráfico.
            </div>
          ) : (
            <div className="chart-container">
              {/* Y-axis Labels with compact format to prevent overflow */}
              <div className="chart-y-axis">
                <span>{formatCompactCurrency(maxVal)}</span>
                <span>{formatCompactCurrency(maxVal / 2)}</span>
                <span>$0</span>
              </div>

              {productDetails.map((prod) => {
                const revHeight = maxVal > 0 ? Math.min(100, Math.max(0, (prod.revenue / maxVal) * 100)) : 0;
                const costHeight = maxVal > 0 ? Math.min(100, Math.max(0, (prod.variableCostsTotal / maxVal) * 100)) : 0;
                const isDeficit = prod.margenContribucionTotal < 0;
                const profitHeight = maxVal > 0 ? Math.min(100, Math.max(0, (prod.margenContribucionTotal / maxVal) * 100)) : 0;
                
                return (
                  <div 
                    className="chart-bar-group" 
                    key={prod.id}
                  >
                    <div className="chart-bars">
                      <div 
                        className="chart-bar revenue" 
                        style={{ height: `${revHeight}%` }} 
                        data-value={`Ventas: ${formatCurrency(prod.revenue)}`}
                      ></div>
                      <div 
                        className="chart-bar cost" 
                        style={{ height: `${costHeight}%` }} 
                        data-value={`Costo Var: ${formatCurrency(prod.variableCostsTotal)}`}
                      ></div>
                      <div 
                        className={`chart-bar profit ${isDeficit ? 'deficit' : ''}`}
                        style={{ 
                          height: isDeficit ? '4px' : `${profitHeight}%`,
                          background: isDeficit ? 'var(--danger, #ef4444)' : undefined
                        }} 
                        data-value={
                          isDeficit 
                            ? `Margen Déficit: ${formatCurrency(prod.margenContribucionTotal)}` 
                            : `Margen: ${formatCurrency(prod.margenContribucionTotal)}`
                        }
                      ></div>
                    </div>
                    <span className="chart-x-label" title={prod.name}>
                      {prod.name.length > 14 ? `${prod.name.substring(0, 12)}...` : prod.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color revenue"></div>
              <span>Ventas Sim ($)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color cost"></div>
              <span>Costos Var ($)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color profit"></div>
              <span>Margen Contrib. ($)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Simulation Sliders */}
        <div className="sim-controls-panel">
          <div className="sim-controls-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <Sliders size={14} className="text-primary-icon" />
              <span>Simular Variables:</span>
            </div>
            {activeOverridesCount > 0 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {activeOverridesCount} producto{activeOverridesCount > 1 ? 's' : ''} simulado{activeOverridesCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {productDetails.map(prod => {
            const override = simOverrides[prod.id] || {};
            const isProdModified = override.price !== undefined || override.unitsSold !== undefined;

            const basePrice = prod.basePrice !== undefined ? prod.basePrice : prod.price;
            const baseUnits = prod.baseUnitsSold !== undefined ? prod.baseUnitsSold : prod.unitsSold;

            const simPrice = override.price !== undefined ? override.price : basePrice;
            const simUnits = override.unitsSold !== undefined ? override.unitsSold : baseUnits;

            // Safe, dynamic bounds designed for ANY client:
            // 1. Price: Allows down to 20% of base price (80% discount promo) or minimum $10;
            //    up to 3x base price or 2.5x competitor price. Never 0 or negative.
            const priceMin = Math.max(Math.round(basePrice * 0.2), 10);
            const priceMax = Math.max(Math.round(basePrice * 3), Math.round((prod.competitorPrice || 0) * 2.5), 1000);
            
            // Dynamic price step based on scale
            let priceStep = 50;
            if (basePrice < 500) priceStep = 10;
            else if (basePrice < 5000) priceStep = 50;
            else if (basePrice < 25000) priceStep = 100;
            else if (basePrice < 100000) priceStep = 500;
            else priceStep = 1000;

            // 2. Units: Allows testing 0 units (stress test / discontinuation);
            //    up to 3.5x base units (minimum 50 for low-volume businesses).
            const unitsMin = 0;
            const unitsMax = Math.max(Math.round(Math.max(baseUnits, 1) * 3.5), 50);

            // Precision step of 1 to allow exact simulated quantities and avoid snapping issues
            const unitsStep = 1;

            return (
              <div className="sim-product-row" key={prod.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div className="sim-prod-name" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {prod.name}
                  </div>
                  {isProdModified && (
                    <button
                      type="button"
                      onClick={() => onResetProduct?.(prod.id)}
                      title="Restablecer este producto a sus valores base"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <RotateCcw size={10} />
                      Restablecer
                    </button>
                  )}
                </div>
                
                {/* Price Slider */}
                <SimControl 
                  label="Precio Venta:"
                  value={simPrice}
                  baseValue={basePrice}
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  onChange={(val) => onOverrideChange(prod.id, 'price', val)}
                  onReset={() => onOverrideChange(prod.id, 'price', basePrice)}
                  formatVal={formatCurrency}
                  subtitle={`Comp: ${formatCurrency(prod.competitorPrice)}`}
                />

                {/* Quantity Slider */}
                <SimControl 
                  label="Volumen Ventas:"
                  value={simUnits}
                  baseValue={baseUnits}
                  min={unitsMin}
                  max={unitsMax}
                  step={unitsStep}
                  onChange={(val) => onOverrideChange(prod.id, 'unitsSold', val)}
                  onReset={() => onOverrideChange(prod.id, 'unitsSold', baseUnits)}
                  formatVal={(v) => `${formatNumber(v)} u.`}
                  subtitle={`Base: ${formatNumber(baseUnits)} u.`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductChart;
