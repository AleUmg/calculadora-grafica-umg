/**
 * CALCULADORA GRÁFICA & CIENTÍFICA - UMG
 * Proyecto de Precálculo | Ingeniería en Sistemas
 * Universidad Mariano Gálvez de Guatemala
 * 
 * Arquitectura modular:
 * 1. Motor de Calculadora Científica (con soporte DEG/RAD, memoria y Math.js)
 * 2. Motor de Graficación 2D (Plotly.js + detección de asíntotas y puntos singulares)
 * 3. Ficha de Análisis Matemático de Precálculo (Paridad, Raíces, Intersecciones, Extremos)
 */

// ==========================================
// 1. ESTADO Y VARIABLES GLOBALES
// ==========================================
let display = document.getElementById('display');
let displayPrev = document.getElementById('display-prev');
let calcStatus = document.getElementById('calc-status');
let currentInput = '';
let lastAnswer = '0';
let shouldResetDisplay = false;
let angleMode = 'RAD'; // 'RAD' (Radianes) o 'DEG' (Grados)

// ==========================================
// 2. CALCULADORA CIENTÍFICA
// ==========================================

/**
 * Alterna entre modo Radianes y Grados para funciones trigonométricas
 */
function toggleAngleMode() {
    angleMode = (angleMode === 'RAD') ? 'DEG' : 'RAD';
    const label = document.getElementById('angle-mode-label');
    if (label) {
        label.textContent = angleMode;
        label.className = (angleMode === 'DEG') ? 'mode-deg' : 'mode-active';
    }
    calcStatus.textContent = `Modo: ${angleMode}`;
}

/**
 * Agrega un valor o símbolo a la pantalla
 */
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        // Si el usuario presiona un operador (+, -, *, /, ^), encadenar con el resultado anterior
        if (['+', '-', '*', '/', '^', '%'].includes(value)) {
            currentInput = display.value;
        } else {
            currentInput = '';
        }
        shouldResetDisplay = false;
    }

    currentInput += value;
    display.value = currentInput;
    calcStatus.textContent = 'Escribiendo...';
}

/**
 * Inserta funciones científicas estructuradas
 */
function appendFunction(func) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (func === 'pow2') {
        currentInput += '^2';
    } else if (func === 'inv') {
        currentInput += '^(-1)';
    } else {
        currentInput += func;
    }
    display.value = currentInput;
    calcStatus.textContent = 'Función insertada';
}

/**
 * Reutiliza el último resultado calculado (Ans)
 */
function useAns() {
    appendToDisplay(lastAnswer);
}

/**
 * Cambia el signo de la entrada actual (±)
 */
function toggleSign() {
    if (!currentInput) return;
    try {
        if (currentInput.startsWith('-(') && currentInput.endsWith(')')) {
            currentInput = currentInput.slice(2, -1);
        } else if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = `-(${currentInput})`;
        }
        display.value = currentInput;
    } catch (e) {
        // fallback
    }
}

/**
 * Botón C: Limpia pantalla, historial y resetea estado
 */
function clearDisplay() {
    currentInput = '';
    display.value = '';
    displayPrev.textContent = '';
    calcStatus.textContent = 'Limpio';
    shouldResetDisplay = false;
}

/**
 * Botón CE: Limpia únicamente la entrada actual en curso
 */
function clearEntry() {
    currentInput = '';
    display.value = '';
    calcStatus.textContent = 'Entrada borrada';
}

/**
 * Botón ⌫: Borra el último carácter
 */
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    calcStatus.textContent = 'Editando...';
}

/**
 * Evalúa una expresión matemática considerando el modo DEG/RAD
 */
function evaluateMathExpression(rawExpr) {
    if (!rawExpr || !rawExpr.trim()) return null;

    // Normalizar operadores y símbolos visuales
    let expr = rawExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/√/g, 'sqrt')
        .replace(/π/g, 'pi');

    // Contexto de evaluación con manejo de funciones trigonométricas en grados si aplica
    const scope = {
        sin: (x) => angleMode === 'DEG' ? Math.sin((x * Math.PI) / 180) : Math.sin(x),
        cos: (x) => angleMode === 'DEG' ? Math.cos((x * Math.PI) / 180) : Math.cos(x),
        tan: (x) => {
            if (angleMode === 'DEG') {
                const mod = ((x % 180) + 180) % 180;
                if (Math.abs(mod - 90) < 1e-9) throw new Error('Tangente indefinida en 90°');
                return Math.tan((x * Math.PI) / 180);
            }
            return Math.tan(x);
        },
        pi: Math.PI,
        e: Math.E
    };

    return math.evaluate(expr, scope);
}

