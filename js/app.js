// DATOS DEL SISTEMA (Capítulo 3)
const tienda = {
    almacenes: ["Norte", "Sur", "Este", "Oeste", "Central"],
    proveedores: ["Distribuidora Global", "Tecno-Abasto MX"],
    productos: [
        { id: 101, nombre: "Laptop Pro", stock: [10, 5, 2, 8, 15], precio: 15000, min: 10 },
        { id: 102, nombre: "Mouse Optico", stock: [50, 20, 10, 30, 40], precio: 350, min: 30 }
    ]
};

// NAVEGACIÓN (Capítulo 2)
function showSection(section) {
    const content = document.getElementById('content');
    content.innerHTML = ""; // Limpia la pantalla
    document.getElementById('orden-compra-container').style.display = 'none';

    if (section === 'inventario') renderInventario();
    if (section === 'reportes') generarInformeEstado();
    if (section === 'ventas') renderFormularioTransaccion('Venta');
    if (section === 'compras') renderFormularioTransaccion('Compra');
}

// RENDERIZADO DE TABLA (Capítulo 3.1)
function renderInventario() {
    let html = `<h2>Estado General de Almacenes</h2>
    <table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
        <tr style="background: #2c3e50; color: white;">
            <th>Producto</th>
            ${tienda.almacenes.map(a => `<th>${a}</th>`).join('')}
            <th>Total Stock</th>
        </tr>`;
    
    tienda.productos.forEach(p => {
        let total = p.stock.reduce((a, b) => a + b, 0);
        html += `<tr>
            <td><strong>${p.nombre}</strong></td>
            ${p.stock.map(s => `<td>${s}</td>`).join('')}
            <td style="background: #eee;">${total}</td>
        </tr>`;
    });
    html += `</table>`;
    document.getElementById('content').innerHTML = html;
}

// FORMULARIO PARA VENTAS/COMPRAS (Capítulo 4)
function renderFormularioTransaccion(tipo) {
    let html = `<h2>Registrar ${tipo}</h2>
    <div class="card">
        <label>Producto:</label>
        <select id="prodId">${tienda.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}</select>
        <br><br>
        <label>Almacén:</label>
        <select id="almIdx">${tienda.almacenes.map((a, i) => `<option value="${i}">${a}</option>`).join('')}</select>
        <br><br>
        <label>Cantidad:</label>
        <input type="number" id="cant" value="1">
        <br><br>
        <button onclick="procesarTransaccion('${tipo}')">Ejecutar ${tipo}</button>
    </div>`;
    document.getElementById('content').innerHTML = html;
}

function procesarTransaccion(tipo) {
    const id = parseInt(document.getElementById('prodId').value);
    const idx = parseInt(document.getElementById('almIdx').value);
    const cant = parseInt(document.getElementById('cant').value);
    const p = tienda.productos.find(prod => prod.id === id);

    if (tipo === 'Venta') {
        if (p.stock[idx] >= cant) {
            p.stock[idx] -= cant;
            alert("Venta exitosa");
        } else {
            alert("Error: No hay suficiente stock en el almacén " + tienda.almacenes[idx]);
        }
    } else {
        p.stock[idx] += cant;
        alert("Compra registrada");
    }
    showSection('inventario');
}

// REPORTES Y ORDEN DE COMPRA (Capítulo 5)
function generarInformeEstado() {
    let html = `<h2>Alertas de Reabastecimiento</h2>`;
    tienda.productos.forEach(p => {
        const total = p.stock.reduce((a, b) => a + b, 0);
        if (total <= p.min) {
            html += `<div class="card" style="border-left: 5px solid red; padding:15px; margin:10px 0;">
                <p> <strong>${p.nombre}</strong> está bajo el mínimo (Mínimo: ${p.min} | Actual: ${total}).</p>
                <button onclick="prepararOrden(${p.id})">Generar Orden de Compra</button>
            </div>`;
        }
    });
    if (html === `<h2>Alertas de Reabastecimiento</h2>`) {
        html += "<p> Todo el stock está en niveles óptimos.</p>";
    }
    document.getElementById('content').innerHTML = html;
}

function prepararOrden(id) {
    const p = tienda.productos.find(prod => prod.id === id);
    const container = document.getElementById('orden-compra-container');
    container.style.display = 'block';
    document.getElementById('folio-orden').textContent = "OC-" + Math.floor(Math.random()*9000 + 1000);
    document.getElementById('fecha-orden').textContent = new Date().toLocaleDateString();
    document.getElementById('detalle-orden').innerHTML = `
        <p>Se solicita al proveedor <strong>${tienda.proveedores[0]}</strong> el reabastecimiento de:
        <br><strong>Articulo:</strong> ${p.nombre} 
        <br><strong>Cantidad sugerida:</strong> ${p.min * 2} unidades.</p>`;
    container.scrollIntoView({behavior: "smooth"});
}
