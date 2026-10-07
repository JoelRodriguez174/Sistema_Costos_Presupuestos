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

  // Mano de Obra Directa (MOD)
  {
    id: 'v-5',
    concept: 'Honorarios / Comisiones Estilistas por Corte y Peinado',
    amount: 2100000,
    functionalType: 'direct_labor',
    behavior: 'variable',
    associatedProduct: 'prod-1'
  },
  {
    id: 'v-6',
    concept: 'Honorarios Coloristas Especializados',
    amount: 2268000,
    functionalType: 'direct_labor',
    behavior: 'variable',
    associatedProduct: 'prod-2'
  },
  {
    id: 'v-7',
    concept: 'Honorarios Técnicos de Tratamientos Capilares',
    amount: 960000,
    functionalType: 'direct_labor',
    behavior: 'variable',
    associatedProduct: 'prod-3'
  },
  {
    id: 'v-8',
    concept: 'Sueldo Ayudantes y Lavacabezas Salón',
    amount: 1350000,
    functionalType: 'direct_labor',
    behavior: 'variable',
    associatedProduct: 'prod-4'
  },

  // Costos Indirectos de Fabricación / Salón (CIF)
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

  // Gastos Administrativos / Comercialización
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

      // Core Financial Calculation Selector
      getMetrics: () => {
        const { products, vouchers, cifBase, targetUtility, simOverrides } = get();

        // Resolve products with overrides
        const resolvedProducts = products.map(prod => {
          const override = simOverrides[prod.id] || {};
          return {
            ...prod,
            price: override.price !== undefined ? override.price : prod.price,
            unitsSold: override.unitsSold !== undefined ? override.unitsSold : prod.unitsSold,
            productionHours: override.productionHours !== undefined ? override.productionHours : prod.productionHours
          };
        });

        const resolvedVouchers = vouchers;

        // 1. Calculate CIF totals
        const cifVouchers = resolvedVouchers.filter(v => v.functionalType === 'cif');
        const totalCIF = cifVouchers.reduce((acc, curr) => acc + curr.amount, 0);
        const variableCIF = cifVouchers.filter(v => v.behavior === 'variable').reduce((acc, v) => acc + v.amount, 0);
        const fixedCIF = cifVouchers.filter(v => v.behavior === 'fixed').reduce((acc, v) => acc + v.amount, 0);

        // Calculate CIF distribution base total
        let totalBaseValue = 0;
        resolvedProducts.forEach(prod => {
          totalBaseValue += cifBase === 'unidades_vendidas' ? prod.unitsSold : prod.productionHours;
        });

        // 2. Compute details per product
        const productDetails = productDetailsList(resolvedProducts, resolvedVouchers, cifBase, totalBaseValue, totalCIF, variableCIF, targetUtility);

        // 3. Global aggregates
        const totalRevenue = productDetails.reduce((acc, p) => acc + p.revenue, 0);
        const totalVariableCosts = productDetails.reduce((acc, p) => acc + p.variableCostsTotal, 0);
        const totalContributionMargin = totalRevenue - totalVariableCosts;
        const averageIMC = totalRevenue > 0 ? (totalContributionMargin / totalRevenue) : 0;

        // Fixed non-production expenses
        const totalFixedGasto = resolvedVouchers.filter(v => v.functionalType === 'fixed_gasto').reduce((acc, curr) => acc + curr.amount, 0);

        // Direct Fixed Costs (from products: MPD or MOD marked as fixed)
        const directFixedTotal = resolvedProducts.reduce((acc, prod) => {
          const productDirectVouchers = resolvedVouchers.filter(v => 
            v.associatedProduct === prod.id && 
            (v.functionalType === 'direct_materials' || v.functionalType === 'direct_labor')
          );
          return acc + productDirectVouchers.filter(v => v.behavior === 'fixed').reduce((vAcc, v) => vAcc + v.amount, 0);
        }, 0);

        const totalFixedCosts = directFixedTotal + fixedCIF + totalFixedGasto;
        const resultadoOperativo = totalContributionMargin - totalFixedCosts;

        // Multi-product Break-Even Point
        const breakEvenPesos = averageIMC > 0 ? (totalFixedCosts / averageIMC) : 0;
        
        const totalUnitsSold = resolvedProducts.reduce((acc, p) => acc + p.unitsSold, 0);
        const weightedMC = totalUnitsSold > 0 ? (totalContributionMargin / totalUnitsSold) : 0;
        const breakEvenUnits = weightedMC > 0 ? (totalFixedCosts / weightedMC) : 0;

        return {
          productDetails,
          totalRevenue,
          totalVariableCosts,
          totalContributionMargin,
          averageIMC,
          totalFixedGasto,
          totalFixedCosts,
          resultadoOperativo,
          breakEvenPesos,
          breakEvenUnits,
          totalUnitsSold,
          totalCIF,
          variableCIF,
          fixedCIF,
          directFixedTotal
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
        return {
          simOverrides: {
            ...state.simOverrides,
            [prodId]: {
              ...override,
              [field]: Number(value)
            }
          }
        };
      }),
      clearSimOverrides: () => set({ simOverrides: {} }),
      
      resetToDefaults: () => set({
        products: INITIAL_PRODUCTS,
        vouchers: INITIAL_VOUCHERS,
        simOverrides: {},
        cifBase: 'unidades_vendidas',
        targetUtility: 30,
      })
    }),
    {
      name: 'sistema-costo-presupuesto-storage-v2',
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
        }
        return merged;
      }
    }
  )
);

