// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const typingText = document.querySelector('.typing-text');
const chatIcon = document.querySelector('.chat-icon');
const chatContainer = document.querySelector('.chat-container');
const chatInput = document.querySelector('.chat-input');
const chatMessages = document.querySelector('.chat-messages');
const chatSend = document.querySelector('.chat-send');
const dynamicFacts = document.querySelector('.dynamic-facts');
const projectGrid = document.querySelector('.project-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const skillsContainer = document.querySelector('.skills-container');
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

// GSAP Animations
function initAnimations() {
    // Navbar animation
    gsap.from('.nav-logo', {
        opacity: 0,
        x: -20,
        duration: 1
    });

    gsap.from('.nav-item', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.1
    });

    // Hero section animation
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
    });

    // Scroll animations
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2
    });

    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.1
    });
}

// Navigation
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scroll for navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
    });
});

// Advanced Typing Animation with multiple lines
const phrases = [
    "Full Stack Developer | AI Specialist",
    "Machine Learning Engineer",
    "Creative Problem Solver",
    "Innovation Enthusiast"
];

class TypeWriter {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            pauseTime: options.pauseTime || 2000
        };
    }

    type() {
        const phrase = this.phrases[this.currentPhrase];
        
        if (this.isDeleting) {
            this.currentChar--;
        } else {
            this.currentChar++;
        }

        this.element.textContent = phrase.substring(0, this.currentChar);

        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        if (!this.isDeleting && this.currentChar === phrase.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter
const typeWriter = new TypeWriter(typingText, phrases, {
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000
});
typeWriter.type();

// Projects Data
const projects = [
    {
        title: "AI Chat Assistant",
        description: "A smart chatbot powered by machine learning",
        tags: ["Python", "TensorFlow", "NLP"],
        category: "ai",
        image: "https://via.placeholder.com/600x400"
    },
    {
        title: "Smart Portfolio",
        description: "AI-powered portfolio website",
        tags: ["JavaScript", "HTML/CSS", "AI"],
        category: "web",
        image: "https://via.placeholder.com/600x400"
    },
    {
        title: "Mobile AI App",
        description: "AI-powered mobile application",
        tags: ["React Native", "TensorFlow Lite", "Mobile"],
        category: "mobile",
        image: "https://via.placeholder.com/600x400"
    },
    {
        title: "Data Visualization Dashboard",
        description: "Interactive data analytics platform",
        tags: ["React", "D3.js", "API"],
        category: "web",
        image: "https://via.placeholder.com/600x400"
    }
];

// Create and append project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Initialize projects grid
function initializeProjects() {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = ''; // Clear existing projects
    
    // Create and append all project cards
    projects.forEach(project => {
        projectGrid.appendChild(createProjectCard(project));
    });
    
    // Initialize GSAP animations for project cards
    gsap.from('.project-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 80%'
        }
    });
}

// Get all filter buttons and project cards
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.textContent.trim();

        // Show all projects if "All" is selected
        if (category === 'All') {
            projectCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        // Filter projects based on their tags
        projectCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.tag'))
                .map(tag => tag.textContent.trim());
            
            // Check if the card has any tag matching the selected category
            const shouldShow = tags.some(tag => {
                switch (category) {
                    case 'AI/ML':
                        return ['Python', 'TensorFlow', 'NLP', 'AI'].includes(tag);
                    case 'Web Dev':
                        return ['JavaScript', 'HTML/CSS', 'React', 'D3.js', 'API'].includes(tag);
                    case 'Mobile':
                        return ['React Native', 'Mobile', 'TensorFlow Lite'].includes(tag);
                    default:
                        return false;
                }
            });

            card.style.display = shouldShow ? 'block' : 'none';
        });
    });
});

// Add hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skills radar chart
function initSkillsChart() {
    const ctx = document.getElementById('skills-radar').getContext('2d');
    const skillsData = {
        labels: ['JavaScript', 'Python', 'AI/ML', 'React', 'Node.js', 'Cloud'],
        datasets: [{
            label: 'Skills',
            data: [90, 85, 80, 88, 82, 85],
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: 'rgba(37, 99, 235, 0.8)',
            pointBackgroundColor: 'rgba(37, 99, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: skillsData,
        options: {
            scale: {
                ticks: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// Form animations
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    input.addEventListener('focus', () => group.classList.add('focused'));
    input.addEventListener('blur', () => {
        if (!input.value) group.classList.remove('focused');
    });
});

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    contactForm.reset();
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
    }, 2000);
});

// Skills Animation
function initializeSkills() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBox = entry.target;
                const skillFill = skillBox.querySelector('.skill-fill');
                const percentage = skillBox.getAttribute('data-percentage');
                
                skillBox.classList.add('animate');
                skillFill.style.setProperty('--skill-level', `${percentage}%`);
                
                // Animate the skill category
                gsap.from(skillBox, {
                    duration: 0.8,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out",
                    delay: 0.2
                });
            }
        });
    }, {
        threshold: 0.2
    });

    skillBoxes.forEach(box => observer.observe(box));
}

// Category hover effects
function initializeSkillCategories() {
    const categories = document.querySelectorAll('.skill-category');
    
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            gsap.to(category, {
                duration: 0.3,
                scale: 1.02,
                ease: "power2.out"
            });
        });
        
        category.addEventListener('mouseleave', () => {
            gsap.to(category, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
}

// Programming Language Slideshow
function initProgrammingSlideshow() {
    const slideTrack = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.language-slide');
    
    // Clone slides to create a seamless loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slideTrack.appendChild(clone);
    });

    // Pause animation on hover
    slideTrack.addEventListener('mouseenter', () => {
        slideTrack.style.animationPlayState = 'paused';
    });

    slideTrack.addEventListener('mouseleave', () => {
        slideTrack.style.animationPlayState = 'running';
    });

    // Add click interaction
    const allSlides = document.querySelectorAll('.language-slide');
    allSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            // Remove active class from all slides
            allSlides.forEach(s => s.classList.remove('active'));
            // Add active class to clicked slide
            slide.classList.add('active');
            
            // Add a subtle pop effect
            gsap.from(slide, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProgrammingSlideshow();
    initializeProjects();
    initializeFilterButtons();
    initSkillsChart();
    initializeSkills();
    initializeSkillCategories();
});