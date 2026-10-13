import React from 'react';
import Badge from '../atoms/Badge';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

function CostAnalysisTable({ 
  productDetails, 
  totalUnitsSold, 
  totalRevenue, 
  totalVariableCosts, 
  totalContributionMargin, 
  averageIMC, 
  breakEvenUnits, 
  breakEvenPesos, 
  targetUtility, 
  cifBase
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Cost breakdown panel */}
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <h3 className="panel-title">Desglose de Costo Técnico Unitario por Absorción</h3>
            <p className="panel-title-desc" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Masa consolidada de indirectos (MOI + CIF + Gastos Fijos y Admin) absorbida al 100% vía Driver.
            </p>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th className="text-right" title="Materia prima e insumos directos imputados a cada unidad vendida">Costo Directo (MPD)</th>
                <th className="text-right" title="Parte de gastos fijos, alquileres y mano de obra indirecta absorbida por unidad según el driver">
                  Cuota CIF/SIF ({cifBase === 'unidades_vendidas' ? 'Unidades' : 'Horas'})
                </th>
                <th className="text-right bg-highlight" title="Costo integral por absorción: Costo Directo + Cuota CIF/SIF">Costo Total Unit.</th>
                <th className="text-right" title="Costo Variable Unitario: costos que dependen directamente de la producción">Costo Var. Unit. (CVU)</th>
                <th className="text-right" title="Precio de venta actual fijado en catálogo">Precio Actual</th>
                <th className="text-right" title="Margen neto actual obtenido por unidad tras absorber todos los costos directos e indirectos">Margen Neto Unit.</th>
                <th className="text-right text-primary-bold" title={`Precio de venta necesario para obtener un ${targetUtility}% de margen de utilidad neta`}>
                  Precio Sugerido ({targetUtility}%)
                </th>
                <th className="text-center" title="Evalúa si el precio actual cubre la estructura completa de costos">Estado Cobertura</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map(prod => (
                <tr key={prod.id}>
                  <td className="text-bold">{prod.name}</td>
                  <td className="text-right">{formatCurrency(prod.directMaterialsUnitario)}</td>
                  <td className="text-right">{formatCurrency(prod.cifUnitario)}</td>
                  <td className="text-right text-bold bg-highlight">
                    {formatCurrency(prod.costoTotalUnitario)}
                  </td>
                  <td className="text-right text-secondary">{formatCurrency(prod.costoVariableUnitario)}</td>
                  <td className="text-right text-bold">{formatCurrency(prod.price)}</td>
                  <td className={`text-right text-bold ${prod.utilidadNetaUnitaria >= 0 ? 'text-success' : 'text-danger'}`}>
                    {prod.utilidadNetaUnitaria >= 0 ? '+' : ''}{formatCurrency(prod.utilidadNetaUnitaria)}
                    <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500 }}>
                      ({formatPercent(prod.margenNetoPorcentaje)})
                    </span>
                  </td>
                  <td className="text-right text-primary-bold">{formatCurrency(prod.suggestedPrice)}</td>
                  <td className="text-center">
                    {prod.coversTotalCost ? (
                      <Badge variant="emerald">Cubre Total</Badge>
                    ) : prod.coversVariableCost ? (
                      <Badge variant="amber">Cubre Var (Riesgo)</Badge>
                    ) : (
                      <Badge variant="rose">Pérdida Crítica</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Contribution margins & mix panel */}
      <div className="panel">
        <h3 className="panel-title" style={{ marginBottom: '1rem' }}>Análisis del Mix de Ventas y Contribución Marginal</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th className="text-right" title="Porcentaje que representa este producto sobre el total de unidades del salón">Mix en Unids (%)</th>
                <th className="text-right" title="Facturación total mensual estimada">Ingresos</th>
                <th className="text-right" title="Total de costos variables consumidos por este producto">Costos Variables</th>
                <th className="text-right bg-highlight" title="Ingresos menos Costos Variables: dinero disponible para solventar los costos fijos">Margen Contribución</th>
                <th className="text-right" title="Porcentaje de cada peso facturado que queda disponible tras cubrir costos variables directos">Índice Margen (IMC)</th>
                <th className="text-right" title="Unidades mínimas de este producto que deben venderse para no ganar ni perder dinero">Punto Equilibrio (Unid)</th>
                <th className="text-right" title="Precio de referencia en salones o competidores de la zona">Precio Competencia</th>
                <th className="text-center" title="Comparación frente al precio de mercado de la competencia">Competitividad</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map(prod => {
                const mixPercent = totalUnitsSold > 0 ? (prod.unitsSold / totalUnitsSold) : 0;
                const prodBEUnits = breakEvenUnits * mixPercent;
                const priceDiff = prod.price - prod.competitorPrice;
                const isCompetitive = priceDiff <= 0;

                return (
                  <tr key={prod.id}>
                    <td className="text-bold">{prod.name}</td>
                    <td className="text-right">{formatPercent(mixPercent)}</td>
                    <td className="text-right">{formatCurrency(prod.revenue)}</td>
                    <td className="text-right">{formatCurrency(prod.variableCostsTotal)}</td>
                    <td className="text-right text-bold bg-highlight">
                      {formatCurrency(prod.margenContribucionTotal)}
                      <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                        {formatCurrency(prod.margenContribucionUnitario)}/u.
                      </span>
                    </td>
                    <td className={`text-right text-bold ${prod.imc >= 0 ? 'text-success' : 'text-danger'}`}>{formatPercent(prod.imc)}</td>
                    <td className="text-right">{formatNumber(prodBEUnits)} u.</td>
                    <td className="text-right text-secondary">{formatCurrency(prod.competitorPrice)}</td>
                    <td className="text-center">
                      {isCompetitive ? (
                        <Badge variant="emerald">Competitivo</Badge>
                      ) : (
                        <Badge variant="rose">Caro (+{formatCurrency(priceDiff)})</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr className="totals-row">
                <td>Total</td>
                <td className="text-right">100%</td>
                <td className="text-right">{formatCurrency(totalRevenue)}</td>
                <td className="text-right">{formatCurrency(totalVariableCosts)}</td>
                <td className="text-right">{formatCurrency(totalContributionMargin)}</td>
                <td className={`text-right text-bold ${averageIMC >= 0 ? 'text-success' : 'text-danger'}`}>{formatPercent(averageIMC)}</td>
                <td className="text-right">{formatNumber(breakEvenUnits)} u.</td>
                <td colSpan="2" className="text-center text-secondary" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
                  PE Pesos: {formatCurrency(breakEvenPesos)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Executive Plain-Language Guide for Business Owners */}
      <div className="panel" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Guía Rápida para la Toma de Decisiones
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              Cuota Consolidada CIF/SIF
            </strong>
            Todos los gastos generales (alquiler, energía, mano de obra general, admin) se reparten de forma justa entre los productos usando el driver (unidades u horas). Ningún gasto queda suelto.
          </div>
          <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              Índice de Margen de Contribución (IMC)
            </strong>
            Mide qué porcentaje de cada peso ingresado queda disponible para pagar los costos fijos. Un IMC más alto indica un producto más rentable que ayuda a alcanzar el punto de equilibrio más rápido.
          </div>
          <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              Precio Sugerido ({targetUtility}%)
            </strong>
            Es el precio calculado para garantizar un {targetUtility}% de rentabilidad neta real después de que el producto pague tanto sus insumos como su parte de los costos fijos del salón.
          </div>
        </div>
      </div>

    </div>
  );
}

export default CostAnalysisTable;
