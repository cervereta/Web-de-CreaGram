// ============================================
//           SCRIPT PRINCIPAL CREAGRAM
// ============================================

$(document).ready(function() {
    // ============================================
    //                 LOADER
    // ============================================
    
    // Ocultar loader después de cargar la página
    $(window).on('load', function() {
        setTimeout(() => {
            $('#loader').addClass('hidden');
            // Inicializar AOS después de ocultar loader
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }, 1000);
    });

    // ============================================
    //            NAVEGACIÓN MÓVIL
    // ============================================
    
    $('#nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('#nav-links').toggleClass('active');
        $('body').toggleClass('nav-open');
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    $('.nav-link').click(function() {
        $('#nav-toggle').removeClass('active');
        $('#nav-links').removeClass('active');
        $('body').removeClass('nav-open');
    });

    // ============================================
    //           NAVEGACIÓN SUAVE
    // ============================================
    
    $('.nav-link, .scroll-indicator').click(function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href') || '#grupos';
        
        if (target && $(target).length) {
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800, 'easeInOutCubic');
        }
    });

    // ============================================
    //         NAVEGACIÓN ACTIVA EN SCROLL
    // ============================================
    
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        // Cambiar estado del navbar al hacer scroll
        if (scrollPosition > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Actualizar navegación activa
        $('.nav-link').each(function() {
            const sectionId = $(this).attr('href');
            const section = $(sectionId);
            
            if (section.length) {
                const sectionTop = section.offset().top - 150;
                const sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

    // ============================================
    //             FORMULARIO DE CONTACTO
    // ============================================
    
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        // Validación básica
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Por favor, introduce un email válido.', 'error');
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();
        $submitBtn.html('<i class="bi bi-hourglass-split"></i> Enviando...').prop('disabled', true);
        
        // Simular envío del formulario
        setTimeout(() => {
            // Aquí iría la lógica real de envío del formulario
            // Por ahora, solo simulamos el éxito
            
            showNotification('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
            
            // Limpiar formulario
            $('#contact-form')[0].reset();
            
            // Restaurar botón
            $submitBtn.html(originalText).prop('disabled', false);
            
        }, 2000);
    });

    // ============================================
    //               NOTIFICACIONES
    // ============================================
    
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="bi bi-${getNotificationIcon(type)}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `);
        
        // Añadir estilos CSS dinámicamente si no existen
        if (!$('#notification-styles').length) {
            $('head').append(`
                <style id="notification-styles">
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: white;
                        border-radius: 12px;
                        padding: 16px 20px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                        z-index: 10000;
                        min-width: 300px;
                        max-width: 400px;
                        transform: translateX(420px);
                        transition: all 0.3s ease;
                        border-left: 4px solid #3b82f6;
                    }
                    .notification.show {
                        transform: translateX(0);
                    }
                    .notification-success {
                        border-left-color: #10b981;
                    }
                    .notification-error {
                        border-left-color: #ef4444;
                    }
                    .notification-warning {
                        border-left-color: #f59e0b;
                    }
                    .notification-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .notification-content i {
                        font-size: 18px;
                        color: #3b82f6;
                    }
                    .notification-success .notification-content i {
                        color: #10b981;
                    }
                    .notification-error .notification-content i {
                        color: #ef4444;
                    }
                    .notification-warning .notification-content i {
                        color: #f59e0b;
                    }
                    .notification-content span {
                        flex: 1;
                        font-size: 14px;
                        font-weight: 500;
                        color: #374151;
                    }
                    .notification-close {
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #9ca3af;
                        font-size: 16px;
                        padding: 4px;
                        margin-left: 8px;
                        transition: color 0.2s;
                    }
                    .notification-close:hover {
                        color: #374151;
                    }
                </style>
            `);
        }
        
        // Añadir al DOM
        $('body').append(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.addClass('show');
        }, 100);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Cerrar al hacer clic
        notification.find('.notification-close').click(() => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle-fill',
            error: 'exclamation-circle-fill',
            warning: 'exclamation-triangle-fill',
            info: 'info-circle-fill'
        };
        return icons[type] || icons.info;
    }

    // ============================================
    //            EFECTOS DE HOVER
    // ============================================
    
    // Efecto parallax suave en hero
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.hero-particles');
        const speed = scrolled * 0.5;
        
        parallax.css('transform', `translateY(${speed}px)`);
    });
    
    // Efecto de inclinación en las tarjetas
    $('.grupo-card').hover(
        function() {
            $(this).css('transform', 'translateY(-8px) rotateX(5deg)');
        },
        function() {
            $(this).css('transform', 'translateY(0) rotateX(0deg)');
        }
    );

    // ============================================
    //               LAZY LOADING
    // ============================================
    
    // Implementar lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ============================================
    //          MEJORAS DE ACCESIBILIDAD
    // ============================================
    
    // Navegación por teclado
    $(document).keydown(function(e) {
        // Escape para cerrar menú móvil
        if (e.key === 'Escape') {
            $('#nav-toggle').removeClass('active');
            $('#nav-links').removeClass('active');
            $('body').removeClass('nav-open');
        }
    });
    
    // Focus visible para elementos interactivos
    $('a, button, input, textarea, select').on('focus', function() {
        $(this).addClass('focus-visible');
    }).on('blur', function() {
        $(this).removeClass('focus-visible');
    });

    // ============================================
    //            UTILIDADES ADICIONALES
    // ============================================
    
    // Smooth easing personalizado para jQuery
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    // Función para detectar dispositivos móviles
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Ajustar comportamiento según dispositivo
    if (isMobile()) {
        // Deshabilitar efectos de hover en móviles
        $('.grupo-card').off('mouseenter mouseleave');
        
        // Ajustar velocidad de animación
        $('html, body').data('scroll-speed', 600);
    }
    
    // Función para sharing social (opcional)
    window.shareOnSocial = function(platform, url, text) {
        const shareUrls = {
            telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    // ============================================
    //               PERFORMANCE
    // ============================================
    
    // Throttle function para optimizar eventos de scroll
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar throttle al evento scroll
    $(window).off('scroll').on('scroll', throttle(function() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        // Cambiar estado del navbar
        if (scrollPosition > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Actualizar navegación activa
        $('.nav-link').each(function() {
            const sectionId = $(this).attr('href');
            const section = $(sectionId);
            
            if (section.length) {
                const sectionTop = section.offset().top - 150;
                const sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
        
        // Efecto parallax optimizado
        const parallax = $('.hero-particles');
        if (parallax.length && scrollPosition < window.innerHeight) {
            const speed = scrollPosition * 0.3;
            parallax.css('transform', `translateY(${speed}px)`);
        }
    }, 16)); // 60fps
    
    console.log('🚀 CreaGram - Script cargado correctamente');
});