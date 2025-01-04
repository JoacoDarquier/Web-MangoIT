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

/* Form */ 
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:3000/send-email", { // Cambia la URL a la correcta
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Correo enviado exitosamente.");
        } else {
            alert("Error al enviar el correo: " + result.error);
        }
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        alert("Error al enviar el correo. Inténtalo nuevamente más tarde.");
    }
});