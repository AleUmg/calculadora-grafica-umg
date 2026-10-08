# 📈 Calculadora Gráfica y Científica Interactiva (UMG)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Plotly.js](https://img.shields.io/badge/Plotly.js-2D_Graphics-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/javascript/)
[![Math.js](https://img.shields.io/badge/Math.js-Evaluator-4CAF50?style=for-the-badge)](https://mathjs.org/)
[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-222222?style=for-the-badge&logo=github)](https://aleumg.github.io/calculadora-grafica-umg/)

Aplicación web interactiva que integra una **calculadora estándar y científica** con un **motor de graficación bidimensional de funciones matemáticas en tiempo real**. Desarrollado como proyecto académico para la cátedra de **Precálculo (Segundo Semestre)** en la **Universidad Mariano Gálvez de Guatemala (UMG)**.

🔗 **[Probar Demo en Vivo](https://aleumg.github.io/calculadora-grafica-umg/)**

---

## 🌟 Características Principales

### 1. 🧮 Calculadora Estándar & Científica
* Operaciones aritméticas elementales: suma, resta, multiplicación y división con control de decimales.
* Funciones científicas y trigonométricas:
  * Raíz cuadrada ($\sqrt{x}$), potencias ($x^2$, $x^y$), seno ($\sin$), coseno ($\cos$), tangente ($\tan$).
  * Logaritmos naturales y de base 10 ($\ln$, $\log$).
  * Manejo fluido de expresiones compuestas con paréntesis `( )`.
* Manejo seguro de borrado por caracter ($\backspace$), limpieza de entrada ($\text{CE}$) y reinicio total ($\text{C}$).

### 2. 📊 Graficador de Funciones 2D en Tiempo Real
* Visualización gráfica fluida e interactiva de curvas y funciones en el plano cartesiano $xy$.
* Motor de trazado impulsado por **Plotly.js**:
  * Paneo, zoom interactivo y caja de inspección de coordenadas en cualquier punto de la curva.
  * Auto-escalado de ejes y cuadrícula matemática de precisión.
* Evaluación y parseo seguro de funciones complejas mediante **Math.js**.

### 3. 🎨 Diseño e Identidad Visual
* Interfaz responsiva y estética adaptada a escritorio y dispositivos móviles.
* Identidad institucional con encabezado y logotipo oficial de la UMG.

---

## 📁 Estructura del Proyecto

```text
├── index.html       # Estructura semántica del maquetado y contenedores
├── style.css        # Estilos CSS modernos, diseño grid y layout responsivo
├── app.js           # Lógica matemática, listeners del DOM e integración con Plotly/Math.js
├── Umg.png          # Logotipo institucional
└── README.md        # Documentación técnica del repositorio
```

---

## 🚀 Ejecución y Uso Local

La aplicación es completamente autónoma (100% Client-Side) y no requiere instalación de Node.js, Python ni servidores backend:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/AleUmg/calculadora-grafica-umg.git
   cd calculadora-grafica-umg
   ```
2. **Abrir en el navegador**:
   * Haz doble clic sobre el archivo `index.html` o ábrelo en tu navegador web favorito (Chrome, Firefox, Edge, Safari, Brave).

---

## 🛠️ Tecnologías y Librerías

* **Lenguaje**: JavaScript (Vanilla ES6+).
* **Estructura y Estilos**: HTML5 semántico + CSS3 (Flexbox y Grid).
* **Librerías Externas (CDN)**:
  * [Plotly.js](https://cdn.plot.ly/plotly-latest.min.js) — Renderizado vectorial e interactivo de gráficas 2D.
  * [Math.js](https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.9.0/math.js) — Motor de evaluación simbólica y cálculo numérico.

---

## 👨‍💻 Autor

* **Alejandro Ajpu Baten Rojas** — [GitHub: @AleUmg](https://github.com/AleUmg)
* Estudiante de Ingeniería en Sistemas de Información y Ciencias de la Computación — **Universidad Mariano Gálvez de Guatemala (UMG)**.
