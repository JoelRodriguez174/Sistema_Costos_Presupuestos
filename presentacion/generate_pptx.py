"""
Genera la presentación .pptx del Sistema de Costos y Presupuestos.
Diseño limpio profesional, sin degradados, sin neón.
Señalizaciones calibradas pixel a pixel sobre las capturas reales.
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ─── Paleta profesional (sin degradados, sin neón) ───
WHITE      = RGBColor(255, 255, 255)
OFF_WHITE  = RGBColor(248, 250, 252)  # fondo diapositiva
SLATE_50   = RGBColor(248, 250, 252)
SLATE_100  = RGBColor(241, 245, 249)
SLATE_200  = RGBColor(226, 232, 240)
SLATE_300  = RGBColor(203, 213, 225)
SLATE_400  = RGBColor(148, 163, 184)
SLATE_500  = RGBColor(100, 116, 139)
SLATE_600  = RGBColor(71, 85, 105)
SLATE_700  = RGBColor(51, 65, 85)
SLATE_800  = RGBColor(30, 41, 59)
SLATE_900  = RGBColor(15, 23, 42)
BLUE_600   = RGBColor(37, 99, 235)   # azul sobrio para badges
BLUE_700   = RGBColor(29, 78, 216)
BLUE_50    = RGBColor(239, 246, 255)
GREEN_600  = RGBColor(22, 163, 74)
RED_600    = RGBColor(220, 38, 38)
AMBER_600  = RGBColor(217, 119, 6)

FONT       = "Segoe UI"
FONT_MONO  = "Consolas"
IMG_DIR    = os.path.join("presentacion", "img")

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

def inch(v):
    return Inches(v)

def create_prs():
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs

TOTAL_SLIDES = 9

# ─────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────
def bg_rect(slide, prs_w, prs_h, color=OFF_WHITE):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs_w, prs_h)
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh

def add_blue_bar(slide, prs_w):
    """Barra fina azul superior (6px)."""
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs_w, inch(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = BLUE_600
    bar.line.fill.background()

def add_footer(slide, slide_num, total):
    """Pie de diapositiva con número."""
    ft = slide.shapes.add_textbox(inch(0.6), inch(7.0), inch(12), inch(0.35))
    tf = ft.text_frame
    p = tf.paragraphs[0]
    p.text = f"Sistema de Costos y Presupuestos  ·  Diapositiva {slide_num} de {total}"
    p.font.name = FONT
    p.font.size = Pt(8)
    p.font.color.rgb = SLATE_400

    # Línea divisora
    ln = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, inch(0.6), inch(6.95), inch(12.1), Pt(1))
    ln.fill.solid()
    ln.fill.fore_color.rgb = SLATE_200
    ln.line.fill.background()

def add_header(slide, title, subtitle, slide_num, total):
    add_blue_bar(slide, SLIDE_W)

    tb = slide.shapes.add_textbox(inch(0.7), inch(0.2), inch(10), inch(0.75))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = SLATE_900

    p2 = tf.add_paragraph()
    p2.text = subtitle
    p2.font.name = FONT
    p2.font.size = Pt(10)
    p2.font.color.rgb = SLATE_500

    # Badge de diapositiva
    nb = slide.shapes.add_textbox(inch(11.3), inch(0.25), inch(1.5), inch(0.3))
    ntf = nb.text_frame
    np = ntf.paragraphs[0]
    np.text = f"{slide_num} / {total}"
    np.font.name = FONT
    np.font.size = Pt(10)
    np.font.bold = True
    np.font.color.rgb = SLATE_400
    np.alignment = PP_ALIGN.RIGHT

    add_footer(slide, slide_num, total)

def add_badge_on_image(slide, img_left, img_top, img_w, img_h, pct_x, pct_y, num, size=0.3):
    """Coloca un badge circular numerado en posición relativa (%) sobre la imagen."""
    abs_x = img_left + img_w * pct_x - inch(size/2)
    abs_y = img_top + img_h * pct_y - inch(size/2)

    circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, abs_x, abs_y, inch(size), inch(size))
    circle.fill.solid()
    circle.fill.fore_color.rgb = BLUE_600
    circle.line.color.rgb = WHITE
    circle.line.width = Pt(2)

    # Número
    tf = circle.text_frame
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = str(num)
    p.font.name = FONT
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER

def add_explanation_card(slide, left, top, width, height, num, title, what, does, how):
    """Tarjeta explicativa con número, título y 3 líneas."""
    # Fondo de tarjeta
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = WHITE
    card.line.color.rgb = SLATE_200
    card.line.width = Pt(0.75)

    # Badge pequeño
    bsize = inch(0.22)
    badge = slide.shapes.add_shape(MSO_SHAPE.OVAL, left + inch(0.1), top + inch(0.08), bsize, bsize)
    badge.fill.solid()
    badge.fill.fore_color.rgb = BLUE_600
    badge.line.fill.background()
    btf = badge.text_frame
    btf.margin_left = btf.margin_right = btf.margin_top = btf.margin_bottom = 0
    bp = btf.paragraphs[0]
    bp.text = str(num)
    bp.font.name = FONT
    bp.font.size = Pt(8)
    bp.font.bold = True
    bp.font.color.rgb = WHITE
    bp.alignment = PP_ALIGN.CENTER

    # Texto
    tb = slide.shapes.add_textbox(left + inch(0.38), top + inch(0.04), width - inch(0.5), height - inch(0.08))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

    # Título
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = SLATE_800
    p.space_after = Pt(2)

    # Qué es
    p2 = tf.add_paragraph()
    p2.text = f"Qué es: {what}"
    p2.font.name = FONT
    p2.font.size = Pt(7.5)
    p2.font.color.rgb = SLATE_600
    p2.space_after = Pt(1)

    # Qué hace
    p3 = tf.add_paragraph()
    p3.text = f"Función: {does}"
    p3.font.name = FONT
    p3.font.size = Pt(7.5)
    p3.font.color.rgb = SLATE_600
    p3.space_after = Pt(1)

    # Cómo lo hace
    p4 = tf.add_paragraph()
    p4.text = f"Lógica: {how}"
    p4.font.name = FONT
    p4.font.size = Pt(7)
    p4.font.color.rgb = SLATE_400

# ─────────────────────────────────────────────────────
# Slide Factory para pantallas con captura + callouts
# ─────────────────────────────────────────────────────
def create_screen_slide(prs, title, subtitle, img_file, pins, callouts, sn):
    """
    pins: list of (pct_x, pct_y, num)  — posición relativa % sobre la imagen
    callouts: list of dicts {num, title, what, does, how}
    """
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg_rect(slide, SLIDE_W, SLIDE_H)
    add_header(slide, title, subtitle, sn, TOTAL_SLIDES)

    # ── Imagen ──
    img_path = os.path.join(IMG_DIR, img_file)
    img_left = inch(0.6)
    img_top  = inch(1.15)
    img_w    = inch(6.5)
    img_h    = inch(5.5)

    # Borde/marco de la imagen
    frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
        img_left - inch(0.03), img_top - inch(0.03),
        img_w + inch(0.06), img_h + inch(0.06))
    frame.fill.solid()
    frame.fill.fore_color.rgb = WHITE
    frame.line.color.rgb = SLATE_200
    frame.line.width = Pt(1)

    # Sombra suave
    shadow = frame.shadow
    shadow.inherit = False

    if os.path.exists(img_path):
        pic = slide.shapes.add_picture(img_path, img_left, img_top, width=img_w)

    # ── Pins sobre la imagen ──
    for (px, py, num) in pins:
        add_badge_on_image(slide, img_left, img_top, img_w, img_h, px, py, num)

    # ── Tarjetas explicativas a la derecha ──
    cards_left = inch(7.35)
    cards_w    = inch(5.55)
    cards_top  = inch(1.15)
    n = len(callouts)
    gap = 0.08
    avail = 5.5  # altura disponible
    card_h_val = (avail - gap * (n - 1)) / n

    for i, c in enumerate(callouts):
        ct = cards_top + inch(i * (card_h_val + gap))
        add_explanation_card(slide, cards_left, ct,
            cards_w, inch(card_h_val),
            c['num'], c['title'], c['what'], c['does'], c['how'])

# ─────────────────────────────────────────────────────
# Construir presentación
# ─────────────────────────────────────────────────────
def main():
    prs = create_prs()

    # ═══════════════════════════════════════════════════
    # SLIDE 1: PORTADA
    # ═══════════════════════════════════════════════════
    s1 = prs.slides.add_slide(prs.slide_layouts[6])
    bg_rect(s1, SLIDE_W, SLIDE_H, WHITE)
    add_blue_bar(s1, SLIDE_W)

    # Línea decorativa lateral
    side = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, inch(0.06), SLIDE_H)
    side.fill.solid()
    side.fill.fore_color.rgb = BLUE_600
    side.line.fill.background()

    tb = s1.shapes.add_textbox(inch(1.2), inch(1.5), inch(10.5), inch(4.5))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Sistema de Costos\ny Presupuestos"
    p.font.name = FONT
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = SLATE_900
    p.space_after = Pt(12)

    p2 = tf.add_paragraph()
    p2.text = "Presentación funcional y técnica, pantalla por pantalla"
    p2.font.name = FONT
    p2.font.size = Pt(16)
    p2.font.color.rgb = SLATE_500
    p2.space_after = Pt(24)

    desc_lines = [
        "Guía explicativa de cada sección del sistema: qué es cada componente,",
        "qué función cumple y cómo opera la lógica financiera interna.",
        "",
        "Modelo de Costeo por Absorción con Masa Consolidada CIF/SIF,",
        "Punto de Equilibrio multiproducto y Simulación de Escenarios What-If.",
        "",
        "Stack: React 19  •  Vite  •  Zustand  •  Motor Financiero Multiproducto"
    ]
    for line in desc_lines:
        p3 = tf.add_paragraph()
        p3.text = line
        p3.font.name = FONT
        p3.font.size = Pt(11)
        p3.font.color.rgb = SLATE_600 if line else SLATE_400
        p3.space_after = Pt(2)

    add_footer(s1, 1, TOTAL_SLIDES)

    # ═══════════════════════════════════════════════════
    # SLIDE 2: TABLERO DE CONTROL – KPIs y Cobertura
    # ═══════════════════════════════════════════════════
    # Posiciones calibradas sobre la captura real del dashboard:
    # Navegación: barra superior ~3% alto, ~35% ancho
    # Toggle Driver CIF: esquina sup. derecha ~7%, ~85%
    # KPIs: fila de 4 tarjetas ~24%, centro
    # Masa Consolidada: panel ~35%, centro
    # Breakeven: barra ~41%, centro
    create_screen_slide(prs,
        "Tablero de Control — KPIs Ejecutivos y Cobertura",
        "Pantalla principal: monitoreo financiero, absorción de costos fijos y punto de equilibrio.",
        "01_dashboard.png",
        pins=[
            (0.08, 0.03, 1),   # Logo/Nav
            (0.85, 0.12, 2),   # Toggle Driver CIF/SIF
            (0.40, 0.22, 3),   # KPI Cards
            (0.40, 0.34, 4),   # Masa Consolidada CIF/SIF
            (0.40, 0.41, 5),   # Breakeven bar
        ],
        callouts=[
            {
                "num": 1,
                "title": "Barra de Navegación y Tema",
                "what": "Barra superior con logotipo, 4 enlaces a los módulos y conmutador de tema oscuro/claro.",
                "does": "Permite acceder a cualquier módulo desde cualquier pantalla y adaptar la estética visual.",
                "how": "React Router DOM v7 gestiona las rutas. Zustand persiste el tema elegido en localStorage."
            },
            {
                "num": 2,
                "title": "Selector de Driver de Asignación CIF/SIF",
                "what": "Interruptor que alterna la base de distribución de costos indirectos.",
                "does": "Cambia el criterio de prorrateo entre 'Unidades Vendidas' y 'Horas de Producción'.",
                "how": "Al cambiar cifBase en Zustand, se recalcula factor = driverProducto / totalDriver para cada producto."
            },
            {
                "num": 3,
                "title": "Tarjetas KPI Financieras (4 indicadores)",
                "what": "Ingresos Totales, Costo Variable, Margen de Contribución y Resultado Operativo.",
                "does": "Resume la salud comercial del período: si el resultado es positivo hay ganancia, si es negativo hay pérdida.",
                "how": "getMetrics() calcula: Resultado Operativo = Margen de Contribución Total − Costos Fijos Totales."
            },
            {
                "num": 4,
                "title": "Masa Consolidada de Indirectos CIF/SIF",
                "what": "Panel que muestra el total de costos indirectos agrupados (MOI + CIF Operativo + Gastos Admin).",
                "does": "Garantiza transparencia: todos los gastos generales quedan visibles y el 100% se distribuye.",
                "how": "Suma en una pasada todos los comprobantes que no son MPD, separando por rubro funcional."
            },
            {
                "num": 5,
                "title": "Barra de Cobertura del Punto de Equilibrio",
                "what": "Indicador de progreso con las ventas mínimas necesarias y el margen de seguridad.",
                "does": "Muestra cuánto del umbral se ha cubierto y el colchón disponible antes de entrar en pérdida.",
                "how": "Punto Equilibrio ($) = Costos Fijos / IMC Promedio. Barra verde si supera el 100%, roja si no."
            }
        ],
        sn=2
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 3: TABLERO DE CONTROL – Simulación
    # ═══════════════════════════════════════════════════
    create_screen_slide(prs,
        "Tablero de Control — Simulación de Escenarios",
        "Motor de sensibilidad What-If, presets de estrés comercial y gráficos dinámicos de rentabilidad.",
        "01_dashboard.png",
        pins=[
            (0.40, 0.51, 1),   # Alerta superávit/déficit
            (0.75, 0.58, 2),   # Botones preset escenarios
            (0.30, 0.80, 3),   # Gráfico SVG barras
            (0.80, 0.75, 4),   # Sliders simulación
        ],
        callouts=[
            {
                "num": 1,
                "title": "Alerta de Superávit / Déficit Operativo",
                "what": "Banner que diagnostica si el escenario actual genera ganancia o pérdida.",
                "does": "Si hay superávit, muestra el monto ganado en verde. Si hay déficit, alerta en rojo el faltante.",
                "how": "Evalúa resultadoOperativo >= 0 y renderiza la alerta correspondiente con montos exactos."
            },
            {
                "num": 2,
                "title": "Presets Rápidos de Escenarios What-If",
                "what": "Botonera de pruebas: +20% Ventas, −20% Ventas, +15% Precios, −10% Precios.",
                "does": "Aplica un escenario comercial a toda la cartera en un solo clic para evaluar el impacto.",
                "how": "applyPresetScenario() aplica factores multiplicadores temporales en simOverrides de Zustand."
            },
            {
                "num": 3,
                "title": "Gráfico de Rentabilidad por Producto (SVG)",
                "what": "Barras comparativas para cada línea de servicio: Ventas, Costos Variables y Margen.",
                "does": "Permite identificar visualmente qué servicios aportan más margen y cuáles menos.",
                "how": "Genera rectángulos SVG proporcionados al máximo ingreso, actualizados en tiempo real."
            },
            {
                "num": 4,
                "title": "Sliders de Simulación Individual",
                "what": "Controles deslizantes de precio y volumen por producto.",
                "does": "Permiten ajustar la demanda o el precio de un servicio específico y ver el resultado al instante.",
                "how": "Cada cambio llama updateSimOverride(prodId, campo, valor) y recalcula todo sin recargar."
            }
        ],
        sn=3
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 4: CATÁLOGO DE PRODUCTOS
    # ═══════════════════════════════════════════════════
    # Posiciones calibradas sobre products_page:
    # Título "Catálogo de Productos Peluquería": ~17% alto, ~30% ancho
    # Botón "+ Nuevo Producto": ~17% alto, ~88% ancho
    # Buscador: ~29% alto, ~25% ancho
    # Tabla (encabezado): ~35% alto, ~50% ancho
    # Filas de datos: ~42%, ~50%
    # Acciones (editar/eliminar): ~42%, ~90%
    create_screen_slide(prs,
        "Catálogo de Productos y Servicios",
        "Gestión de la cartera de servicios, parámetros de demanda, horas de producción y precios.",
        "02_catalogo_productos.png",
        pins=[
            (0.30, 0.17, 1),   # Título
            (0.88, 0.17, 2),   # Botón + Nuevo Producto
            (0.25, 0.29, 3),   # Buscador
            (0.50, 0.36, 4),   # Cabeceras tabla
            (0.90, 0.42, 5),   # Acciones editar/eliminar
        ],
        callouts=[
            {
                "num": 1,
                "title": "Título y Descripción del Módulo",
                "what": "Encabezado 'Catálogo de Productos Peluquería' con subtítulo descriptivo.",
                "does": "Identifica la sección y su propósito: gestión de líneas, volúmenes y precios de competencia.",
                "how": "Componente ProductsSection renderiza el título desde la página ProductsPage."
            },
            {
                "num": 2,
                "title": "Botón '+ Nuevo Producto'",
                "what": "Acción principal azul para dar de alta un nuevo servicio.",
                "does": "Abre la ventana modal de registro con los campos vacíos, listos para completar.",
                "how": "Ejecuta openForAdd() en el hook useModal, reseteando el formulario a valores iniciales."
            },
            {
                "num": 3,
                "title": "Buscador de Productos",
                "what": "Campo de texto para filtrar la tabla por nombre.",
                "does": "Permite encontrar rápidamente un servicio cuando la cartera es extensa.",
                "how": "Filtra products en memoria con useMemo y un .filter() sobre el nombre en minúsculas."
            },
            {
                "num": 4,
                "title": "Tabla del Catálogo (Columnas)",
                "what": "Grilla con: Nombre, Unidades Vendidas (mensual), Horas Producción, Precio Competencia, Precio Venta.",
                "does": "Consolida las variables que alimentan el motor de costos: volumen, esfuerzo y precios de mercado.",
                "how": "Mapea la colección products del store y aplica formateadores de moneda y separadores de miles."
            },
            {
                "num": 5,
                "title": "Acciones por Fila (Editar / Eliminar)",
                "what": "Iconos de lápiz (editar) y papelera (eliminar) en cada fila.",
                "does": "Permite modificar los datos de un producto o quitarlo del catálogo (con confirmación).",
                "how": "Editar: carga el producto en el modal. Eliminar: pide confirmación y borra producto + overrides."
            }
        ],
        sn=4
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 5: MODAL DE PRODUCTO
    # ═══════════════════════════════════════════════════
    # Posiciones sobre product_modal (el modal está centrado ~38-62% ancho, ~30-70% alto):
    create_screen_slide(prs,
        "Modal de Alta y Edición de Producto",
        "Formulario emergente para registrar o modificar servicios con sus variables operativas y comerciales.",
        "03_modal_producto.png",
        pins=[
            (0.50, 0.32, 1),   # Título "Alta de Nuevo Producto" + X
            (0.50, 0.40, 2),   # Campo Nombre del Producto
            (0.43, 0.48, 3),   # Unidades Vendidas
            (0.57, 0.48, 4),   # Horas de Producción
            (0.43, 0.57, 5),   # Precio Competencia
            (0.57, 0.57, 6),   # Precio de Venta
            (0.57, 0.67, 7),   # Botones Cancelar / Registrar
        ],
        callouts=[
            {
                "num": 1,
                "title": "Encabezado del Modal y Cierre",
                "what": "Título contextual ('Alta de Nuevo Producto' o 'Editar Producto Capilar') con botón X.",
                "does": "Identifica la operación en curso y permite cerrar sin guardar cambios.",
                "how": "Evalúa si existe editingItem para definir el título. El botón X ejecuta close()."
            },
            {
                "num": 2,
                "title": "Nombre del Producto",
                "what": "Campo de texto obligatorio con placeholder descriptivo.",
                "does": "Registra la denominación comercial del servicio que aparece en todo el sistema.",
                "how": "Controlado por form.name, validado con el atributo HTML5 required."
            },
            {
                "num": "3-4",
                "title": "Unidades Vendidas y Horas de Producción",
                "what": "Inputs numéricos de volumen mensual estimado y tiempo de producción.",
                "does": "Definen la escala de demanda y el esfuerzo requerido (drivers para prorrateo CIF).",
                "how": "Las unidades calculan el costo unitario directo; las horas sirven como driver alternativo."
            },
            {
                "num": "5-6",
                "title": "Precio Competencia y Precio de Venta",
                "what": "Campos monetarios de referencia de mercado y tarifa al público.",
                "does": "El precio competencia es el benchmark; el precio de venta alimenta los ingresos brutos.",
                "how": "Se usan para calcular Ingresos = Precio × Unidades y para el badge de Competitividad."
            },
            {
                "num": 7,
                "title": "Botones Cancelar y Registrar / Guardar",
                "what": "Acciones de pie del modal para abortar o confirmar.",
                "does": "Cancela sin cambios o persiste el producto en el store global.",
                "how": "handleSubmit genera ID 'prod-timestamp' para altas o actualiza el existente en Zustand."
            }
        ],
        sn=5
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 6: COMPROBANTES Y GASTOS
    # ═══════════════════════════════════════════════════
    # Posiciones sobre comprobantes_page:
    # Título: ~10%, ~30%
    # Botón + Cargar: ~10%, ~85%
    # Filtros (Todos/MPD/MOI/CIF/Admin): ~18%, ~60%
    # Tabla: ~22-90%, ~50%
    create_screen_slide(prs,
        "Comprobantes y Gastos — Clasificación Contable",
        "Registro de erogaciones, clasificación por rubro funcional (MPD, MOI, CIF, Admin) y comportamiento.",
        "04_comprobantes_gastos.png",
        pins=[
            (0.30, 0.10, 1),   # Título
            (0.85, 0.10, 2),   # Botón + Cargar Comprobante
            (0.65, 0.17, 3),   # Filtros por tipo
            (0.38, 0.25, 4),   # Columna Tipo Funcional (badges)
            (0.53, 0.25, 5),   # Columna Comportamiento
            (0.63, 0.25, 6),   # Columna Asociado A
        ],
        callouts=[
            {
                "num": 1,
                "title": "Encabezado del Módulo de Gastos",
                "what": "Título 'Comprobantes y Registro de Gastos' con descripción de rubros que abarca.",
                "does": "Contextualiza el propósito: cargar facturas de MPD, sueldos indirectos y costos de salón.",
                "how": "Componente VouchersSection con subtítulo informativo estático."
            },
            {
                "num": 2,
                "title": "Botón '+ Cargar Comprobante'",
                "what": "Acción primaria que despliega el formulario de carga de gastos.",
                "does": "Inicia el proceso de registro de una nueva erogación clasificada.",
                "how": "Ejecuta openForAdd(defaultForm) con valores iniciales seguros."
            },
            {
                "num": 3,
                "title": "Filtros por Rubro (Tabs)",
                "what": "Botones 'Todos', 'Insumos (MPD)', 'Mano de Obra (MOI)', 'Costos Indirectos (CIF)', 'Admin'.",
                "does": "Filtran la tabla para mostrar solo los comprobantes de una categoría específica.",
                "how": "Filtro en memoria que recorre vouchers por su campo functionalType."
            },
            {
                "num": 4,
                "title": "Columna Tipo Funcional (Badges de Color)",
                "what": "Insignias que clasifican: Materiales Directos (azul), MOI (verde), CIF (naranja), Admin (gris).",
                "does": "Permite identificar de un vistazo a qué rubro contable pertenece cada erogación.",
                "how": "Si es MPD, se asocia directamente a un producto. Si es MOI/CIF/Admin, entra a la masa consolidada."
            },
            {
                "num": 5,
                "title": "Columna Comportamiento (Variable / Fijo)",
                "what": "Indica si el costo escala con la producción (Variable) o es constante (Fijo).",
                "does": "Fundamental para separar los costos que entran al CVU de los que conforman el Punto de Equilibrio.",
                "how": "Los variables se usan en Costo Variable Unitario; los fijos forman los Costos Fijos Totales."
            },
            {
                "num": 6,
                "title": "Columna 'Asociado A'",
                "what": "Indica el producto destinatario (para MPD) o 'Base Consolidada (CIF/SIF)' para indirectos.",
                "does": "Controla si el gasto se imputa de forma directa a un servicio o si se distribuye por driver.",
                "how": "MPD: vinculado por associatedProduct. Indirectos: se distribuyen proporcionalmente por driver."
            }
        ],
        sn=6
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 7: MODAL DE COMPROBANTE
    # ═══════════════════════════════════════════════════
    create_screen_slide(prs,
        "Modal de Carga de Comprobante / Gasto",
        "Formulario contable con clasificación funcional, comportamiento económico y asociación a producto.",
        "05_modal_comprobante.png",
        pins=[
            (0.42, 0.18, 1),   # Título "Cargar Comprobante / Gasto"
            (0.42, 0.24, 2),   # Concepto / Detalle
            (0.35, 0.29, 3),   # Importe ($)
            (0.52, 0.29, 4),   # Comportamiento (Variable/Fijo)
            (0.42, 0.35, 5),   # Tipo Funcional / Rubro
            (0.48, 0.39, 6),   # Botones Cancelar / Cargar Gasto
        ],
        callouts=[
            {
                "num": 1,
                "title": "Encabezado y Cierre del Modal",
                "what": "Título 'Cargar Comprobante / Gasto' con botón X de cierre.",
                "does": "Identifica la acción contable y permite salir sin guardar.",
                "how": "Controlado por useModal(). Título cambia a 'Editar Comprobante' en modo edición."
            },
            {
                "num": 2,
                "title": "Campo Concepto / Detalle",
                "what": "Texto descriptivo de la erogación (ej. 'Sueldos y jornales' o 'Factura de luz').",
                "does": "Identifica de qué se trata el gasto para que sea auditable y comprensible.",
                "how": "Almacenado en form.concept con validación required."
            },
            {
                "num": 3,
                "title": "Campo Importe ($)",
                "what": "Monto numérico de la erogación en pesos.",
                "does": "Registra la cuantía económica del gasto.",
                "how": "Valor numérico mayor a 0, almacenado en form.amount."
            },
            {
                "num": 4,
                "title": "Selector de Comportamiento",
                "what": "Menú que define: Variable (varía con el volumen) o Fijo (constante en el período).",
                "does": "Clasifica la naturaleza económica del costo frente a la actividad productiva.",
                "how": "Impacta directamente: Variable → entra al CVU; Fijo → entra a la base del Punto de Equilibrio."
            },
            {
                "num": 5,
                "title": "Selector de Tipo Funcional / Rubro",
                "what": "Desplegable con 4 opciones: MOI General, Materiales Directos (MPD), CIF de Salón, Gastos Admin.",
                "does": "Determina el destino contable del gasto en la matriz de absorción.",
                "how": "Si se elige MPD, se activa un campo extra para vincular el gasto a un producto del catálogo."
            },
            {
                "num": 6,
                "title": "Botones de Cancelar y Cargar Gasto",
                "what": "Acciones para abortar o confirmar el registro.",
                "does": "Guarda el comprobante en el store y recalcula todas las métricas al instante.",
                "how": "addVoucher() genera ID 'v-timestamp'; editVoucher() actualiza el existente en Zustand."
            }
        ],
        sn=7
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 8: ANÁLISIS DE COSTO Y MARGEN
    # ═══════════════════════════════════════════════════
    # Posiciones calibradas sobre costos_page:
    # Título + Toggle: ~10%, ~10% y ~85%
    # Slider Target Margin: ~17%, ~25%
    # Tabla 1 "Desglose Costo Técnico Unitario": ~28-47%
    # Tabla 2 "Mix de Ventas y Contribución Marginal": ~55-80%
    # Guía Rápida: ~85%, ~50%
    create_screen_slide(prs,
        "Análisis de Costo y Margen — Motor de Absorción",
        "Desglose unitario [MPD + Cuota CIF], utilidad objetivo, punto de equilibrio y precio sugerido.",
        "06_analisis_costos.png",
        pins=[
            (0.85, 0.10, 1),   # Toggle Driver
            (0.25, 0.17, 2),   # Slider Utilidad Deseada Objetivo
            (0.50, 0.35, 3),   # Tabla 1: Desglose Costo Técnico Unitario
            (0.50, 0.62, 4),   # Tabla 2: Mix de Ventas y Contribución Marginal
            (0.50, 0.88, 5),   # Guía Rápida para Toma de Decisiones
        ],
        callouts=[
            {
                "num": 1,
                "title": "Selector de Driver CIF/SIF",
                "what": "Interruptor para conmutar entre 'Unidades Producidas' y 'Horas de Producción'.",
                "does": "Cambia la base de prorrateo y recalcula al instante las cuotas de absorción de cada producto.",
                "how": "Si se eligen horas, los servicios que requieren más tiempo en el sillón absorben más CIF."
            },
            {
                "num": 2,
                "title": "Control de Utilidad Deseada (Target Margin)",
                "what": "Slider de rango con la fórmula: Precio = Costo Total / (1 − Margen%).",
                "does": "Permite fijar el margen de ganancia deseado (5% a 90%) y ver los precios sugeridos.",
                "how": "Al basarse en el Costo Total (que absorbe 100% de indirectos), garantiza utilidad neta real."
            },
            {
                "num": 3,
                "title": "Tabla: Desglose de Costo Técnico Unitario por Absorción",
                "what": "Columnas: Costo Directo (MPD), Cuota CIF/SIF, Costo Total Unitario, CVU, Precio Actual, Precio Sugerido, Estado.",
                "does": "Transparenta exactamente cuánto cuesta producir cada servicio y si el precio actual lo cubre.",
                "how": "Costo Total Unit. = MPD Unit. + Cuota CIF Unit. El badge de estado compara precio vs. costos."
            },
            {
                "num": 4,
                "title": "Tabla: Mix de Ventas y Contribución Marginal",
                "what": "Columnas: Mix %, Ingresos, Costos Variables, Margen Contribución, IMC %, Pto. Equilibrio, Competitividad.",
                "does": "Identifica los servicios que más aportan al pago de costos fijos y la posición competitiva.",
                "how": "IMC = Margen Unitario / Precio. Equilibrio (Unidades) = Costos Fijos Asignados / Margen Unitario."
            },
            {
                "num": 5,
                "title": "Guía Rápida para la Toma de Decisiones",
                "what": "Tres tarjetas explicativas: Cuota CIF/SIF, Índice IMC, y Precio Sugerido.",
                "does": "Explica en lenguaje llano cada concepto para que el dueño del negocio tome decisiones informadas.",
                "how": "Contenido estático didáctico que contextualiza las columnas de la tabla anterior."
            }
        ],
        sn=8
    )

    # ═══════════════════════════════════════════════════
    # SLIDE 9: FÓRMULAS Y METODOLOGÍA
    # ═══════════════════════════════════════════════════
    s9 = prs.slides.add_slide(prs.slide_layouts[6])
    bg_rect(s9, SLIDE_W, SLIDE_H, WHITE)
    add_header(s9, "Metodología Financiera y Fórmulas del Sistema",
               "Resumen de la lógica contable y las ecuaciones que gobiernan el motor de cálculo.", 9, TOTAL_SLIDES)

    formulas = [
        ("1. Absorción de Masa Consolidada CIF/SIF (100%)",
         "Masa Indirecta = Σ MOI + Σ CIF + Σ Gastos Admin\nFactor Driver (%) = Driver_Prod / Total_Driver\nCuota CIF Producto = Masa × Factor Driver",
         "Ningún costo del negocio queda sin asignar. El 100% de los gastos generales se distribuye entre los productos."),

        ("2. Costo Total y Costo Variable Unitario",
         "Costo Total Unit. = MPD Unitario + Cuota CIF Unitaria\nCosto Variable Unit. = MPD Unit. + CIF Variable Unit.",
         "Base del costeo por absorción integral para fijar precios sostenibles que cubran toda la estructura."),

        ("3. Margen de Contribución e Índice IMC",
         "Margen Unit. ($) = Precio Venta − Costo Variable Unit.\nIMC (%) = Margen Unitario / Precio Venta\nMC Total = Σ (Margen Unit. × Unidades)",
         "Mide cuánto dinero deja cada servicio para pagar los costos fijos y generar utilidad."),

        ("4. Punto de Equilibrio Multiproducto",
         "PE ($) = Costos Fijos Totales / IMC Promedio\nPE (Unidades) = Costos Fijos / MC Ponderado\nMargen Seguridad ($) = Ventas − Ventas de Equilibrio",
         "Facturación mínima requerida para no entrar en zona de pérdidas operativas."),

        ("5. Fijación de Precios (Target Margin)",
         "Precio Sugerido = Costo Total Unit. / (1 − Margen%)",
         "Fórmula de mark-up financiero sobre costo total que asegura rentabilidad neta real."),

        ("6. Resultado Operativo Global",
         "Resultado Operativo = MC Total − Costos Fijos Totales\nSuperávit si > 0 (verde)\nDéficit si < 0 (rojo)",
         "Utilidad neta final del período simulado, tras absorber toda la estructura empresarial.")
    ]

    cols = 3
    rows = 2
    card_w = inch(3.85)
    card_h = inch(2.6)
    gap_x = inch(0.2)
    gap_y = inch(0.2)
    grid_left = inch(0.6)
    grid_top  = inch(1.15)

    for i, (f_title, f_code, f_desc) in enumerate(formulas):
        col = i % cols
        row = i // cols
        cx = grid_left + col * (card_w + gap_x)
        cy = grid_top + row * (card_h + gap_y)

        # Tarjeta
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, cy, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = SLATE_50
        card.line.color.rgb = SLATE_200
        card.line.width = Pt(0.75)

        # Barra superior azul pequeña
        bar = s9.shapes.add_shape(MSO_SHAPE.RECTANGLE, cx, cy, card_w, Pt(3))
        bar.fill.solid()
        bar.fill.fore_color.rgb = BLUE_600
        bar.line.fill.background()

        # Contenido
        tb = s9.shapes.add_textbox(cx + inch(0.15), cy + inch(0.12), card_w - inch(0.3), card_h - inch(0.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p = tf.paragraphs[0]
        p.text = f_title
        p.font.name = FONT
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = SLATE_800
        p.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = f_code
        p2.font.name = FONT_MONO
        p2.font.size = Pt(8)
        p2.font.color.rgb = BLUE_700
        p2.space_after = Pt(6)

        p3 = tf.add_paragraph()
        p3.text = f_desc
        p3.font.name = FONT
        p3.font.size = Pt(7.5)
        p3.font.color.rgb = SLATE_500

    # ── Guardar ──
    out = os.path.join("presentacion", "Sistema_de_Costos_Presentacion.pptx")
    prs.save(out)
    print(f"OK - Presentacion guardada en: {out}")

if __name__ == "__main__":
    main()
