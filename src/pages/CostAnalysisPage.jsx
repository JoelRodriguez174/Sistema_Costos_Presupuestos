import React, { useMemo } from 'react';
import CostAnalysisSection from '../components/sections/CostAnalysisSection';
import useStore from '../store/useStore';

function CostAnalysisPage() {
  const products = useStore((state) => state.products);
  const vouchers = useStore((state) => state.vouchers);
  const simOverrides = useStore((state) => state.simOverrides);
  const getMetrics = useStore((state) => state.getMetrics);
  const targetUtility = useStore((state) => state.targetUtility);
  const setTargetUtility = useStore((state) => state.setTargetUtility);
  const cifBase = useStore((state) => state.cifBase);
  const setCifBase = useStore((state) => state.setCifBase);

  // Memoize the expensive metrics calculation so it only runs when its inputs change
  const metrics = useMemo(() => getMetrics(), [products, vouchers, cifBase, targetUtility, simOverrides, getMetrics]);

  return (
    <CostAnalysisSection 
      productDetails={metrics.productDetails}
      totalUnitsSold={metrics.totalUnitsSold}
      totalRevenue={metrics.totalRevenue}
      totalVariableCosts={metrics.totalVariableCosts}
      totalContributionMargin={metrics.totalContributionMargin}
      averageIMC={metrics.averageIMC}
      breakEvenUnits={metrics.breakEvenUnits}
      breakEvenPesos={metrics.breakEvenPesos}
      targetUtility={targetUtility}
      onTargetUtilityChange={setTargetUtility}
      cifBase={cifBase}
      onCifBaseToggle={() => setCifBase(cifBase === 'unidades_vendidas' ? 'horas_produccion' : 'unidades_vendidas')}
    />
  );
}

export default CostAnalysisPage;