// Helper function for mapping details (always uses margin-based suggested price)
const productDetailsList = (resolvedProducts, resolvedVouchers, cifBase, totalBaseValue, totalCIF, variableCIF, targetUtility) => {
  return resolvedProducts.map(prod => {
    const productDirectVouchers = resolvedVouchers.filter(v => 
      v.associatedProduct === prod.id && 
      (v.functionalType === 'direct_materials' || v.functionalType === 'direct_labor')
    );
    
    const matVouchers = productDirectVouchers.filter(v => v.functionalType === 'direct_materials');
    const directMaterials = matVouchers.reduce((acc, curr) => acc + curr.amount, 0);
    
    const modVouchers = productDirectVouchers.filter(v => v.functionalType === 'direct_labor');
    const directLabor = modVouchers.reduce((acc, curr) => acc + curr.amount, 0);
    
    const totalDirectCost = directMaterials + directLabor;
    const directCostUnitario = prod.unitsSold > 0 ? (totalDirectCost / prod.unitsSold) : 0;
    const materialsUnitario = prod.unitsSold > 0 ? (directMaterials / prod.unitsSold) : 0;
    const laborUnitario = prod.unitsSold > 0 ? (directLabor / prod.unitsSold) : 0;

    const directVariable = productDirectVouchers.filter(v => v.behavior === 'variable').reduce((acc, v) => acc + v.amount, 0);
    const directVariableUnitario = prod.unitsSold > 0 ? (directVariable / prod.unitsSold) : 0;

    const baseValue = cifBase === 'unidades_vendidas' ? prod.unitsSold : prod.productionHours;
    const cifPercentage = totalBaseValue > 0 ? (baseValue / totalBaseValue) : 0;
    
    const allocatedCIF = totalCIF * cifPercentage;
    const allocatedVariableCIF = variableCIF * cifPercentage;

    const cifUnitario = prod.unitsSold > 0 ? (allocatedCIF / prod.unitsSold) : 0;
    const variableCifUnitario = prod.unitsSold > 0 ? (allocatedVariableCIF / prod.unitsSold) : 0;

    const costoTotalUnitario = directCostUnitario + cifUnitario;
    const costoVariableUnitario = directVariableUnitario + variableCifUnitario;

    const margenContribucionUnitario = prod.price - costoVariableUnitario;
    const margenContribucionTotal = margenContribucionUnitario * prod.unitsSold;
    const imc = prod.price > 0 ? (margenContribucionUnitario / prod.price) : 0;

    const revenue = prod.price * prod.unitsSold;
    const variableCostsTotal = costoVariableUnitario * prod.unitsSold;

    // Pricing calculation based exclusively on Margin: Cost / (1 - Margin%)
    const suggestedPrice = targetUtility < 100 ? (costoTotalUnitario / (1 - (targetUtility / 100))) : costoTotalUnitario;

    const coversTotalCost = prod.price >= costoTotalUnitario;
    const coversVariableCost = prod.price >= costoVariableUnitario;

    return {
      ...prod,
      directMaterials,
      directLabor,
      totalDirectCost,
      directCostUnitario,
      materialsUnitario,
      laborUnitario,
      allocatedCIF,
      cifUnitario,
      cifPercentage,
      costoTotalUnitario,
      costoVariableUnitario,
      margenContribucionUnitario,
      margenContribucionTotal,
      imc,
      revenue,
      variableCostsTotal,
      suggestedPrice,
      coversTotalCost,
      coversVariableCost
    };
  });
};

export default useStore;
