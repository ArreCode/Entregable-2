document.addEventListener('DOMContentLoaded', () => {
    
    const listaHistorial = document.getElementById('lista-historial');
    
    const historialGuardado = localStorage.getItem('historialCompras');

    const historial = JSON.parse(historialGuardado || '[]'); 
    
    if (historial.length === 0) {
        const pVacio = document.createElement('p');
        pVacio.textContent = "Aún no hay compras registradas en el historial. ¡Es hora de comprar!";
        listaHistorial.appendChild(pVacio);
        
    } else {
        
        historial.forEach((compra, index) => {
            
            const divCompra = document.createElement('div');
            divCompra.setAttribute('class', 'tarjeta-compra'); 
            
            const h3Titulo = document.createElement('h3');
            h3Titulo.textContent = `Compra #${index + 1} | Fecha: ${compra.fecha}`;
            divCompra.appendChild(h3Titulo);

            const pTotal = document.createElement('p');
            pTotal.innerHTML = `Total Pagado: <strong>$${compra.total.toLocaleString('es-AR')}</strong>`;
            divCompra.appendChild(pTotal);
            
            const ulDetalle = document.createElement('ul');
            
            compra.productosAdquiridos.forEach(p => {
                const liItem = document.createElement('li');
                liItem.textContent = `${p.nombre} x ${p.cantidad} (Subtotal: $${p.subtotal.toLocaleString('es-AR')})`;
                ulDetalle.appendChild(liItem);
            });

            divCompra.appendChild(ulDetalle);
            
            listaHistorial.appendChild(divCompra);
        });
        
        const gastoTotalAcumulado = historial.reduce((acc, compra) => acc + compra.total, 0);
        const pAcumulado = document.createElement('p');
        pAcumulado.setAttribute('class', 'gasto-total');
        pAcumulado.textContent = `Gasto Total Acumulado: $${gastoTotalAcumulado.toLocaleString('es-AR')}`;
        
        listaHistorial.appendChild(pAcumulado);
    }
});