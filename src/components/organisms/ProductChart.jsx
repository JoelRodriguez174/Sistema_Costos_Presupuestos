import React from 'react';
import SimControl from '../molecules/SimControl';
import { Sliders } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

function ProductChart({ 
  productDetails, 
  simOverrides, 
  onOverrideChange
}) {
  // Find the maximum revenue to scale the chart bars
  const maxVal = Math.max(...productDetails.map(p => p.revenue), 1);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h3 className="panel-title">Estructura Económica y Simulador por Producto</h3>
          <p className="panel-title-desc">Monitoree ventas, costos y márgenes, y arrastre los controles para proyectar escenarios en tiempo real.</p>
        </div>
      </div>

      <div className="chart-sim-split">
        {/* Left Side: SVG Chart */}
        <div>
          <div className="chart-container">
            {/* Y-axis Labels */}
            <div className="chart-y-axis">
              <span>{formatCurrency(maxVal)}</span>
              <span>{formatCurrency(maxVal / 2)}</span>
              <span>$0</span>
            </div>

            {productDetails.map((prod) => {
              const revHeight = maxVal > 0 ? (prod.revenue / maxVal) * 100 : 0;
              const costHeight = maxVal > 0 ? (prod.variableCostsTotal / maxVal) * 100 : 0;
              const profitHeight = maxVal > 0 ? (prod.margenContribucionTotal / maxVal) * 100 : 0;
              
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
                      className="chart-bar profit" 
                      style={{ height: `${profitHeight}%` }} 
                      data-value={`Margen: ${formatCurrency(prod.margenContribucionTotal)}`}
                    ></div>
                  </div>
                  <span className="chart-x-label" title={prod.name}>
                    {prod.name.length > 14 ? `${prod.name.substring(0, 12)}...` : prod.name}
                  </span>
                </div>
              );
            })}
          </div>

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
          <div className="sim-controls-header">
            <Sliders size={14} className="text-primary-icon" />
            <span>Simular Variables:</span>
          </div>

          {productDetails.map(prod => {
            const override = simOverrides[prod.id] || {};
            const simPrice = override.price !== undefined ? override.price : prod.price;
            const simUnits = override.unitsSold !== undefined ? override.unitsSold : prod.unitsSold;

            // Dynamic max based on actual data (2x current value or 2x competitor, whichever is higher)
            const priceMax = Math.max(prod.price * 2, prod.competitorPrice * 2, 20000);
            const unitsMax = Math.max(prod.unitsSold * 3, 500);

            return (
              <div className="sim-product-row" key={prod.id}>
                <div className="sim-prod-name">{prod.name}</div>
                
                {/* Price Slider */}
                <SimControl 
                  label="Precio Venta:"
                  value={simPrice}
                  min={500}
                  max={priceMax}
                  step={50}
                  onChange={(val) => onOverrideChange(prod.id, 'price', val)}
                  formatVal={formatCurrency}
                  subtitle={`Comp: ${formatCurrency(prod.competitorPrice)}`}
                />

                {/* Quantity Slider */}
                <SimControl 
                  label="Volumen Ventas:"
                  value={simUnits}
                  min={10}
                  max={unitsMax}
                  step={10}
                  onChange={(val) => onOverrideChange(prod.id, 'unitsSold', val)}
                  formatVal={(v) => `${formatNumber(v)} u.`}
                  subtitle={`Base: ${formatNumber(prod.unitsSold)} u.`}
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
