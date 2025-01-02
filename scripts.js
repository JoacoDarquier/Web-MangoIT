// Seleccionar las tabs y el contenido
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Eliminar clases activas de todas las tabs
        tabs.forEach(t => t.classList.remove('text-blue-600', 'border-blue-600'));
        tabs.forEach(t => t.classList.add('hover:text-gray-700', 'hover:border-gray-400'));

        // Ocultar todo el contenido
        tabContents.forEach(content => content.classList.add('hidden'));

        // Activar la tab seleccionada
        tab.classList.add('text-blue-600', 'border-blue-600');
        tab.classList.remove('hover:text-gray-700', 'hover:border-gray-400');

        // Mostrar el contenido asociado
        const target = document.getElementById(tab.dataset.tab);
        target.classList.remove('hidden');
    });
});