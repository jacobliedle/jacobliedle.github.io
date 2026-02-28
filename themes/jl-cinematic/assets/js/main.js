// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Close mobile menu on link click
document.querySelectorAll('.nav__link').forEach(function(link) {
  link.addEventListener('click', function() {
    var menu = document.querySelector('.nav__links');
    if (menu) menu.classList.remove('nav__links--open');
  });
});
