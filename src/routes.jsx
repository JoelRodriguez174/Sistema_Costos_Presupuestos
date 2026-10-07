import React from 'react';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import VouchersPage from './pages/VouchersPage';
import CostAnalysisPage from './pages/CostAnalysisPage';

export const routes = [
  {
    path: '/',
    element: <DashboardPage />,
    label: 'Tablero de Control'
  },
  {
    path: '/productos',
    element: <ProductsPage />,
    label: 'Catálogo de Productos'
  },
  {
    path: '/comprobantes',
    element: <VouchersPage />,
    label: 'Comprobantes y Gastos'
  },
  {
    path: '/costos',
    element: <CostAnalysisPage />,
    label: 'Análisis de Costo y Margen'
  }
];
