// Toggle mobile menu
let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('fa-times'); // Toggle icon change on click
    navbar.classList.toggle('active'); // Toggle menu visibility on click
});

// Initialize Swiper for the carousel
var swiper = new Swiper(".home-slider", {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// Initialize lightGallery for the gallery section
lightGallery(document.querySelector('.gallery-container'), {
    selector: '.box',
    download: false,
});

// "Back to top" button functionality
let backToTopBtn = document.getElementById('return-to-top');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

backToTopBtn.addEventListener('click', function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});


