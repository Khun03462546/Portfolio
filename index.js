document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('[id]');
    let highlightedSection = null;

    // Handle sidebar link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            // Remove previous highlight
            if (highlightedSection) {
                highlightedSection.classList.remove('highlighted');
            }

            // Add highlight to clicked section
            if (targetSection) {
                highlightedSection = targetSection;
                targetSection.classList.add('highlighted');

                // Scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Remove highlight after 2 seconds
                setTimeout(() => {
                    if (highlightedSection === targetSection) {
                        targetSection.classList.remove('highlighted');
                        highlightedSection = null;
                    }
                }, 2000);
            }

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Add stagger animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add smooth reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all skill elements
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.opacity = '0.8';
        skill.style.transform = 'translateY(5px)';
        observer.observe(skill);
    });

    // Add scroll indicator
    const addScrollIndicator = () => {
        if (window.innerWidth > 600) {
            const hint = document.createElement('div');
            hint.style.position = 'fixed';
            hint.style.bottom = '20px';
            hint.style.right = '20px';
            hint.style.fontSize = '0.8rem';
            hint.style.color = 'rgba(0, 212, 255, 0.3)';
            hint.style.zIndex = '1';
            hint.style.pointerEvents = 'none';
            hint.textContent = '↓ Scroll for more';
            hint.style.animation = 'bounce 2s infinite';
            document.body.appendChild(hint);

            // Add bounce animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
            `;
            document.head.appendChild(style);

            // Hide after first scroll
            let scrolled = false;
            window.addEventListener('scroll', () => {
                if (!scrolled && window.scrollY > 100) {
                    hint.style.opacity = '0';
                    hint.style.transition = 'opacity 0.3s ease';
                    scrolled = true;
                }
            });
        }
    };

    addScrollIndicator();
});


