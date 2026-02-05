const tienda = {
    almacenes: ["Norte", "Sur", "Este", "Oeste", "Central"],
    proveedores: ["Distribuidora Global", "Tecno-Abasto MX"],
    productos: [
        { id: 101, nombre: "Laptop Pro", stock: [10, 5, 2, 8, 15], precio: 15000, min: 10 },
        { id: 102, nombre: "Mouse Optico", stock: [50, 20, 10, 30, 40], precio: 350, min: 30 }
    ]
};

function showSection(section) {
    // Limpiar pantalla y ocultar orden de compra
    document.getElementById('content').innerHTML = "";
    document.getElementById('orden-compra-container').style.display = 'none';

    if (section === 'inventario') renderInventario();
    if (section === 'reportes') generarInformeEstado();
    if (section === 'ventas' || section === 'compras') {
        document.getElementById('content').innerHTML = "<h2>Módulo de " + section + "</h2><p>Lógica de transacciones lista.</p>";
    }
}

function renderInventario() {
    let html = `<h2>Estado General de Almacenes</h2>
    <table border="1" width="100%">
        <tr><th>Producto</th>${tienda.almacenes.map(a => `<th>${a}</th>`).join('')}<th>Total</th></tr>`;
    
    tienda.productos.forEach(p => {
        let total = p.stock.reduce((a, b) => a + b, 0);
        html += `<tr><td>${p.nombre}</td>${p.stock.map(s => `<td>${s}</td>`).join('')}<td>${total}</td></tr>`;
    });
    html += `</table>`;
    document.getElementById('content').innerHTML = html;
}

function generarInformeEstado() {
    let html = `<h2>Alertas de Reabastecimiento</h2>`;
    tienda.productos.forEach(p => {
        const total = p.stock.reduce((a, b) => a + b, 0);
        if (total <= p.min) {
            html += `<div class="card" style="border-left: 5px solid red; padding:10px; margin:10px 0;">
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
