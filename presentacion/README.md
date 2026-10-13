# 🎯 Guión y Presentación Oficial: Sistema de Costos y Presupuestos

Este directorio contiene la presentación completa, interactiva y descargable del **Sistema de Costos y Presupuestos**, diseñada tanto para defensa académica como para presentación ejecutiva o comercial.

---

## 📂 Archivos Disponibles

1. **[index.html](file:///c:/Users/Enekon/Desktop/Sistema%20de%20Costo%20y%20presupuesto/presentacion/index.html)**:
   - **Presentación Web Interactiva de Alta Fidelidad**:
     - Visualización a pantalla completa (tecla `F` o botón en barra superior).
     - **Pines circulares numerados (`①`, `②`, `③`...)** situados exactamente sobre cada elemento de la pantalla con animación radar de pulso.
     - **Interactividad bidireccional**: Al hacer clic o pasar el mouse sobre un pin en la captura, se ilumina y se enfoca la tarjeta explicativa correspondiente a la derecha. Al hacer hover sobre una tarjeta, se resalta el pin en la captura.
     - Botón para **Imprimir o Guardar directamente en PDF** con estilos optimizados de salto de página.
     - Botón de descarga directa del archivo PowerPoint.
     - Atajos de teclado: Flechas `←` / `→` o barra espaciadora para avanzar.

2. **[Sistema_de_Costos_Presentacion.pptx](file:///c:/Users/Enekon/Desktop/Sistema%20de%20Costo%20y%20presupuesto/presentacion/Sistema_de_Costos_Presentacion.pptx)**:
   - Diapositivas en formato **Microsoft PowerPoint (16:9 Panorámica)**.
   - Totalmente editable, con diseño oscuro profesional (Slate & Cyan), capturas de pantalla de alta resolución y tarjetas de llamada numeradas.

3. **[img/](file:///c:/Users/Enekon/Desktop/Sistema%20de%20Costo%20y%20presupuesto/presentacion/img/)**:
   - Capturas reales de cada pantalla del sistema:
     - `01_dashboard.png`: Tablero de Control general.
     - `02_catalogo_productos.png`: Catálogo y tabla maestra.
     - `03_modal_producto.png`: Formulario emergente de productos.
     - `04_comprobantes_gastos.png`: Matriz de egresos y clasificación.
     - `05_modal_comprobante.png`: Modal contable de carga de comprobantes.
     - `06_analisis_costos.png`: Motor de absorción, margen objetivo y breakeven.

---

## 🎙️ Guión de Exposición Paso a Paso

A continuación se detalla qué decir y cómo explicar cada diapositiva y número señalado:

---

### Diapositiva 1: Portada y Visión General de la Arquitectura
- **Mensaje Clave**: *"El objetivo del sistema no es solo registrar gastos, sino transformar los números en decisiones de rentabilidad estratégica para salones y pymes mediante el modelo de costeo por absorción y análisis de sensibilidad."*
- **Stack Tecnológico**: React 19, Vite, Zustand con almacenamiento local y motor financiero multiproducto.

---

### Diapositiva 2: Tablero de Control — KPIs y Cobertura de Costos Fijos
- **[1] Navegación Global y Tema**: Barra superior accesible que mantiene el contexto de la aplicación y permite alternar entre modo oscuro y claro.
- **[2] Selector del Driver CIF/SIF**: Interruptor clave que permite al gerente elegir la base de prorrateo: **Unidades Vendidas** o **Horas de Producción**. Si un servicio demanda mucho tiempo en sillón, el selector por horas le asignará mayor carga indirecta.
- **[3] Tarjetas KPI Financieras**:
  - *Ingresos Totales*: Facturación proyectada.
  - *Costo Variable*: Suma de insumos directos y porción variable de indirectos.
  - *Margen de Contribución Total*: Fondos generados para sostener la estructura fija.
  - *Resultado Operativo*: Utilidad neta real tras absorber el 100% de la carga fija. Se pinta de verde en superávit o rojo en déficit.
- **[4] Banner de Masa Consolidada CIF/SIF**: Transparencia contable total: desglosa Mano de Obra Indirecta (MOI), CIF Operativo (luz, alquiler, lavandería) y Gastos de Administración y Comercialización. **Cero costos huérfanos o flotantes**.
- **[5] Barra de Cobertura de Punto de Equilibrio**: Mide el avance de cobertura (`Margen / Costos Fijos`). Informa el umbral mínimo en pesos para no perder dinero y calcula el **Margen de Seguridad** disponible.

---

### Diapositiva 3: Tablero de Control — Simulación What-If y Gráficos
- **[6] Alerta de Superávit / Déficit**: Diagnóstico ejecutivo que resume la viabilidad del escenario actual o alerta la cuantía necesaria para equilibrar las cuentas.
- **[7] Presets Rápidos de Escenarios**: Botonera de pruebas de estrés para simular en un clic crisis comerciales (-20% ventas), expansión (+20% ventas), aumentos de precios (+15%) o rebajas promocionales (-10%).
- **[8] Gráfico de Rentabilidad SVG**: Comparativa visual en barras de Ingresos vs. Costos Variables vs. Margen por producto.
- **[9] Sliders Individuales**: Controles para alterar la demanda o el precio de un servicio específico y ver en vivo el impacto en el resultado operativo.

---

### Diapositiva 4: Catálogo de Productos y Servicios
- **[1] Encabezado y Contador**: Resumen cuantitativo de la cartera de servicios activa.
- **[2] Botón '+ Nuevo Producto'**: Acceso al formulario emergente de alta de servicios.
- **[3] Tabla Maestra**: Consolida las variables de mercado: demanda mensual estimada, horas de producción consumidas y precio de salones competidores (benchmark).
- **[4] Acciones de Fila**: Edición modal y eliminación con confirmación para evitar pérdidas accidentales.

---

### Diapositiva 5: Modal de Alta y Edición de Producto
- **[1] Cabecera Contextual**: Adapta el título según sea alta o edición.
- **[2] Nombre**: Denominación comercial del servicio capilar.
- **[3] Parámetros Operativos**: Unidades vendidas mensuales y horas de producción (drivers de asignación).
- **[4] Precios**: Precio de la competencia (referencia) y precio al público.
- **[5] Botones de Confirmación**: Generación de ID temporal o guardado con persistencia reactiva.

---

### Diapositiva 6: Comprobantes y Gastos (Matriz de Costos)
- **[1] Resumen de Erogaciones**: Totales consolidados de Insumos Directos (MPD), Masa Indirecta (CIF) y Presupuesto Total.
- **[2] Botón '+ Cargar Comprobante'**: Despliega el formulario de carga contable.
- **[3] Clasificación Funcional (Badges)**: Categorización en los 4 pilares: MPD (Directos), MOI (Honorarios/Mano de obra indirecta), CIF (Operativos de salón) y Gastos Fijos (Admin/Ventas).
- **[4] Comportamiento Económico**: Separa erogaciones **Variables** (escalan con la cantidad de clientes) de erogaciones **Fijas** (constantes en el período).
- **[5] Asignación de Producto**: Imputación unívoca al servicio que consumió el material o derivación a la masa general.

---

### Diapositiva 7: Modal de Carga de Comprobante / Gasto
- **[1] Encabezado del Formulario**: Identificación del registro.
- **[2] Concepto**: Detalle descriptivo de la erogación.
- **[3] Importe y Comportamiento**: Monto en pesos y naturaleza Fijo / Variable.
- **[4] Tipo Funcional**: Selector de rubro contable.
- **[5] Asociación Condicional de Producto**: Si se selecciona *Materiales Directos (MPD)*, el sistema exige indicar a qué producto corresponde, garantizando costeo directo exacto.
- **[6] Confirmación**: Registro en el estado global.

---

### Diapositiva 8: Análisis de Costo y Margen (Motor de Absorción)
- **[1] Selector de Driver**: Conmutador inmediato de unidades vs. horas.
- **[2] Control de Utilidad Objetivo (Target Margin)**: Slider interactivo (5% al 90%) que calcula el precio sugerido: `Precio = Costo Total / (1 - Margen%)`. Al basarse en el Costo Total (que absorbe toda la masa indirecta), garantiza rentabilidad neta real.
- **[3] Desglose Unitario**: Materia Prima Directa (MPD) + Cuota CIF asignada = Costo Total Unitario.
- **[4] Márgenes Comerciales**: Margen de Contribución Unitario ($) y ratio IMC (%).
- **[5] Semáforo de Cobertura**: Diagnóstico en 3 colores: Cubre Costo Total (verde), Cubre Costo Variable (amarillo) o En Pérdida (rojo).
- **[6] Precio Sugerido y Breakeven Unitario**: Tarifa meta y unidades físicas mínimas de venta.
- **[7] Totales Consolidados**: Sumatoria y promedios ponderados de toda la empresa.

---

### Diapositiva 9: Metodología Financiera y Fórmulas
- Resumen matemático de las 6 fórmulas clave: Absorción CIF, Costos Unitarios, Margen e IMC, Punto de Equilibrio Multiproducto, Target Pricing y Resultado Operativo.
