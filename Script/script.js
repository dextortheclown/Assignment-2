// Selecting the navigation bar and menu button elements
let navbar = document.querySelector('.header .navbar');
let menu = document.querySelector('#menu-btn');

// Toggling the mobile menu
menu.onclick = () => {
    // Toggle the 'fa-times' class on the menu button to change the icon
    menu.classList.toggle('fa-times');
    // Toggle the 'active' class on the navigation bar to show/hide the mobile menu
    navbar.classList.toggle('active');
}

document.querySelector('#close-form').onclick = () =>{
    cart.classList.remove('active');
}

/* home page carousell */
var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    // Enabling loop for continuous slides
    loop:true,
    cnteredSlides:true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/* enlarges the images in the gallery section and allows user to scroll through */
lightGallery(document.querySelector('.gallery .gallery-container'));

/*scrolling to top function*/
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 100);
});

