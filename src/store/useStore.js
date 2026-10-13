import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Realistic Hair Salon Services & Products Data
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Corte y Peinado Profesional',
    unitsSold: 350,
    productionHours: 175,
    competitorPrice: 20000,
    price: 18000
  },
  {
    id: 'prod-2',
    name: 'Coloración, Tintura y Balayage',
    unitsSold: 180,
    productionHours: 270,
    competitorPrice: 38000,
    price: 35000
  },
  {
    id: 'prod-3',
    name: 'Tratamiento Nutrición / Keratina S.O.S.',
    unitsSold: 120,
    productionHours: 120,
    competitorPrice: 26000,
    price: 24000
  },
  {
    id: 'prod-4',
    name: 'Lavado y Nutrición Exprés',
    unitsSold: 450,
    productionHours: 112,
    competitorPrice: 10500,
    price: 9500
  }
];

export const INITIAL_VOUCHERS = [
  // Materiales Directos (MPD)
  {
    id: 'v-1',
    concept: 'Kit Insumos Coloración (Tubos tintura, agua oxigenada, decolorante)',
    amount: 1800000,
    functionalType: 'direct_materials',
    behavior: 'variable',
    associatedProduct: 'prod-2'
  },
  {
    id: 'v-2',
    concept: 'Ampollas de Keratina y Tratamiento Cauterizador',
    amount: 720000,
    functionalType: 'direct_materials',
    behavior: 'variable',
    associatedProduct: 'prod-3'
  },
  {
    id: 'v-3',
    concept: 'Shampoo Técnico y Bálsamos Lavacabezas (Bidones 5L)',
    amount: 675000,
    functionalType: 'direct_materials',
    behavior: 'variable',
    associatedProduct: 'prod-4'
  },
  {
    id: 'v-4',
    concept: 'Productos Finalizadores (Ceras, serums y fijadores)',
    amount: 315000,
    functionalType: 'direct_materials',
    behavior: 'variable',
    associatedProduct: 'prod-1'
  },

  // Masa Consolidada de Indirectos (CIF/SIF) - Rubro: Mano de Obra General / Indirecta (MOI)
  {
    id: 'v-5',
    concept: 'Honorarios y Comisiones Estilistas por Corte y Peinado',
    amount: 2100000,
    functionalType: 'indirect_labor',
    behavior: 'variable',
    associatedProduct: 'all'
  },
  {
    id: 'v-6',
    concept: 'Honorarios Coloristas Especializados del Salón',
    amount: 2268000,
    functionalType: 'indirect_labor',
    behavior: 'variable',
    associatedProduct: 'all'
  },
  {
    id: 'v-7',
    concept: 'Honorarios Técnicos de Tratamientos Capilares',
    amount: 960000,
    functionalType: 'indirect_labor',
    behavior: 'variable',
    associatedProduct: 'all'
  },
  {
    id: 'v-8',
    concept: 'Sueldo Fijo Ayudantes y Lavacabezas Salón',
    amount: 1350000,
    functionalType: 'indirect_labor',
    behavior: 'fixed',
    associatedProduct: 'all'
  },

  // Masa Consolidada de Indirectos (CIF/SIF) - Rubro: Costos Indirectos de Fabricación / Salón (CIF)
  {
    id: 'v-9',
    concept: 'Servicio Eléctrico Salón (Secadores, climazores, planchas)',
    amount: 450000,
    functionalType: 'cif',
    behavior: 'variable',
    associatedProduct: 'all'
  },
  {
    id: 'v-10',
    concept: 'Servicio de Agua y Gas (Agua caliente continuada lavacabezas)',
    amount: 180000,
    functionalType: 'cif',
    behavior: 'variable',
    associatedProduct: 'all'
  },
  {
    id: 'v-11',
    concept: 'Alquiler de Local Comercial Peluquería',
    amount: 1200000,
    functionalType: 'cif',
    behavior: 'fixed',
    associatedProduct: 'all'
  },
  {
    id: 'v-12',
    concept: 'Mantenimiento y Service de Sillones y Secadores de Pie',
    amount: 350000,
    functionalType: 'cif',
    behavior: 'fixed',
    associatedProduct: 'all'
  },
  {
    id: 'v-13',
    concept: 'Servicio Lavandería e Higienización de Toallas y Capas',
    amount: 220000,
    functionalType: 'cif',
    behavior: 'variable',
    associatedProduct: 'all'
  },

  // Masa Consolidada de Indirectos (CIF/SIF) - Rubro: Gastos Administrativos / Comercialización
  {
    id: 'v-14',
    concept: 'Publicidad en Instagram/TikTok Ads y Promociones Salón',
    amount: 380000,
    functionalType: 'fixed_gasto',
    behavior: 'fixed',
    associatedProduct: 'all'
  },
  {
    id: 'v-15',
    concept: 'Sistema de Gestión de Turnos Online y Terminal Posnet',
    amount: 95000,
    functionalType: 'fixed_gasto',
    behavior: 'fixed',
    associatedProduct: 'all'
  },
  {
    id: 'v-16',
    concept: 'Honorarios Contables y Asesoría Legal',
    amount: 250000,
    functionalType: 'fixed_gasto',
    behavior: 'fixed',
    associatedProduct: 'all'
  }
];

const useStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      products: INITIAL_PRODUCTS,
      vouchers: INITIAL_VOUCHERS,
      cifBase: 'unidades_vendidas',
      targetUtility: 30,
      simOverrides: {},
      activeSalesScenario: null,
      activePriceScenario: null,

      // Core Financial Calculation Selector con Masa Consolidada CIF/SIF y Driver de Asignación 100%
      getMetrics: () => {
        const { products, vouchers, cifBase, targetUtility, simOverrides } = get();

        // 1. Consolidación de la Base de Costos Indirectos (CIF/SIF) en una sola pasada (O(N))
        // Agrupa: Mano de Obra General (MOI) + CIF de Salón + Gastos Fijos de Admin/Ventas
        // Cero gastos flotantes sin asignar.
        let totalCifConsolidado = 0;
        let variableCifConsolidado = 0;
        let fixedCifConsolidado = 0;
        let moiTotal = 0;
        let cifOperativoTotal = 0;
        let gastosAdminVentasTotal = 0;
        let totalDirectMaterials = 0;
        let directMaterialsVariable = 0;
        let directMaterialsFixed = 0;

        for (const v of vouchers) {
          if (v.functionalType === 'direct_materials') {
            totalDirectMaterials += v.amount;
            if (v.behavior === 'fixed') {
              directMaterialsFixed += v.amount;
            } else {
              directMaterialsVariable += v.amount;
            }
          } else {
            totalCifConsolidado += v.amount;
            if (v.behavior === 'variable') {
              variableCifConsolidado += v.amount;
            } else {
              fixedCifConsolidado += v.amount;
            }

            if (v.functionalType === 'indirect_labor' || v.functionalType === 'direct_labor') {
              moiTotal += v.amount;
            } else if (v.functionalType === 'cif') {
              cifOperativoTotal += v.amount;
            } else if (v.functionalType === 'fixed_gasto') {
              gastosAdminVentasTotal += v.amount;
            }
          }
        }

        // 2. Cálculo del total del Driver configurado por el usuario
        let totalBaseDriver = 0;
        products.forEach(prod => {
          const baseUnits = (prod.baseUnitsSold !== undefined ? prod.baseUnitsSold : prod.unitsSold) || 0;
          const baseHours = (prod.baseProductionHours !== undefined ? prod.baseProductionHours : prod.productionHours) || 0;
          totalBaseDriver += cifBase === 'unidades_vendidas' ? baseUnits : baseHours;
        });

        // 3. Resolución de productos con overrides de simulación
        const resolvedProducts = products.map(prod => {
          const override = simOverrides[prod.id] || {};
          return {
            ...prod,
            basePrice: prod.price,
            baseUnitsSold: prod.unitsSold,
            baseProductionHours: prod.productionHours,
            price: override.price !== undefined ? override.price : prod.price,
            unitsSold: override.unitsSold !== undefined ? override.unitsSold : prod.unitsSold,
            productionHours: override.productionHours !== undefined ? override.productionHours : prod.productionHours
          };
        });

        // 4. Detalle y asignación del 100% de la base consolidada vía Driver
        const productDetails = productDetailsList(
          resolvedProducts, 
          vouchers, 
          cifBase, 
          totalBaseDriver, 
          totalCifConsolidado, 
          variableCifConsolidado, 
          fixedCifConsolidado, 
          targetUtility
        );

        // 5. Agregados Globales y Rentabilidad
        const totalRevenue = productDetails.reduce((acc, p) => acc + p.revenue, 0);
        const totalVariableCosts = productDetails.reduce((acc, p) => acc + p.variableCostsTotal, 0);
        const totalContributionMargin = totalRevenue - totalVariableCosts;
        const averageIMC = totalRevenue > 0 ? (totalContributionMargin / totalRevenue) : 0;

        // Estructura completa de costos fijos consolidados (absorbidos al 100%)
        const totalFixedCosts = fixedCifConsolidado + directMaterialsFixed;
        const resultadoOperativo = totalContributionMargin - totalFixedCosts;

        // Punto de Equilibrio consolidado multi-producto
        const breakEvenPesos = averageIMC > 0 ? (totalFixedCosts / averageIMC) : 0;
        
        const totalUnitsSold = resolvedProducts.reduce((acc, p) => acc + p.unitsSold, 0);
        const weightedMC = totalUnitsSold > 0 ? (totalContributionMargin / totalUnitsSold) : 0;
        const breakEvenUnits = weightedMC > 0 ? (totalFixedCosts / weightedMC) : 0;

        // Indicadores ejecutivos orientados al cliente (KPI Dashboard & Financial Modeling)
        const coverageRatio = totalFixedCosts > 0 ? (totalContributionMargin / totalFixedCosts) * 100 : 0;
        const safetyMarginPesos = Math.max(0, totalRevenue - breakEvenPesos);
        const safetyMarginPercent = totalRevenue > 0 ? (safetyMarginPesos / totalRevenue) * 100 : 0;

        return {
          productDetails,
          totalRevenue,
          totalVariableCosts,
          totalContributionMargin,
          averageIMC,
          totalFixedCosts,
          resultadoOperativo,
          breakEvenPesos,
          breakEvenUnits,
          totalUnitsSold,
          totalCifConsolidado,
          variableCifConsolidado,
          fixedCifConsolidado,
          moiTotal,
          cifOperativoTotal,
          gastosAdminVentasTotal,
          totalDirectMaterials,
          totalBaseDriver,
          coverageRatio,
          safetyMarginPesos,
          safetyMarginPercent
        };
      },

      // Actions
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      editProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      })),
      deleteProduct: (productId) => set((state) => {
        const updatedOverrides = { ...state.simOverrides };
        delete updatedOverrides[productId];
        return {
          products: state.products.filter(p => p.id !== productId),
          simOverrides: updatedOverrides
        };
      }),

      addVoucher: (voucher) => set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      editVoucher: (updatedVoucher) => set((state) => ({
        vouchers: state.vouchers.map(v => v.id === updatedVoucher.id ? updatedVoucher : v)
      })),
      deleteVoucher: (voucherId) => set((state) => ({
        vouchers: state.vouchers.filter(v => v.id !== voucherId)
      })),

      setCifBase: (cifBase) => set({ cifBase }),
      setTargetUtility: (targetUtility) => set({ targetUtility }),
      
      updateSimOverride: (prodId, field, value) => set((state) => {
        const override = state.simOverrides[prodId] || {};
        const isSalesField = field === 'unitsSold';
        return {
          activeSalesScenario: isSalesField ? null : state.activeSalesScenario,
          activePriceScenario: !isSalesField ? null : state.activePriceScenario,
          simOverrides: {
            ...state.simOverrides,
            [prodId]: {
              ...override,
              [field]: Number(value)
            }
          }
        };
      }),

      resetProductOverride: (prodId) => set((state) => {
        const updated = { ...state.simOverrides };
        delete updated[prodId];
        const hasRemaining = Object.keys(updated).length > 0;
        return { 
          simOverrides: updated,
          activeSalesScenario: hasRemaining ? state.activeSalesScenario : null,
          activePriceScenario: hasRemaining ? state.activePriceScenario : null
        };
      }),

      // Escenarios de Ventas (Volumen)
      applySalesScenario: (scenarioType) => set((state) => {
        const isTogglingOff = state.activeSalesScenario === scenarioType;
        const newSalesScenario = isTogglingOff ? null : scenarioType;
        const newOverrides = { ...state.simOverrides };
        const { products } = state;

        products.forEach(prod => {
          const current = newOverrides[prod.id] ? { ...newOverrides[prod.id] } : {};
          if (isTogglingOff) {
            delete current.unitsSold;
          } else if (scenarioType === 'sales_plus_30') {
            current.unitsSold = Math.round(prod.unitsSold * 1.30);
          } else if (scenarioType === 'sales_plus_20') {
            current.unitsSold = Math.round(prod.unitsSold * 1.20);
          } else if (scenarioType === 'sales_plus_10') {
            current.unitsSold = Math.round(prod.unitsSold * 1.10);
          } else if (scenarioType === 'sales_minus_15') {
            current.unitsSold = Math.max(0, Math.round(prod.unitsSold * 0.85));
          } else if (scenarioType === 'sales_minus_25') {
            current.unitsSold = Math.max(0, Math.round(prod.unitsSold * 0.75));
          } else if (scenarioType === 'breakeven') {
            const metrics = state.getMetrics();
            const beUnits = metrics.breakEvenUnits;
            const totalUnits = metrics.totalUnitsSold;
            const mix = totalUnits > 0 ? (prod.unitsSold / totalUnits) : (1 / products.length);
            current.unitsSold = Math.round(beUnits * mix);
          }

          if (Object.keys(current).length > 0) {
            newOverrides[prod.id] = current;
          } else {
            delete newOverrides[prod.id];
          }
        });

        return { simOverrides: newOverrides, activeSalesScenario: newSalesScenario };
      }),

      // Escenarios de Precios (Tarifas)
      applyPriceScenario: (scenarioType) => set((state) => {
        const isTogglingOff = state.activePriceScenario === scenarioType;
        const newPriceScenario = isTogglingOff ? null : scenarioType;
        const newOverrides = { ...state.simOverrides };
        const { products } = state;

        products.forEach(prod => {
          const current = newOverrides[prod.id] ? { ...newOverrides[prod.id] } : {};
          if (isTogglingOff) {
            delete current.price;
          } else if (scenarioType === 'price_plus_25') {
            current.price = Math.round(prod.price * 1.25);
          } else if (scenarioType === 'price_plus_15') {
            current.price = Math.round(prod.price * 1.15);
          } else if (scenarioType === 'price_plus_10') {
            current.price = Math.round(prod.price * 1.10);
          } else if (scenarioType === 'price_minus_10') {
            current.price = Math.max(10, Math.round(prod.price * 0.90));
          } else if (scenarioType === 'price_minus_20') {
            current.price = Math.max(10, Math.round(prod.price * 0.80));
          }

          if (Object.keys(current).length > 0) {
            newOverrides[prod.id] = current;
          } else {
            delete newOverrides[prod.id];
          }
        });

        return { simOverrides: newOverrides, activePriceScenario: newPriceScenario };
      }),

      // Dispatcher flexible compatible con llamadas anteriores
      applyPresetScenario: (scenarioType) => {
        if (scenarioType === 'reset') {
          get().clearSimOverrides();
        } else if (['sales_plus_30', 'sales_plus_20', 'sales_plus_10', 'sales_minus_15', 'sales_minus_25', 'breakeven', 'units_plus_20', 'units_minus_20'].includes(scenarioType)) {
          get().applySalesScenario(scenarioType === 'units_plus_20' ? 'sales_plus_20' : scenarioType === 'units_minus_20' ? 'sales_minus_15' : scenarioType);
        } else {
          get().applyPriceScenario(scenarioType);
        }
      },

      clearSimOverrides: () => set({ simOverrides: {}, activeSalesScenario: null, activePriceScenario: null }),
      
      resetToDefaults: () => set({
        products: INITIAL_PRODUCTS,
        vouchers: INITIAL_VOUCHERS,
        simOverrides: {},
        cifBase: 'unidades_vendidas',
        targetUtility: 30,
      })
    }),
    {
      name: 'sistema-costo-presupuesto-storage-v3',
      partialize: (state) => ({
        products: state.products,
        vouchers: state.vouchers,
        theme: state.theme,
        cifBase: state.cifBase,
        targetUtility: state.targetUtility,
      }),
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...persistedState };
        if (!merged.products || merged.products.length === 0) {
          merged.products = INITIAL_PRODUCTS;
        }
        if (!merged.vouchers || merged.vouchers.length === 0) {
          merged.vouchers = INITIAL_VOUCHERS;
        } else {
          // Migración automática: direct_labor se convierte a indirect_labor y associatedProduct a 'all'
          merged.vouchers = merged.vouchers.map(v => {
            if (v.functionalType === 'direct_labor') {
              return { ...v, functionalType: 'indirect_labor', associatedProduct: 'all' };
            }
            return v;
          });
        }
        return merged;
      }
    }
  )
);

