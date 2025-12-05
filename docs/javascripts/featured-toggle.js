document$.subscribe(function() {
  // Get the button and featured section
  const showFeaturedBtn = document.querySelector('.show-featured-btn');
  const featuredSection = document.getElementById('featured-posts');
  
  if (showFeaturedBtn && featuredSection) {
    showFeaturedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle visibility
      if (featuredSection.style.display === 'none') {
        featuredSection.style.display = 'block';
        this.textContent = 'Hide Featured';
        
        // Smooth scroll to featured section
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        featuredSection.style.display = 'none';
        this.textContent = 'View Featured';
      }
    });
  }
});