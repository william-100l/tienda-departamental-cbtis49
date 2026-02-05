// CAPÍTULO 3: Estructura de Datos y Almacenes
const tienda = {
    [span_4](start_span)almacenes: ["Norte", "Sur", "Este", "Oeste", "Central"],
    [span_5](start_span)proveedores: ["Distribuidora Global", "Tecno-Abasto MX"],
    productos: [
        [span_6](start_span){ id: 101, nombre: "Laptop Pro", stock: [10, 5, 2, 8, 15], precio: 15000, min: 10 },
        [span_7](start_span){ id: 102, nombre: "Mouse Optico", stock: [50, 20, 10, 30, 40], precio: 350, min: 30 }
    ]
};
[span_8](start_span)function showSection(section) { 
    if (section === 'inventario') renderInventario(); [span_9](start_span)
    if (section === 'reportes') generarInformeEstado(); [span_10](start_span)
}

// CAPÍTULO 3.1: Renderizado del Inventario Multi-Almacén
function renderInventario() {
    let html = `<h2>Estado General de Almacenes</h2>
    <table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
        <tr style="background: #2c3e50; color: white;">
            <th>Producto</th>
            ${tienda.almacenes.map(a => <th>${a}</th>).join('')} 
            <th>Total</th>
        </tr>`; [span_11](start_span)

    tienda.productos.forEach(p => {
        [span_12](start_span)let total = p.stock.reduce((a, b) => a + b, 0); 
        html += `<tr>
            <td><strong>${p.nombre}</strong></td>
            ${p.stock.map(s => <td>${s}</td>).join('')}
            <td>${total}</td>
        </tr>`; [span_13](start_span)
    });

    html += </table>;
    document.getElementById('content').innerHTML = html; [span_14](start_span)
}
// CAPÍTULO 4: Módulo de Ventas y Compras
function realizarVenta(productId, cantidad, almacenIdx) {
    const p = tienda.productos.find(prod => prod.id === productId); [span_15](start_span)
    [span_16](start_span)if (p.stock[almacenIdx] >= cantidad) { 
        p.stock[almacenIdx] -= cantidad;
        alert("Venta realizada con éxito"); [span_17](start_span)
        renderInventario(); [span_18](start_span)
    } else {
        alert("¡Stock insuficiente en este almacén!"); [span_19](start_span)
    }
}

function realizarCompra(productId, cantidad, almacenIdx) {
    const p = tienda.productos.find(prod => prod.id === productId); [span_20](start_span)
    p.stock[almacenIdx] += parseInt(cantidad); [span_21](start_span)
    alert("Stock actualizado (Compra realizada)"); [span_22](start_span)
    renderInventario(); [span_23](start_span)
}

// CAPÍTULO 5: Inteligencia de Negocio y Reportes
function generarInformeEstado() {
    let html = <h2>Alertas de Reabastecimiento</h2>; [span_24](start_span)//[span_24](end_span)
    tienda.productos.forEach(p => {
        [span_25](start_span)const total = p.stock.reduce((a, b) => a + b, 0); 
        [span_26](start_span)if (total <= p.min) { 
            html += `
            <div class="card" style="border-left: 5px solid red; padding: 15px; margin-bottom: 10px; background: white;">
                <p><strong>${p.nombre}</strong> está bajo el mínimo (Mínimo: ${p.min} | Actual: ${total}).</p>
                <button onclick="prepararOrden(${p.id})">Generar Orden de Compra</button>
            </div>`; [span_27](start_span)
        }
    });
    document.getElementById('content').innerHTML = html; [span_28](start_span)
}

function prepararOrden(id) {
    const p = tienda.productos.find(prod => prod.id === id); [span_29](start_span)
    document.getElementById('orden-compra-container').style.display = 'block'; [span_30](start_span)
    document.getElementById('folio-orden').textContent = "OC-" + Math.floor(Math.random() * 1000); [span_31](start_span)
    document.getElementById('fecha-orden').textContent = new Date().toLocaleDateString(); [span_32](start_span)
    
    document.getElementById('detalle-orden').innerHTML = `
        <p>Solicitamos a <strong>${tienda.proveedores[0]}</strong> la cantidad de <strong>${p.min * 2}</strong> 
        unidades de <strong>${p.nombre}</strong> para Almacén Central.</p>`; [span_33](start_span)
}
