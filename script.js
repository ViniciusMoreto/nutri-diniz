// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

// Loading Animation
const loader = document.getElementById('loader');
const loaderD = document.querySelector('.loader-d');
const loaderNutri = document.querySelector('.loader-nutri');
const loaderTagline = document.querySelector('.loader-tagline');
const loaderProgressFill = document.querySelector('.loader-progress-fill');
const loaderPercentage = document.querySelector('.loader-percentage');
const loaderFeatures = document.querySelectorAll('.loader-feature');

// Add loading class to body
document.body.classList.add('loading');

// Loader animation timeline
const loaderTl = gsap.timeline({
    onComplete: () => {
        // Hide loader after animation
        loader.classList.add('hide');
        document.body.classList.remove('loading');

        // Start hero animations after loader
        setTimeout(() => {
            startHeroAnimations();
        }, 300);
    }
});

// Animate logo
loaderTl
    .to(loaderD, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    })
    .to(loaderNutri, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .to(loaderTagline, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');

// Animate features appearing
loaderFeatures.forEach((feature, index) => {
    loaderTl.to(feature, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
            // Activate feature
            feature.classList.add('active');
            // Deactivate previous
            if (index > 0) {
                loaderFeatures[index - 1].classList.remove('active');
            }
        }
    }, `+=0.3`);
});

// Animate progress bar
loaderTl.to(loaderProgressFill, {
    width: '100%',
    duration: 2,
    ease: 'power2.inOut',
    onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        loaderPercentage.textContent = progress + '%';
    }
}, '-=1.5');

// Function to start hero animations after loader
function startHeroAnimations() {
    // Counter Animation
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
            },
        });
    });

    // Hero Animations
    gsap.from(".hero-badge", {
        opacity: 0,
        y: -30,
        duration: 1,
        delay: 0.2,
    });

    gsap.from(".hero h1", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
    });

    gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
    });

    gsap.from(".hero-buttons", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
    });

    gsap.from(".hero-features", {
        opacity: 0,
        x: -30,
        duration: 1,
        delay: 1,
    });

    gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
    });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
        navbar.style.boxShadow = "0 2px 30px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    }
});

// Location cards animation
gsap.utils.toArray(".location-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
    });
});

// Show More Locations
const btnShowMore = document.getElementById('btnShowMore');
const hiddenLocations = document.querySelectorAll('.hidden-location');
let locationsExpanded = false;

btnShowMore.addEventListener('click', () => {
    locationsExpanded = !locationsExpanded;

    hiddenLocations.forEach((location, index) => {
        if (locationsExpanded) {
            setTimeout(() => {
                location.classList.add('show');
            }, index * 100);
        } else {
            location.classList.remove('show');
        }
    });

    btnShowMore.classList.toggle('active');
    btnShowMore.innerHTML = locationsExpanded
        ? '<i class="fas fa-chevron-up"></i> Ver menos unidades'
        : '<i class="fas fa-chevron-down"></i> Ver mais unidades';
});

// ========================================
// ABOUT SECTION - PREMIUM HORIZONTAL TIMELINE
// ========================================
gsap.registerPlugin(ScrollTrigger);

const aboutMM = gsap.matchMedia();

