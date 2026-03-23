/* ===================================================
   HERRERÍA FABIÁN – JAVASCRIPT PRINCIPAL
   =================================================== */

(function () {
  'use strict';

  /* ── Año en footer ─────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Header: cambio al hacer scroll ────────────── */
  const header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Menú hamburguesa ───────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Filtro de trabajos ─────────────────────────── */
  const filtros       = document.querySelectorAll('.filtro-btn');
  const trabajoCards  = document.querySelectorAll('.trabajo-card');

  filtros.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      filtros.forEach(function (b) {
        b.classList.remove('filtro-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('filtro-btn--active');
      btn.setAttribute('aria-selected', 'true');

      trabajoCards.forEach(function (card) {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        card.style.animation = match ? 'fadeIn .35s ease forwards' : '';
      });
    });
  });

  /* ── Animaciones de entrada con IntersectionObserver ── */
  const animTargets = document.querySelectorAll(
    '.servicio-card, .trabajo-card, .testimonio-card, .nosotros__content, .nosotros__imagen-wrap, .section__header, .contacto__info, .contacto__form'
  );

  animTargets.forEach(function (el) { el.classList.add('fade-up'); });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animTargets.forEach(function (el) { observer.observe(el); });

  /* ── Formulario de contacto ─────────────────────── */
  const form       = document.getElementById('contactForm');
  const btnText    = document.getElementById('btnText');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  // Sanitizar input (prevenir XSS básico)
  function sanitize(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.classList.toggle('invalid', !!msg);
    error.textContent = msg || '';
  }

  function validateForm(data) {
    let valid = true;

    // Nombre
    if (!data.nombre.trim() || data.nombre.trim().length < 2) {
      setError('nombre', 'errorNombre', 'Por favor ingresá tu nombre.');
      valid = false;
    } else {
      setError('nombre', 'errorNombre', '');
    }

    // Teléfono
    const telClean = data.telefono.replace(/[\s\-().+]/g, '');
    if (!data.telefono.trim() || telClean.length < 7 || !/^\d+$/.test(telClean)) {
      setError('telefono', 'errorTelefono', 'Ingresá un teléfono válido.');
      valid = false;
    } else {
      setError('telefono', 'errorTelefono', '');
    }

    // Email (opcional pero si hay, debe ser válido)
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      setError('email', 'errorEmail', 'Ingresá un email válido.');
      valid = false;
    } else {
      setError('email', 'errorEmail', '');
    }

    // Mensaje
    if (!data.mensaje.trim() || data.mensaje.trim().length < 10) {
      setError('mensaje', 'errorMensaje', 'Describí tu proyecto (mínimo 10 caracteres).');
      valid = false;
    } else {
      setError('mensaje', 'errorMensaje', '');
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      nombre:   form.nombre.value,
      telefono: form.telefono.value,
      email:    form.email.value,
      servicio: form.servicio.value,
      mensaje:  form.mensaje.value,
    };

    if (!validateForm(data)) return;

    // Estado de carga
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando…';

    // Construir URL de WhatsApp como canal de envío
    // (para un formulario real con backend, se usa Netlify Forms - ver atributo data-netlify en el HTML)
    const servicioLabels = {
      rejas: 'Rejas y Ventanas', portones: 'Portones y Puertas',
      escaleras: 'Escaleras', balcones: 'Balcones y Barandas',
      muebles: 'Muebles de Metal', estructuras: 'Estructuras Metálicas', otro: 'Otro'
    };
    const servicioTexto = data.servicio ? (servicioLabels[data.servicio] || data.servicio) : 'No especificado';

    const msg = [
      '¡Hola Fabián! Te escribo desde tu página web.',
      '',
      '📋 *Consulta de presupuesto*',
      '👤 Nombre: ' + sanitize(data.nombre.trim()),
      '📞 Teléfono: ' + sanitize(data.telefono.trim()),
      data.email.trim() ? '✉️ Email: ' + sanitize(data.email.trim()) : '',
      '🔧 Servicio: ' + servicioTexto,
      '',
      '📝 Proyecto:',
      sanitize(data.mensaje.trim()),
    ].filter(Boolean).join('\n');

    // Simular envío (en producción Netlify Forms maneja el backend)
    setTimeout(function () {
      submitBtn.disabled = false;
      btnText.textContent = 'Enviar consulta';
      formSuccess.hidden = false;
      form.reset();

      // Scroll suave al mensaje de éxito
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Abrir WhatsApp con el mensaje pre-armado
      const phone  = '54XXXXXXXXXX'; // Reemplazar con número real
      const waURL  = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
      window.open(waURL, '_blank', 'noopener,noreferrer');
    }, 900);
  });

  /* ── Navegación activa según scroll ─────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle('nav__link--active', link.getAttribute('href') === '#' + id && !link.classList.contains('nav__link--cta'));
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();
