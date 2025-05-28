document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:3000/students'; // Cambiar según su API
    const form = document.getElementById('formEstudiante');
    const lista = document.getElementById('listaEstudiantes');

    // Fetch para obtener estudiantes
    const fetchEstudiantes = async () => {
        try {
            const res = await fetch(apiURL);
            const estudiantes = await res.json();
            lista.innerHTML = '';
            estudiantes.forEach(est => {
                lista.innerHTML += `
                    <tr>
                        <td>${est.id}</td>
                        <td>${est.nombre}</td>
                        <td>${est.matricula}</td>
                        <td>
                            <button onclick="eliminarEstudiante(${est.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al cargar estudiantes:', error);
        }
    };

    // Guardar estudiante
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevoEstudiante = {
            nombre: document.getElementById('nombre').value,
            matricula: document.getElementById('matricula').value
        };

        try {
            await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoEstudiante)
            });
            form.reset();
            fetchEstudiantes();
        } catch (error) {
            console.error('Error al guardar estudiante:', error);
        }
    });

    // Eliminar estudiante
    window.eliminarEstudiante = async (id) => {
        try {
            await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
            fetchEstudiantes();
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
        }
    };

    fetchEstudiantes();
});
