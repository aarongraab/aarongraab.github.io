function initializeImageSliders() {
  const sliders = document.querySelectorAll('.image-slider');
  
  sliders.forEach(slider => {
      const images = slider.querySelectorAll('.slider-image');
      const container = slider.closest('.project-images');
      const prevBtn = container.querySelector('.prev-btn');
      const nextBtn = container.querySelector('.next-btn');
      const dotsContainer = container.querySelector('.slider-dots');
      
      let currentIndex = 0;
      
      // Create dots
      images.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
      });
      
      const dots = dotsContainer.querySelectorAll('.dot');
      
      function updateDots() {
          dots.forEach((dot, index) => {
              dot.classList.toggle('active', index === currentIndex);
          });
      }
      
      function goToSlide(index) {
          currentIndex = index;
          slider.style.transform = `translateX(-${currentIndex * 100}%)`;
          updateDots();
      }
      
      prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          goToSlide(currentIndex);
      });
      
      nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % images.length;
          goToSlide(currentIndex);
      });
  });
}

function initializeMain() {
  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');

  menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('show');
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navUl.classList.remove('show');
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Timeline functionality using Intersection Observer
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length > 0) {
      const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1  // Trigger when 10% of the item is visible
      };

      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target);  // Stop observing once visible
              }
          });
      }, options);

      // Show first item immediately
      timelineItems[0].classList.add('visible');

      // Observe remaining items
      timelineItems.forEach((item, index) => {
          if (index > 0) {  // Skip first item as it's already visible
              observer.observe(item);
          }
      });
  }

  // Initialize image sliders if they exist
  initializeImageSliders();
}

export default function Main() {
  // Check if the document is already loaded
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeMain);
  } else {
      initializeMain();
  }
  return null;
}