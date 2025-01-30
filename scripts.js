//Nabvar responsive
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarLinksContainer = document.querySelector('.navbar-links-container');

navbarToggler.addEventListener('click', () => {
    // Alterna la clase 'active' para el contenedor completo
    navbarLinksContainer.classList.toggle('active');
});


const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todos los tabs
        tabs.forEach(t => {
            t.classList.remove('active');
            t.querySelector('.tab-text').style.color = 'white';
        });

        // Agregar clase active al tab clickeado
        tab.classList.add('active');
        tab.querySelector('.tab-text').style.color = 'white';

        // Ocultar todos los contenidos
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Mostrar el contenido correspondiente
        const targetId = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
            
            // Agregar una pequeña demora para la animación
            setTimeout(() => {
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
            }, 50);
        }
    });
});

// Activar el primer tab por defecto
if (tabs.length > 0) {
    tabs[0].click();
}

/* Form */ 
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://www.mangoit.com.ar/send-email", {
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

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Animación del navbar al hacer scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('header');
    
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}

