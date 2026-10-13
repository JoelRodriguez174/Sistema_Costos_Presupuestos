import React, { useMemo } from 'react';
import DashboardSection from '../components/sections/DashboardSection';
import useStore from '../store/useStore';

function DashboardPage() {
  const products = useStore((state) => state.products);
  const vouchers = useStore((state) => state.vouchers);
  const targetUtility = useStore((state) => state.targetUtility);
  const getMetrics = useStore((state) => state.getMetrics);
  const cifBase = useStore((state) => state.cifBase);
  const setCifBase = useStore((state) => state.setCifBase);
  const simOverrides = useStore((state) => state.simOverrides);
  const activeSalesScenario = useStore((state) => state.activeSalesScenario);
  const activePriceScenario = useStore((state) => state.activePriceScenario);
  const updateSimOverride = useStore((state) => state.updateSimOverride);
  const clearSimOverrides = useStore((state) => state.clearSimOverrides);
  const resetProductOverride = useStore((state) => state.resetProductOverride);
  const applySalesScenario = useStore((state) => state.applySalesScenario);
  const applyPriceScenario = useStore((state) => state.applyPriceScenario);
  const applyPresetScenario = useStore((state) => state.applyPresetScenario);

  // Memoize the expensive metrics calculation so it only runs when its inputs change
  const metrics = useMemo(() => getMetrics(), [products, vouchers, cifBase, targetUtility, simOverrides, getMetrics]);

  return (
    <DashboardSection 
      metrics={metrics}
      cifBase={cifBase}
      onCifBaseToggle={() => setCifBase(cifBase === 'unidades_vendidas' ? 'horas_produccion' : 'unidades_vendidas')}
      simOverrides={simOverrides}
      activeSalesScenario={activeSalesScenario}
      activePriceScenario={activePriceScenario}
      onOverrideChange={updateSimOverride}
      onClearOverrides={clearSimOverrides}
      onResetProduct={resetProductOverride}
      onApplySalesScenario={applySalesScenario}
      onApplyPriceScenario={applyPriceScenario}
      onApplyScenario={applyPresetScenario}
    />
  );
}

export default DashboardPage;
