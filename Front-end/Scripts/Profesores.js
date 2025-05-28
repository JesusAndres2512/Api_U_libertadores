document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:3000/teachers'; // Cambiar según su API
    const form = document.getElementById('formProfesor');
    const lista = document.getElementById('listaProfesores');

    // Fetch para obtener profesores
    const fetchProfesores = async () => {
        try {
            const res = await fetch(apiURL);
            const profesores = await res.json();
            lista.innerHTML = '';
            profesores.forEach(prof => {
                lista.innerHTML += `
                    <tr>
                        <td>${prof.id}</td>
                        <td>${prof.nombre}</td>
                        <td>${prof.departamento}</td>
                        <td>
                            <button onclick="eliminarProfesor(${prof.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error('Error al cargar profesores:', error);
        }
    };

    // Guardar profesor
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevoProfesor = {
            nombre: document.getElementById('nombreProfesor').value,
            departamento: document.getElementById('departamento').value
        };

        try {
            await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProfesor)
            });
            form.reset();
            fetchProfesores();
        } catch (error) {
            console.error('Error al guardar profesor:', error);
        }
    });

    // Eliminar profesor
    window.eliminarProfesor = async (id) => {
        try {
            await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
            fetchProfesores();
        } catch (error) {
            console.error('Error al eliminar profesor:', error);
        }
    };

    fetchProfesores();
});