// Desktop: Horizontal Scroll com Pin
aboutMM.add("(min-width: 992px)", () => {
    const track = document.querySelector(".about-track");
    const items = gsap.utils.toArray(".timeline-item");
    const dots = gsap.utils.toArray(".timeline-dot");
    const line = document.querySelector(".timeline-line-horizontal");

    if (!track) return;

    // 1. Calcula a distância exata de scroll horizontal
    const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
    };

    // 2. Animação principal de deslocamento horizontal
    const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1.5, // Suavidade extrema
            invalidateOnRefresh: true,
        }
    });

    // 3. Animação da linha horizontal crescendo da esquerda para a direita
    gsap.fromTo(line,
        { scaleX: 0 },
        {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".about",
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                scrub: true,
            }
        }
    );

    // 4. Animação de cada item e seu respectivo dot
    items.forEach((item, i) => {
        // Garante visibilidade base
        gsap.set(item, { opacity: 1 });
        gsap.set(dots[i], { scale: 1 });

        // Animação do conteúdo (fade in + slide up)
        gsap.fromTo(item.querySelector(".timeline-content"),
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    containerAnimation: tween,
                    start: "right 85%", // Começa quando o item entra pela direita
                    end: "right 50%",
                    scrub: true,
                }
            }
        );

        // Animação do "dot" estourando na tela
        gsap.fromTo(dots[i],
            { scale: 0 },
            {
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: item,
                    containerAnimation: tween,
                    start: "right 75%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    });

    // 5. Efeito Parallax suave na imagem de fundo
    gsap.to(".about-bg-image img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });
});

// Mobile/Tablet: Timeline Vertical Elegante (sem scroll horizontal)
aboutMM.add("(max-width: 991px)", () => {
    const items = gsap.utils.toArray(".timeline-item");
    const dots = gsap.utils.toArray(".timeline-dot");
    const line = document.querySelector(".timeline-line-horizontal");

    // Linha vertical crescendo
    if (line) {
        gsap.fromTo(line,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-track",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                }
            }
        );
    }

    // Animação de cada item no mobile
    items.forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, y: 40, x: -30 },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        if (dots[i]) {
            gsap.to(dots[i], {
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });
        }
    });
});

// Areas animation
gsap.utils.toArray(".area-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
    });
});

// Results Carousel (Versão Responsiva e sem cortes)
const resultsTrack = document.getElementById('resultsTrack');
const prevBtn = document.getElementById('prevResult');
const nextBtn = document.getElementById('nextResult');
let currentResultIndex = 0;
const totalResults = 8;

// Função dinâmica para saber quantos cards cabem na tela
function getVisibleResults() {
    if (window.innerWidth <= 768) return 1;  // Celular
    if (window.innerWidth <= 992) return 2;  // Tablet
    return 3;                                // Desktop
}

function updateResultsCarousel() {
    const visible = getVisibleResults();
    const card = resultsTrack.querySelector('.result-card');
    if (!card) return;

    const gap = window.innerWidth <= 768 ? 15 : 20; // Mesmo gap do CSS
    const cardWidth = card.offsetWidth;

    const offset = currentResultIndex * (cardWidth + gap);
    resultsTrack.style.transform = `translateX(-${offset}px)`;

    // Feedback visual nos botões (desativa quando chega no fim)
    prevBtn.style.opacity = currentResultIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentResultIndex === 0 ? 'none' : 'auto';

    nextBtn.style.opacity = currentResultIndex >= totalResults - visible ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentResultIndex >= totalResults - visible ? 'none' : 'auto';
}

prevBtn.addEventListener('click', () => {
    currentResultIndex = Math.max(0, currentResultIndex - 1);
    updateResultsCarousel();
});

nextBtn.addEventListener('click', () => {
    const visible = getVisibleResults();
    currentResultIndex = Math.min(totalResults - visible, currentResultIndex + 1);
    updateResultsCarousel();
});

// Recalcula ao redimensionar a tela SEM zerar a posição do usuário
window.addEventListener('resize', () => {
    // Apenas garante que o índice não ultrapasse o novo limite de cards visíveis
    const visible = getVisibleResults();
    if (currentResultIndex > totalResults - visible) {
        currentResultIndex = Math.max(0, totalResults - visible);
    }
    updateResultsCarousel();
});

// Auto-advance results carousel
setInterval(() => {
    const visible = getVisibleResults();
    currentResultIndex++;
    if (currentResultIndex > totalResults - visible) {
        currentResultIndex = 0;
    }
    updateResultsCarousel();
}, 5000);

// Inicializa o carrossel corretamente ao carregar a página
updateResultsCarousel();

// Steps animation
gsap.utils.toArray(".step").forEach((step, i) => {
    gsap.from(step, {
        scrollTrigger: {
            trigger: step,
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.15,
    });
});

// Differentials animation
gsap.utils.toArray(".diff-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
    });
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        const isActive = item.classList.contains("active");

        // Close all
        document.querySelectorAll(".faq-item").forEach((faq) => {
            faq.classList.remove("active");
        });

        // Open clicked if wasn't active
        if (!isActive) {
            item.classList.add("active");
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Parallax effect for hero (com passive: true para performance mobile)
let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector(".hero-image");
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });


// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});