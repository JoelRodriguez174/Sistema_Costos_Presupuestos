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
        <h3 className="panel-title" style={{ marginBottom: '1rem' }}>Desglose de Costo Técnico Unitario</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th className="text-right">MPD Unit.</th>
                <th className="text-right">MOD Unit.</th>
                <th className="text-right">CIF Unit. ({cifBase === 'unidades_vendidas' ? 'Unids' : 'Hs'})</th>
                <th className="text-right bg-highlight">Costo Total Unit.</th>
                <th className="text-right">Costo Var. Unit. (CVU)</th>
                <th className="text-right">Precio Actual</th>
                <th className="text-right text-primary-bold">Precio Sugerido ({targetUtility}%)</th>
                <th className="text-center">Estado Cobertura</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map(prod => (
                <tr key={prod.id}>
                  <td className="text-bold">{prod.name}</td>
                  <td className="text-right">{formatCurrency(prod.materialsUnitario)}</td>
                  <td className="text-right">{formatCurrency(prod.laborUnitario)}</td>
                  <td className="text-right">{formatCurrency(prod.cifUnitario)}</td>
                  <td className="text-right text-bold bg-highlight">
                    {formatCurrency(prod.costoTotalUnitario)}
                  </td>
                  <td className="text-right text-secondary">{formatCurrency(prod.costoVariableUnitario)}</td>
                  <td className="text-right text-bold">{formatCurrency(prod.price)}</td>
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
                <th className="text-right">Mix en Unids (%)</th>
                <th className="text-right">Ingresos</th>
                <th className="text-right">Costos Variables</th>
                <th className="text-right bg-highlight">Margen Contribución</th>
                <th className="text-right">Índice Margen (IMC)</th>
                <th className="text-right">Punto Equilibrio (Unid)</th>
                <th className="text-right">Precio Competencia</th>
                <th className="text-center">Competitividad</th>
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
                    </td>
                    <td className="text-right text-success">{formatPercent(prod.imc)}</td>
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
                <td className="text-right text-success">{formatPercent(averageIMC)}</td>
                <td className="text-right">{formatNumber(breakEvenUnits)} u.</td>
                <td colSpan="2" className="text-center text-secondary" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
                  PE Pesos: {formatCurrency(breakEvenPesos)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default CostAnalysisTable;