// Helper de Costeo: Costo Total = [MPD Directo] + [Cuota Asignada CIF/SIF Consolidada vía Driver 100%]
const productDetailsList = (
  resolvedProducts, 
  vouchers, 
  cifBase, 
  totalBaseDriver, 
  totalCifConsolidado, 
  variableCifConsolidado, 
  fixedCifConsolidado, 
  targetUtility
) => {
  // Pre-indexar insumos directos por producto en O(N) para acceso O(1) (js-index-maps)
  const matByProduct = new Map();
  for (const v of vouchers) {
    if (v.functionalType === 'direct_materials' && v.associatedProduct) {
      const current = matByProduct.get(v.associatedProduct) || { total: 0, variable: 0, fixed: 0 };
      current.total += v.amount;
      if (v.behavior === 'fixed') {
        current.fixed += v.amount;
      } else {
        current.variable += v.amount;
      }
      matByProduct.set(v.associatedProduct, current);
    }
  }

  return resolvedProducts.map(prod => {
    // 1. Materia Prima Directa (MPD)
    const mat = matByProduct.get(prod.id) || { total: 0, variable: 0, fixed: 0 };
    const directMaterials = mat.total;
    const baseUnits = Math.max(0, (prod.baseUnitsSold !== undefined ? prod.baseUnitsSold : prod.unitsSold) || 0);
    const baseHours = Math.max(0, (prod.baseProductionHours !== undefined ? prod.baseProductionHours : prod.productionHours) || 0);

    const directMaterialsUnitario = baseUnits > 0 ? (directMaterials / baseUnits) : 0;
    const directVariableUnitario = baseUnits > 0 ? (mat.variable / baseUnits) : 0;
    const directFixedUnitario = baseUnits > 0 ? (mat.fixed / baseUnits) : 0;

    // 2. Motor de Asignación vía Driver (100% de la masa de indirectos distribuida)
    const driverValue = cifBase === 'unidades_vendidas' ? baseUnits : baseHours;
    const cifPercentage = totalBaseDriver > 0 ? (driverValue / totalBaseDriver) : (resolvedProducts.length > 0 ? (1 / resolvedProducts.length) : 0);

    // Cuotas de CIF/SIF consolidado asignadas a este producto
    const allocatedCifTotal = totalCifConsolidado * cifPercentage;
    const allocatedVariableCif = variableCifConsolidado * cifPercentage;
    const allocatedFixedCif = fixedCifConsolidado * cifPercentage;

    const cifUnitario = baseUnits > 0 ? (allocatedCifTotal / baseUnits) : 0;
    const variableCifUnitario = baseUnits > 0 ? (allocatedVariableCif / baseUnits) : 0;
    const fixedCifUnitario = baseUnits > 0 ? (allocatedFixedCif / baseUnits) : 0;

    // 3. Determinación de Costos Unitarios
    // [Costo Directo / Materia Prima] + [Cuota Asignada de CIF/SIF]
    const costoTotalUnitario = directMaterialsUnitario + cifUnitario;
    const costoVariableUnitario = directVariableUnitario + variableCifUnitario;

    // 4. Rentabilidad y Simulación
    const simUnits = prod.unitsSold;
    const simPrice = prod.price;

    const margenContribucionUnitario = simPrice - costoVariableUnitario;
    const margenContribucionTotal = margenContribucionUnitario * simUnits;
    const imc = simPrice > 0 ? (margenContribucionUnitario / simPrice) : 0;

    const revenue = simPrice * simUnits;
    const variableCostsTotal = costoVariableUnitario * simUnits;

    // 5. Precio Sugerido Objetivo con Margen sobre Ventas (Target Margin)
    const safeUtility = Math.max(0, Math.min(95, targetUtility || 0));
    const suggestedPrice = safeUtility < 100 ? (costoTotalUnitario / (1 - (safeUtility / 100))) : costoTotalUnitario;

    const coversTotalCost = simPrice >= (costoTotalUnitario - 0.001);
    const coversVariableCost = simPrice >= (costoVariableUnitario - 0.001);

    // Margen y Utilidad Neta Real por Producto (tras absorber costos fijos y variables)
    const utilidadNetaUnitaria = simPrice - costoTotalUnitario;
    const margenNetoPorcentaje = simPrice > 0 ? (utilidadNetaUnitaria / simPrice) : 0;
    const utilidadNetaTotal = utilidadNetaUnitaria * simUnits;

    return {
      ...prod,
      directMaterials,
      directMaterialsUnitario,
      totalDirectCost: directMaterials,
      directCostUnitario: directMaterialsUnitario,
      directVariableUnitario,
      directFixedUnitario,
      allocatedCifTotal,
      allocatedVariableCif,
      allocatedFixedCif,
      cifPercentage,
      cifUnitario,
      variableCifUnitario,
      fixedCifUnitario,
      costoTotalUnitario,
      costoVariableUnitario,
      margenContribucionUnitario,
      margenContribucionTotal,
      imc,
      revenue,
      variableCostsTotal,
      suggestedPrice,
      coversTotalCost,
      coversVariableCost,
      utilidadNetaUnitaria,
      margenNetoPorcentaje,
      utilidadNetaTotal
    };
  });
};

export default useStore;
