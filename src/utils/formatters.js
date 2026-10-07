/**
 * Pure formatting utilities for currency, percentages and numbers.
 * Extracted from the Zustand store — these have zero state dependencies
 * and can be imported directly wherever they're needed.
 */

export const formatCurrency = (val) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(val);
};

export const formatPercent = (val) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(val);
};

export const formatNumber = (val) => {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 1
  }).format(val);
};

/**
 * Translation helpers for voucher functional types and cost behaviors.
 * Previously defined inline as anonymous arrow functions in VouchersPage.
 */
export const translateType = (t) => {
  const map = {
    direct_materials: 'Materiales Directos (MPD)',
    direct_labor: 'Mano de Obra Directa (MOD)',
    cif: 'Carga Fabril (CIF)',
    fixed_gasto: 'Gasto Admin/Ventas'
  };
  return map[t] || 'Gasto Admin/Ventas';
};

export const translateBehavior = (b) => b === 'fixed' ? 'Fijo' : 'Variable';
