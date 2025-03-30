document.addEventListener("DOMContentLoaded", function () {
// ------------- MENU DESPLEGABLE -------------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
// ------------- CARRUSEL -------------
  let indices = { exterior: 0, interior: 0 };

  function moveSlide(step, carruselId) {
      const carouselWrapper = document.getElementById(`carousel-${carruselId}`);
      if (!carouselWrapper) {
          console.error(`Carrusel con ID 'carousel-${carruselId}' no encontrado.`);
          return;
      }

      const slides = carouselWrapper.querySelectorAll(".carousel-item");
      if (slides.length === 0) {
          console.error(`No hay imágenes en el carrusel '${carruselId}'`);
          return;
      }

      const totalSlides = slides.length;

      // Actualizar índice y hacerlo circular
      indices[carruselId] = (indices[carruselId] + step + totalSlides) % totalSlides;
      console.log(`Nuevo índice de '${carruselId}':`, indices[carruselId]); // Depuración

      // Aplicar el desplazamiento al contenedor
      carouselWrapper.style.transform = `translateX(-${indices[carruselId] * 100}%)`;
  }

  // Agrega eventos a los botones si existen
  document.querySelectorAll(".prev").forEach(btn => {
      btn.addEventListener("click", () => moveSlide(-1, btn.dataset.carrusel));
  });

  document.querySelectorAll(".next").forEach(btn => {
      btn.addEventListener("click", () => moveSlide(1, btn.dataset.carrusel));
  });

  // ------------- CONTADOR HOME -------------
  const contadores = [
    { id: "eventos", final: 50, duracion: 3000, prefix: "+" },
    { id: "piscina", final: 1, duracion: 2000},
    { id: "hectareas", final: 12, duracion: 2500},
    { id: "camas", final: 5, duracion: 2100},
    { id: "cocina", final: 1, duracion: 2300},
    { id: "bano", final: 1, duracion: 2700},
  ];

  function animarContador(id, final, duracion, prefix = "") {
    let elemento = document.getElementById(id);
    // Verificar si el elemento existe
  if (!elemento) {
    console.warn(`Elemento con ID "${id}" no encontrado.`);
    return;
  }
    let inicio = 0;
    let incremento = final / (duracion / 50); // Ajuste de velocidad
    let intervalo = setInterval(() => {
      inicio += incremento;
      if (inicio >= final) {
        inicio = final;
        clearInterval(intervalo);
      }
      elemento.textContent = prefix + Math.floor(inicio);
    }, 50);
  }
  
  contadores.forEach(contador => {
    animarContador(contador.id, contador.final, contador.duracion, contador.prefix);
  });

  // ------------- VALIDACIÓN DEL FORMULARIO -------------
  const form = document.querySelector("form");
  if (form) { // Verificar si el formulario existe en la página
      form.addEventListener("submit", function (event) {
          let isValid = true;
          const inputs = form.querySelectorAll("input, textarea, select");

          inputs.forEach(input => {
              if (input.hasAttribute('required') && input.value.trim() === "") {
                  isValid = false;
                  input.classList.add('error');
              } else {
                  input.classList.remove('error');
              }
          });

          if (!isValid) {
              alert("Por favor, completa todos los campos.");
              event.preventDefault();
          } else {
              mostrarMensajeConfirmacion();
          }
      });

      function mostrarMensajeConfirmacion() {
          const mensaje = document.createElement("p");
          mensaje.textContent = "¡Gracias por tu consulta! Te responderemos pronto.";
          mensaje.style.color = "#3f51b5";
          mensaje.style.fontSize = "1.2rem";
          mensaje.style.fontWeight = "bold";
          mensaje.style.textAlign = "center";
          mensaje.style.marginTop = "20px";

          form.appendChild(mensaje);

          setTimeout(() => {
              mensaje.remove();
              form.reset();
          }, 3000);
      }
  }

// ------------- DARK MODE -------------
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  const body = document.body;
  const icon = darkModeToggle.querySelector('i');

  // Cargar preferencia guardada
  if(localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // Evento click
  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if(body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // ------------- FOOTER -------------
  fetch("footer.html")
      .then(response => response.text())
      .then(data => {
          document.querySelector("footer").innerHTML = data;
      })
      .catch(error => console.error("Error cargando el footer:", error));
});

// ------------- CONTADOR COMENTARIOS/MENSAJES -------------
const textarea = document.getElementById("comentarios");
const contador = document.getElementById("contador-caracteres");

if (textarea && contador) {
    textarea.addEventListener("input", function () {
      let caracteresRestantes = 300 - textarea.value.length;
      contador.textContent = caracteresRestantes + " caracteres restantes";
  
      // Cambiar color cuando se acerque al límite
      if (caracteresRestantes <= 50) {
        contador.style.color = "red";
      } else {
        contador.style.color = "black";
      }
    });
  } else {
    console.warn("Los elementos 'comentarios' o 'contador-caracteres' no existen en el DOM.");
  }
    