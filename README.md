# 📈 Calculadora Gráfica & Científica Interactiva (UMG)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Plotly.js](https://img.shields.io/badge/Plotly.js-2D_Graphics-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/javascript/)
[![Math.js](https://img.shields.io/badge/Math.js-Evaluator-4CAF50?style=for-the-badge)](https://mathjs.org/)
[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-222222?style=for-the-badge&logo=github)](https://aleumg.github.io/calculadora-grafica-umg/)

Aplicación web interactiva de alto rendimiento que integra una **calculadora estándar y científica** con un **motor de graficación bidimensional de funciones matemáticas en tiempo real** y una **ficha técnica de análisis de Precálculo**. Desarrollado para la cátedra de **Precálculo (Segundo Semestre)** en la **Universidad Mariano Gálvez de Guatemala (UMG)**.

🔗 **[Probar Demo en Vivo en GitHub Pages](https://aleumg.github.io/calculadora-grafica-umg/)**

---

## 🌟 Características Principales

### 1. 🧮 Calculadora Estándar & Científica Avanzada
* **Operaciones aritméticas elementales**: suma, resta, multiplicación, división, porcentajes y control de decimales.
* **Soporte de Ángulos (DEG / RAD)**: Conmutación en tiempo real entre grados sexagesimales y radianes para funciones trigonométricas ($\sin, \cos, \tan$).
* **Funciones científicas y trigonométricas**:
  * Raíz cuadrada ($\sqrt{x}$), potencias cuadráticas ($x^2$), potencias arbitrarias ($x^y$), inverso ($1/x$).
  * Valor absoluto ($|x|$), logaritmo natural ($\ln$), logaritmo decimal ($\log_{10}$).
  * Constantes matemáticas universales integradas: $\pi$ ($3.14159...$) y $e$ ($2.71828...$).
  * Memoria de respuesta (`Ans`) y cambio de signo ($\pm$).
* **Pantalla dual LCD**: Historial de la expresión evaluada y resultado numérico de alta precisión.
* **Soporte completo de teclado físico**: Accesos rápidos para números, operadores, cálculo (`Enter`), limpieza (`Esc`/`C`) y borrado (`Backspace`).

### 2. 📊 Graficador 2D en Tiempo Real (Plotly.js + Math.js)
* **Visualización de múltiples curvas**: Graficación simultánea de $f_1(x)$ (función principal) y $f_2(x)$ (función secundaria opcional).
* **Marcadores visuales interactivos sobre el plano cartesiano**:
  * 📍 **Corte con el Eje Y**: Marcador destacado en $(0, f(0))$.
  * 🎯 **Raíces Reales (Cortes con el Eje X)**: Marcadores vectoriales en $(x_i, 0)$.
  * 🔗 **Puntos de Intersección mutua**: Marcadores donde $f_1(x) = f_2(x)$.
* **Filtro de discontinuidades y asíntotas**: Mapeo seguro de valores complejos y saltos infinitos (evita líneas espurias en $1/x$, $\tan(x)$ o $\sqrt{x}$).
* **Rango horizontal configurable**: Ajuste libre del intervalo $[X_{\min}, X_{\max}]$.
* **Chips de acceso rápido (Presets)**: Plantillas listas con 1 clic para parábolas, cúbicas, racionales, trigonométricas, exponenciales y valor absoluto.

### 3. 📋 Ficha Técnica de Análisis de Precálculo
* **Evaluación formal de Paridad y Simetría**:
  * Detección de funciones **Pares** ($f(-x) = f(x)$, simétricas al eje $Y$).
  * Detección de funciones **Impares** ($f(-x) = -f(x)$, simétricas al origen).
* **Cálculo analítico y numérico de Raíces**: Algoritmo de detección por cruce de signo e interpolación lineal de alta precisión ($10^{-4}$).
* **Ordenada al origen exacta**: Evaluación directa de $f(0)$ con reporte de asíntotas verticales cuando no pertenece al dominio.
* **Extremos locales aproximados**: Detección de máximos y mínimos locales en el intervalo de visualización.

---

## 📁 Estructura del Proyecto

```text
├── index.html       # Maquetado semántico, dashboard 2 columnas y componentes accesibles
├── style.css        # Sistema de diseño moderno, variables CSS, glassmorphism y layout responsivo
├── app.js           # Lógica modular de calculadora, Plotly, Math.js y algoritmos de precálculo
├── Umg.png          # Logotipo oficial de la Universidad Mariano Gálvez
└── README.md        # Documentación técnica del repositorio
```

---

## 🚀 Ejecución y Uso Local

La aplicación es completamente autónoma (100% Client-Side) y no requiere dependencias pesadas:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/AleUmg/calculadora-grafica-umg.git
   cd calculadora-grafica-umg
   ```
2. **Abrir en el navegador**:
   * Haz doble clic sobre el archivo `index.html` o levanta un servidor estático rápido:
     ```bash
     python3 -m http.server 8080
     ```
   * Visita `http://localhost:8080` en tu navegador favorito.

---

## 🛠️ Tecnologías y Librerías

* **Lenguaje**: JavaScript (Vanilla ES6+ modular).
* **Estructura y Estilos**: HTML5 Semántico + CSS3 (Modern Grid & Flexbox).
* **Librerías Externas (CDN)**:
  * [Plotly.js](https://cdn.plot.ly/plotly-latest.min.js) — Renderizado vectorial interactivo de curvas y planos cartesianos 2D.
  * [Math.js](https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.9.0/math.js) — Motor de evaluación simbólica, expresiones algebraicas y cálculo numérico.

---

## 👨‍💻 Autor

* **Alejandro Ajpu Baten Rojas** — [GitHub: @AleUmg](https://github.com/AleUmg)
* Estudiante de Ingeniería en Sistemas de Información y Ciencias de la Computación — **Universidad Mariano Gálvez de Guatemala (UMG)**.