/**
 * Ejecuta el cálculo principal y muestra el resultado formateado
 */
function calculate() {
    if (!currentInput.trim()) return;

    try {
        const result = evaluateMathExpression(currentInput);

        if (result === null || result === undefined) {
            display.value = 'Error';
            return;
        }

        let formattedResult;
        if (typeof result === 'number') {
            // Formatear números con decimales limpios
            formattedResult = Number.isInteger(result) ? result.toString() : Number(result.toFixed(8)).toString();
        } else if (result.isComplex) {
            formattedResult = `${result.re.toFixed(4)} + ${result.im.toFixed(4)}i`;
        } else {
            formattedResult = result.toString();
        }

        displayPrev.textContent = `${currentInput} =`;
        display.value = formattedResult;
        lastAnswer = formattedResult;
        currentInput = formattedResult;
        shouldResetDisplay = true;
        calcStatus.textContent = 'Resultado listo';
    } catch (error) {
        displayPrev.textContent = currentInput;
        display.value = 'Error Sintaxis';
        calcStatus.textContent = 'Error en expresión';
        shouldResetDisplay = true;
    }
}

// ==========================================
// 3. EVENTOS DE TECLADO
// ==========================================
document.addEventListener('keydown', function(event) {
    const active = document.activeElement;
    // No interceptar si el usuario está escribiendo en campos de texto de la gráfica
    if (active && (active.id === 'funcion1' || active.id === 'funcion2' || active.id === 'xmin' || active.id === 'xmax')) {
        if (event.key === 'Enter') {
            event.preventDefault();
            graficar();
        }
        return;
    }

    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === '^') {
        appendToDisplay('^');
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// ==========================================
// 4. MOTOR DE GRAFICACIÓN 2D (PLOTLY)
// ==========================================

/**
 * Normaliza expresiones matemáticas para la graficadora:
 * Elimina prefijos como "y =", "f(x) =", espacios superfluos y normaliza multiplicaciones implícitas
 */
function cleanFunctionString(rawStr) {
    if (!rawStr) return '';
    let str = rawStr.trim();

    // Eliminar prefijos de igualdad comunes
    str = str.replace(/^[yY]\s*=\s*/, '');
    str = str.replace(/^[fFgGhH]\s*\([xX]\)\s*=\s*/, '');

    // Reemplazos de caracteres visuales
    str = str.replace(/×/g, '*').replace(/÷/g, '/');

    // Multiplicación implícita común en álgebra:
    // e.g. 2x -> 2*x, 3(x+1) -> 3*(x+1), x(x) -> x*(x)
    str = str.replace(/(\d+)\s*([a-zA-Z\(])/g, '$1*$2');
    str = str.replace(/(\))\s*([a-zA-Z0-9\(])/g, '$1*$2');

    return str;
}

/**
 * Evalúa f(x) de forma segura retornando un valor real finito o null
 * Maneja discontinuidades, números complejos y saltos de asíntotas
 */
function safeEvalPoint(compiledExpr, x) {
    try {
        const val = compiledExpr.evaluate({ x, pi: Math.PI, e: Math.E });
        if (typeof val === 'number') {
            if (isNaN(val) || !isFinite(val)) return null;
            // Truncar saltos asintóticos enormes (e.g. tan(x) o 1/x muy cerca de 0)
            if (Math.abs(val) > 2000) return null;
            return val;
        }
        // Si Math.js retornó un número complejo (e.g. sqrt(-2))
        if (val && typeof val.re === 'number') {
            if (Math.abs(val.im || 0) < 1e-9) {
                if (!isFinite(val.re)) return null;
                if (Math.abs(val.re) > 2000) return null;
                return val.re;
            }
            return null; // Parte imaginaria significativa => fuera del dominio real
        }
    } catch (e) {
        return null;
    }
    return null;
}

/**
 * Aplica una plantilla de función rápida al formulario y la grafica
 */
function applyPreset(fn1, fn2 = '') {
    document.getElementById('funcion1').value = fn1;
    document.getElementById('funcion2').value = fn2;
    graficar();
}

/**
 * Limpia el formulario y el gráfico
 */
function clearGraph() {
    document.getElementById('funcion1').value = '';
    document.getElementById('funcion2').value = '';
    Plotly.purge('grafica');
    resetAnalysisCard();
}

/**
 * Restablece la vista por defecto de la gráfica [-10, 10]
 */
function resetGraphView() {
    document.getElementById('xmin').value = '-10';
    document.getElementById('xmax').value = '10';
    graficar();
}

function resetAnalysisCard() {
    document.getElementById('paridad').innerHTML = 'Grafica una función para analizar su paridad.';
    document.getElementById('intercepto-y').innerHTML = 'Pendiente de evaluación.';
    document.getElementById('intersecciones-x').innerHTML = 'Pendiente de evaluación.';
    document.getElementById('extremos-locales').innerHTML = 'Pendiente de evaluación.';
    document.getElementById('interseccion-curvas').innerHTML = 'No se ha especificado f₂(x).';
}

// ==========================================
// 5. ANÁLISIS MATEMÁTICO DE PRECÁLCULO
// ==========================================

/**
 * Determina la paridad de una función f(x) mediante evaluación simétrica
 * Par: f(-x) = f(x)  (Simetría eje Y)
 * Impar: f(-x) = -f(x) (Simetría con respecto al origen)
 */
function analyzeParity(compiledExpr) {
    const testPoints = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7];
    let definedPoints = 0;
    let evenMatches = 0;
    let oddMatches = 0;

    for (const x of testPoints) {
        const yPos = safeEvalPoint(compiledExpr, x);
        const yNeg = safeEvalPoint(compiledExpr, -x);

        if (yPos === null || yNeg === null) continue;

        definedPoints++;
        const scale = Math.max(1, Math.abs(yPos), Math.abs(yNeg));
        const diffEven = Math.abs(yPos - yNeg) / scale;
        const diffOdd = Math.abs(yPos + yNeg) / scale;

        if (diffEven < 1e-4) evenMatches++;
        if (diffOdd < 1e-4) oddMatches++;
    }

    if (definedPoints >= 4) {
        if (evenMatches === definedPoints) {
            return {
                tipo: 'Par',
                badgeClass: 'badge-par',
                descripcion: 'f(-x) = f(x). La curva es exactamente simétrica con respecto al <strong>eje Y</strong>.'
            };
        }
        if (oddMatches === definedPoints) {
            return {
                tipo: 'Impar',
                badgeClass: 'badge-impar',
                descripcion: 'f(-x) = -f(x). La curva es simétrica con respecto al <strong>origen (0, 0)</strong>.'
            };
        }
    }

    return {
        tipo: 'Sin paridad común',
        badgeClass: 'badge-neutral',
        descripcion: 'No cumple f(-x) = f(x) ni f(-x) = -f(x). No presenta simetría par ni impar.'
    };
}

/**
 * Calcula la intersección con el eje Y evaluando formalmente f(0)
 */
function findYIntercept(compiledExpr) {
    const yVal = safeEvalPoint(compiledExpr, 0);
    if (yVal !== null) {
        const formatted = Number.isInteger(yVal) ? yVal : Number(yVal.toFixed(4));
        return {
            exists: true,
            x: 0,
            y: formatted,
            text: `(0, ${formatted})`
        };
    }
    return {
        exists: false,
        text: 'No definida en x = 0 (posible asíntota vertical o valor fuera del dominio).'
    };
}

/**
 * Encuentra las raíces reales (intersecciones con el eje X) en el intervalo [xMin, xMax]
 * Utiliza cambio de signo y refinamiento por interpolación lineal / bisección
 */
function findRoots(compiledExpr, xMin, xMax, step = 0.02) {
    const roots = [];
    const numSteps = Math.round((xMax - xMin) / step);
    let prevX = xMin;
    let prevY = safeEvalPoint(compiledExpr, prevX);

    for (let i = 1; i <= numSteps; i++) {
        const x = xMin + i * step;
        const y = safeEvalPoint(compiledExpr, x);

        if (y !== null && Math.abs(y) < 1e-6) {
            const rootX = Number(x.toFixed(4));
            if (!roots.some(r => Math.abs(r - rootX) < 0.03)) {
                roots.push(rootX);
            }
        } else if (prevY !== null && y !== null && prevY * y < 0) {
            // Descartar discontinuidades asintóticas (e.g. 1/x salta de -inf a +inf)
            if (Math.abs(y - prevY) < 150) {
                const rootX = prevX - prevY * ((x - prevX) / (y - prevY));
                const roundedRoot = Number(rootX.toFixed(4));
                if (!roots.some(r => Math.abs(r - roundedRoot) < 0.03)) {
                    roots.push(roundedRoot);
                }
            }
        }
        prevX = x;
        prevY = y;
    }
    return roots;
}

/**
 * Detecta extremos locales aproximados (máximos y mínimos) analizando cambios de pendiente
 */
function findLocalExtrema(compiledExpr, xMin, xMax, step = 0.05) {
    const numSteps = Math.round((xMax - xMin) / step);
    const maxs = [];
    const mins = [];
    let prevX = xMin;
    let prevY = safeEvalPoint(compiledExpr, prevX);
    let prevSlope = null;

    for (let i = 1; i <= numSteps; i++) {
        const x = xMin + i * step;
        const y = safeEvalPoint(compiledExpr, x);

        if (prevY !== null && y !== null) {
            const slope = (y - prevY) / step;
            if (prevSlope !== null && Math.abs(slope - prevSlope) < 100) {
                if (prevSlope > 0.01 && slope < -0.01) {
                    maxs.push({ x: Number(prevX.toFixed(2)), y: Number(prevY.toFixed(2)) });
                } else if (prevSlope < -0.01 && slope > 0.01) {
                    mins.push({ x: Number(prevX.toFixed(2)), y: Number(prevY.toFixed(2)) });
                }
            }
            prevSlope = slope;
        } else {
            prevSlope = null;
        }
        prevX = x;
        prevY = y;
    }
    return { maxs, mins };
}

/**
 * Encuentra las intersecciones entre f1(x) y f2(x)
 */
function findIntersectionsBetween(compiled1, compiled2, xMin, xMax, step = 0.02) {
    const intersections = [];
    const numSteps = Math.round((xMax - xMin) / step);
    let prevX = xMin;
    let prevDiff = null;

    for (let i = 0; i <= numSteps; i++) {
        const x = xMin + i * step;
        const y1 = safeEvalPoint(compiled1, x);
        const y2 = safeEvalPoint(compiled2, x);

        if (y1 !== null && y2 !== null) {
            const diff = y1 - y2;
            if (Math.abs(diff) < 1e-6) {
                const ptX = Number(x.toFixed(4));
                const ptY = Number(y1.toFixed(4));
                if (!intersections.some(pt => Math.abs(pt.x - ptX) < 0.04)) {
                    intersections.push({ x: ptX, y: ptY });
                }
            } else if (prevDiff !== null && prevDiff * diff < 0 && Math.abs(diff - prevDiff) < 100) {
                const rootX = prevX - prevDiff * ((x - prevX) / (diff - prevDiff));
                const yVal = safeEvalPoint(compiled1, rootX);
                if (yVal !== null) {
                    const ptX = Number(rootX.toFixed(4));
                    const ptY = Number(yVal.toFixed(4));
                    if (!intersections.some(pt => Math.abs(pt.x - ptX) < 0.04)) {
                        intersections.push({ x: ptX, y: ptY });
                    }
                }
            }
            prevDiff = diff;
        } else {
            prevDiff = null;
        }
        prevX = x;
    }
    return intersections;
}

// ==========================================
// 6. FUNCIÓN PRINCIPAL DE GRAFICACIÓN
// ==========================================

function graficar() {
    const rawF1 = document.getElementById('funcion1').value;
    const rawF2 = document.getElementById('funcion2').value;

    if (!rawF1 || !rawF1.trim()) {
        alert('Por favor, ingresa al menos una función f₁(x) para graficar.');
        return;
    }

    const cleanF1 = cleanFunctionString(rawF1);
    const cleanF2 = cleanFunctionString(rawF2);

    let xMin = parseFloat(document.getElementById('xmin').value);
    let xMax = parseFloat(document.getElementById('xmax').value);

    if (isNaN(xMin) || isNaN(xMax) || xMin >= xMax) {
        xMin = -10;
        xMax = 10;
        document.getElementById('xmin').value = '-10';
        document.getElementById('xmax').value = '10';
    }

    // Compilar expresiones con Math.js
    let compiled1, compiled2;
    try {
        compiled1 = math.compile(cleanF1);
    } catch (err) {
        alert(`Error de sintaxis en Función 1 [${rawF1}]: ${err.message}`);
        return;
    }

    if (cleanF2) {
        try {
            compiled2 = math.compile(cleanF2);
        } catch (err) {
            alert(`Error de sintaxis en Función 2 [${rawF2}]: ${err.message}`);
            return;
        }
    }

    // Muestreo denso para suavidad de trazado
    const numSamples = 500;
    const step = (xMax - xMin) / numSamples;
    const xValues = [];
    const yValues1 = [];
    const yValues2 = cleanF2 ? [] : null;

    for (let i = 0; i <= numSamples; i++) {
        const x = xMin + i * step;
        xValues.push(x);
        yValues1.push(safeEvalPoint(compiled1, x));
        if (cleanF2) {
            yValues2.push(safeEvalPoint(compiled2, x));
        }
    }

    // Trazos para Plotly
    const traces = [];

    // Trazo de Función 1
    traces.push({
        x: xValues,
        y: yValues1,
        mode: 'lines',
        name: `f₁(x) = ${cleanF1}`,
        line: { color: '#2563eb', width: 3 },
        hoverinfo: 'x+y'
    });

    // Trazo de Función 2 si existe
    if (cleanF2) {
        traces.push({
            x: xValues,
            y: yValues2,
            mode: 'lines',
            name: `f₂(x) = ${cleanF2}`,
            line: { color: '#ea580c', width: 3, dash: 'solid' },
            hoverinfo: 'x+y'
        });
    }

    // Análisis matemático de f1(x)
    const parityResult = analyzeParity(compiled1);
    const yIntercept = findYIntercept(compiled1);
    const roots = findRoots(compiled1, xMin, xMax, 0.02);
    const extrema = findLocalExtrema(compiled1, xMin, xMax, 0.04);

    // Marcadores visuales sobre la gráfica:

    // 1. Corte con eje Y
    if (yIntercept.exists) {
        traces.push({
            x: [0],
            y: [yIntercept.y],
            mode: 'markers',
            name: `Corte Eje Y: (0, ${yIntercept.y})`,
            marker: { color: '#9333ea', size: 10, symbol: 'circle' },
            hoverinfo: 'text',
            text: [`Corte Y: (0, ${yIntercept.y})`]
        });
    }

    // 2. Raíces (Cortes Eje X)
    if (roots.length > 0) {
        traces.push({
            x: roots,
            y: roots.map(() => 0),
            mode: 'markers',
            name: `Raíces f₁(x) [${roots.length}]`,
            marker: { color: '#16a34a', size: 9, symbol: 'diamond' },
            hoverinfo: 'text',
            text: roots.map(r => `Raíz: (${r}, 0)`)
        });
    }

    // 3. Intersecciones entre curvas
    let curveIntersections = [];
    if (cleanF2) {
        curveIntersections = findIntersectionsBetween(compiled1, compiled2, xMin, xMax, 0.02);
        if (curveIntersections.length > 0) {
            traces.push({
                x: curveIntersections.map(pt => pt.x),
                y: curveIntersections.map(pt => pt.y),
                mode: 'markers',
                name: `Intersecciones [${curveIntersections.length}]`,
                marker: { color: '#dc2626', size: 11, symbol: 'cross' },
                hoverinfo: 'text',
                text: curveIntersections.map(pt => `Intersección: (${pt.x}, ${pt.y})`)
            });
        }
    }

    // Configuración estética de Plotly (Plano cartesiano profesional)
    const layout = {
        title: {
            text: `Curva f₁(x) = ${cleanF1}` + (cleanF2 ? ` vs f₂(x) = ${cleanF2}` : ''),
            font: { family: 'Segoe UI, sans-serif', size: 16, color: '#1e293b' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: '#f8fafc',
        xaxis: {
            title: 'Eje X',
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: '#334155',
            gridcolor: '#e2e8f0',
            range: [xMin, xMax]
        },
        yaxis: {
            title: 'Eje Y',
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: '#334155',
            gridcolor: '#e2e8f0'
        },
        margin: { l: 50, r: 30, t: 50, b: 50 },
        legend: {
            orientation: 'h',
            y: -0.2,
            x: 0.1
        },
        hovermode: 'closest'
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };

    Plotly.newPlot('grafica', traces, layout, config);

    // ==========================================
    // ACTUALIZAR FICHA DE ANÁLISIS EN LA UI
    // ==========================================
    document.getElementById('analysis-fn-label').textContent = `Evaluando f₁(x) = ${cleanF1}`;

    // Paridad
    document.getElementById('paridad').innerHTML = `
        <span class="badge ${parityResult.badgeClass}">${parityResult.tipo}</span>
        <p class="mt-1">${parityResult.descripcion}</p>
    `;

    // Corte con Eje Y
    document.getElementById('intercepto-y').innerHTML = yIntercept.exists
        ? `<span class="coord-tag">${yIntercept.text}</span>`
        : `<span class="text-muted">${yIntercept.text}</span>`;

    // Cortes con Eje X (Raíces)
    if (roots.length > 0) {
        const rootTags = roots.map(r => `<span class="coord-tag">(${r}, 0)</span>`).join(' ');
        document.getElementById('intersecciones-x').innerHTML = `
            <div>Total encontradas en el rango: <strong>${roots.length}</strong></div>
            <div class="coords-wrapper mt-1">${rootTags}</div>
        `;
    } else {
        document.getElementById('intersecciones-x').innerHTML = `
            <span class="text-muted">No se detectaron cruces con el eje X en el intervalo [${xMin}, ${xMax}].</span>
        `;
    }

    // Extremos locales
    let extremaHtml = '';
    if (extrema.maxs.length > 0) {
        extremaHtml += `<div><strong>Máx. locales:</strong> ` +
            extrema.maxs.map(m => `<span class="coord-tag">(${m.x}, ${m.y})</span>`).join(' ') + `</div>`;
    }
    if (extrema.mins.length > 0) {
        extremaHtml += `<div class="mt-1"><strong>Mín. locales:</strong> ` +
            extrema.mins.map(m => `<span class="coord-tag">(${m.x}, ${m.y})</span>`).join(' ') + `</div>`;
    }
    if (!extremaHtml) {
        extremaHtml = `<span class="text-muted">No se detectaron máximos o mínimos locales en este intervalo (función monótona o lineal).</span>`;
    }
    document.getElementById('extremos-locales').innerHTML = extremaHtml;

    // Intersección entre curvas
    const interSecItem = document.getElementById('item-interseccion-f1f2');
    if (cleanF2) {
        interSecItem.style.display = 'block';
        if (curveIntersections.length > 0) {
            const interTags = curveIntersections.map(pt => `<span class="coord-tag">(${pt.x}, ${pt.y})</span>`).join(' ');
            document.getElementById('interseccion-curvas').innerHTML = `
                <div>Puntos de corte entre f₁ y f₂: <strong>${curveIntersections.length}</strong></div>
                <div class="coords-wrapper mt-1">${interTags}</div>
            `;
        } else {
            document.getElementById('interseccion-curvas').innerHTML = `
                <span class="text-muted">Las curvas no se intersectan en el intervalo [${xMin}, ${xMax}].</span>
            `;
        }
    } else {
        document.getElementById('interseccion-curvas').innerHTML = `<span class="text-muted">Ingresa una segunda función f₂(x) para calcular sus puntos de corte mutuos.</span>`;
    }
}

// ==========================================
// 7. INICIALIZACIÓN AUTOMÁTICA
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Graficar automáticamente el preset por defecto (x^2 - 4) al cargar
    if (typeof Plotly !== 'undefined' && typeof math !== 'undefined') {
        graficar();
    }
});
