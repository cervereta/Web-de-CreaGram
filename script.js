// script.js
$(document).ready(function() {
    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);
    });

    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop() + 100;
        $('.nav-link').each(function() {
            const sectionId = $(this).attr('href');
            const section = $(sectionId);
            if (section.length) {
                const sectionTop = section.offset().top;
                const sectionBottom = sectionTop + section.outerHeight();
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });
});