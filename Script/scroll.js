/* hiding header function*/
let lastScrollTop = 0; // Keep track of the last scroll position

window.onscroll = function() {
  let currentScroll = window.scrollY || document.documentElement.scrollTop;

  // Scrolling down
  if (currentScroll > lastScrollTop && currentScroll > 50) {
    // Add "scroll-down" class if we've scrolled more than 50px from the top
    document.querySelector(".header").classList.add("scroll-down");
  } else if (currentScroll < lastScrollTop && currentScroll < lastScrollTop - 10) {
    // Remove "scroll-down" class when scrolling up
    document.querySelector(".header").classList.remove("scroll-down");
  }

  lastScrollTop = currentScroll;
};