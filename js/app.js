const tienda = {
    almacenes: ["Norte", "Sur", "Este", "Oeste", "Central"],
    proveedores: ["Distribuidora Global", "Tecno-Abasto MX"],
    productos: [
        { id: 101, nombre: "Laptop Pro", stock: [10, 5, 2, 8, 15], precio: 15000, min: 10 },
        { id: 102, nombre: "Mouse Optico", stock: [50, 20, 10, 30, 40], precio: 350, min: 30 }
    ]
};

function showSection(section) {
    const container = document.getElementById('orden-compra-container');
    if (container) container.style.display = 'none';

    if (section === 'inventario') renderInventario();
    if (section === 'ventas') renderFormularioTransaccion('Ventas');
    if (section === 'compras') renderFormularioTransaccion('Compras');
    if (section === 'reportes') generarInformeEstado();
}

function renderInventario() {
    let html = `<h2>Estado General de Almacenes</h2>
                <div class="card">
                <table border="1" width="100%" style="border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            ${tienda.almacenes.map(a => `<th>${a}</th>`).join('')}
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    tienda.productos.forEach(p => {
        const total = p.stock.reduce((a, b) => a + b, 0);
        html += `<tr>
                    <td>${p.nombre}</td>
                    ${p.stock.map(s => `<td>${s}</td>`).join('')}
                    <td><strong>${total}</strong></td>
                </tr>`;
    });

    html += `</tbody></table></div>`;
    document.getElementById('content').innerHTML = html;
}

function renderFormularioTransaccion(tipo) {
    let html = `<h2>Módulo de ${tipo}</h2>
                <div class="card">
                    <div class="form-group">
                        <label>Producto:</label>
                        <select id="prodId">
                            ${tienda.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Almacén:</label>
                        <select id="almIdx">
                            ${tienda.almacenes.map((a, i) => `<option value="${i}">${a}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cantidad:</label>
                        <input type="number" id="cant" value="1" min="1">
                    </div>
                    <button onclick="procesarTransaccion('${tipo}')">Ejecutar ${tipo}</button>
                </div>`;
    document.getElementById('content').innerHTML = html;
}

function procesarTransaccion(tipo) {
    const id = parseInt(document.getElementById('prodId').value);
    const idx = parseInt(document.getElementById('almIdx').value);
    const cant = parseInt(document.getElementById('cant').value);

    if (tipo === 'Ventas') {
        realizarVenta(id, cant, idx);
    } else {
        realizarCompra(id, cant, idx);
    }
}

function realizarVenta(productId, cantidad, almacenIdx) {
    const p = tienda.productos.find(prod => prod.id === productId);
    if (p.stock[almacenIdx] >= cantidad) {
        p.stock[almacenIdx] -= cantidad;
        alert("Venta realizada");
        renderInventario();
    } else {
        alert("¡Stock insuficiente en este almacén!");
    }
}

function realizarCompra(productId, cantidad, almacenIdx) {
    const p = tienda.productos.find(prod => prod.id === productId);
    p.stock[almacenIdx] += parseInt(cantidad);
    alert("Stock actualizado");
    renderInventario();
}

function generarInformeEstado() {
    let html = '<h2>Alertas de Reabastecimiento</h2>';
    tienda.productos.forEach(p => {
        const total = p.stock.reduce((a, b) => a + b, 0);
        if (total <= p.min) {
            html += `<div class="card" style="border-left: 5px solid red;">
                        <p><strong>${p.nombre}</strong> está bajo el mínimo (${p.min}).</p>
                        <button onclick="prepararOrden(${p.id})">Generar Orden de Compra</button>
                    </div>`;
        }
    });
    document.getElementById('content').innerHTML = html;
}

function prepararOrden(id) {
    const p = tienda.productos.find(prod => prod.id === id);
    document.getElementById('orden-compra-container').style.display = 'block';
    document.getElementById('folio-orden').textContent = "OC-" + Math.floor(Math.random()*1000);
    document.getElementById('fecha-orden').textContent = new Date().toLocaleDateString();
    document.getElementById('detalle-orden').innerHTML = `
        <p>Solicitamos a <strong>${tienda.proveedores[0]}</strong> la cantidad de <strong>${p.min * 2}</strong> 
        unidades de <strong>${p.nombre}</strong> para Almacén Central.</p>`;
}
