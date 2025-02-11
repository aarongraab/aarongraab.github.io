const projectsBySkill = {
    "Python": [
        "Data Visulization Graphs using pandas and matplotlib",
        "Machine Learning Projects using pandas",
        "BlackJack Game"
    ],
    "HTML": [
        "Personal Portfolio Website",
        "Stock Market Trading Simulation",
    ],
    "CSS": [
        "Personal Portfolio Website",
        "Stock Market Trading Simulation"
    ],
    "JavaScript": [
        "Personal Portfolio Website",
        "Stock Market Trading Simulation"
    ],
    "Node.js": [
        "Stock Market Trading Simulation"
    ],
    "Express.js": [
        "Stock Market Trading Simulation"
    ],
    "three.js": [
        "AI Movement Project"
    ],
    "React": [
        "Resume Website Update"
    ],
    "SQL": [
        "Database Management Project"
    ],
    "C#": [
        "Unity Card Stacking Mechanics",
        "Unity Game (in progress - NDA)"
    ],
    "C++": [
        "Invasion Protocol"
    ],
    "Java": [
        "Server-Client Project"
    ],
    "Flutter": [
        "Final App Project (in progress)"
    ],
    "Dart": [
        "Final App Project (in progress)"
    ]
};

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

  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', function() {
        const skill = this.dataset.skill;
        const display = document.querySelector('.projects-display');
        
        // If clicking an already active skill, deselect it
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            display.style.display = 'none';
            return;
        }
        
        // Remove active class from all skills
        document.querySelectorAll('.skill-item').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked skill
        this.classList.add('active');
        
        // Update projects display
        const title = display.querySelector('.projects-title');
        const list = display.querySelector('.projects-list');
        
        title.textContent = `Projects using ${skill}`;
        list.innerHTML = projectsBySkill[skill].map(project => `<li>${project}</li>`).join('');
        display.style.display = 'block';
        });
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const response = await fetch('https://formspree.io/f/xyzznqgz', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Reset the form
                    contactForm.reset();
                    // Optionally show a success message
                    alert('Message sent successfully!');
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            }
        });
    }

    // Timeline expansion functionality
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.addEventListener('click', function() {
            // If another item is expanded, collapse it
            const currentlyExpanded = document.querySelector('.timeline-content.expanded');
            if (currentlyExpanded && currentlyExpanded !== this) {
                currentlyExpanded.classList.remove('expanded');
            }
            
            // Toggle current item
            this.classList.toggle('expanded');
        });
    });
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