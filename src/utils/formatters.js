/**
 * Pure formatting utilities for currency, percentages and numbers.
 * Extracted from the Zustand store — these have zero state dependencies
 * and can be imported directly wherever they're needed.
 */

export const formatCurrency = (val) => {
  const num = Number.isFinite(Number(val)) ? Number(val) : 0;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(num);
};

export const formatCompactCurrency = (val) => {
  const num = Number.isFinite(Number(val)) ? Number(val) : 0;
  if (Math.abs(num) >= 1_000_000) {
    return `$${(num / 1_000_000).toLocaleString('es-AR', { maximumFractionDigits: 1 })}M`;
  }
  if (Math.abs(num) >= 1_000) {
    return `$${(num / 1_000).toLocaleString('es-AR', { maximumFractionDigits: 0 })}k`;
  }
  return formatCurrency(num);
};

export const formatPercent = (val) => {
  const num = Number.isFinite(Number(val)) ? Number(val) : 0;
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(num);
};

export const formatNumber = (val) => {
  const num = Number.isFinite(Number(val)) ? Number(val) : 0;
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 1
  }).format(num);
};

/**
 * Translation helpers for voucher functional types and cost behaviors.
 * Previously defined inline as anonymous arrow functions in VouchersPage.
 */
export const translateType = (t) => {
  const map = {
    direct_materials: 'Materiales Directos (MPD)',
    indirect_labor: 'Mano de Obra General (MOI)',
    direct_labor: 'Mano de Obra General (MOI)',
    cif: 'Costos Indirectos (CIF/SIF)',
    fixed_gasto: 'Gastos de Admin y Comercialización'
  };
  return map[t] || 'Gasto General';
};

export const translateBehavior = (b) => b === 'fixed' ? 'Fijo' : 'Variable';

/**
 * Normalizes text for search comparisons by converting to lowercase,
 * removing diacritics/accents (e.g. á -> a, ó -> o), and trimming whitespace.
 */
export const normalizeSearchText = (str) => {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

