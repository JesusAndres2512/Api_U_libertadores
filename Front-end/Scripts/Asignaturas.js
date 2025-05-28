document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:3000/subjects'; // Cambiar según su API
    const form = document.getElementById('formAsignatura');
    const lista = document.getElementById('listaAsignaturas');

    // Fetch para obtener asignaturas
    const fetchAsignaturas = async () => {
        try {
            const res = await fetch(apiURL);
            const asignaturas = await res.json();
            lista.innerHTML = '';
            asignaturas.forEach(asignatura => {
                lista.innerHTML += `
                    <tr>
                        <td>${asignatura.id}</td>
                        <td>${asignatura.nombre}</td>
                        <td>${asignatura.codigo}</td>
                        <td>
                            <button onclick="eliminarAsignatura(${asignatura.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al cargar asignaturas:', error);
        }
    };

    // Guardar asignatura
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevaAsignatura = {
            nombre: document.getElementById('nombreAsignatura').value,
            codigo: document.getElementById('codigo').value
        };

        try {
            await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaAsignatura)
            });
            form.reset();
            fetchAsignaturas();
        } catch (error) {
            console.error('Error al guardar asignatura:', error);   
        }
    });

    // Eliminar asignatura
    window.eliminarAsignatura = async (id) => {
        try {
            await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
            fetchAsignaturas();
        } catch (error) {
            console.error('Error al eliminar asignatura:', error);
        }
    };

    fetchAsignaturas();
});
