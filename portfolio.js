const observerOptions = { 
    root: null, 
    rootMargin: '0px', 
    threshold: 0.1 
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Create animated background
function createAnimatedBackground() {
    const intro = document.querySelector('.intro');
    
    // Remove existing background if it exists
    const existingBg = intro.querySelector('.animated-background');
    if (existingBg) {
        existingBg.remove();
    }

    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-background';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'animated-dots';

    // Create dots with improved visibility
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Larger size range for better visibility
        const size = Math.random() * 30 + 20; // Between 20px and 50px
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        // Position dots
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        dot.style.setProperty('--delay', Math.random() * 2);
        
        dotsContainer.appendChild(dot);
    }

    animatedBg.appendChild(dotsContainer);
    intro.insertBefore(animatedBg, intro.firstChild);

    // Improved mouse move handler with throttling
    let ticking = false;
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = intro.getBoundingClientRect();
        const dots = dotsContainer.querySelectorAll('.dot');

        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            const dotCenterX = dotRect.left + dotRect.width / 2;
            const dotCenterY = dotRect.top + dotRect.height / 2;

            // Calculate distance from mouse to dot
            const deltaX = clientX - dotCenterX;
            const deltaY = clientY - dotCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Movement strength decreases with distance
            const strength = Math.max(0, 1 - distance / 300);
            const moveX = deltaX * strength * -0.1;
            const moveY = deltaY * strength * -0.1;

            dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    };

    intro.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleMouseMove(e);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Reset dots position when mouse leaves
    intro.addEventListener('mouseleave', () => {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.style.transform = 'translate(0, 0)';
        });
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createAnimatedBackground();
        }, 250);
    });
}

// Initialize the animated background
document.addEventListener('DOMContentLoaded', () => {
    createAnimatedBackground();
});