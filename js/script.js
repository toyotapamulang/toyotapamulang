// ==========================================
// PRELOADER
// ==========================================

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

            setTimeout(() => {

                preloader.remove();

            }, 500);

        }, 500);

    }

});

// ==========================================
// STICKY HEADER
// ==========================================

const header = document.querySelector(".header");

function stickyHeader() {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", stickyHeader);

stickyHeader();

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-times");

            } else {

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    });

}

// ==========================================
// CLOSE MENU WHEN CLICK LINK
// ==========================================

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    });

});

// ==========================================
// CLOSE MENU WHEN RESIZE
// ==========================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-times");

                icon.classList.add("fa-bars");

            }

        }

    }

});
// ==========================================
// BACK TO TOP
// ==========================================

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);

toggleBackToTop();

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 80;

        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});

// ==========================================
// ACTIVE MENU
// ==========================================

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-menu a");

function activeMenu() {

    const scrollY = window.pageYOffset;

    sections.forEach(section => {

        const sectionHeight = section.offsetHeight;

        const sectionTop = section.offsetTop - 120;

        const sectionId = section.getAttribute("id");

        if (

            scrollY >= sectionTop &&

            scrollY < sectionTop + sectionHeight

        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });

            const activeLink = document.querySelector(

                '.nav-menu a[href="#' + sectionId + '"]'

            );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}

window.addEventListener("scroll", activeMenu);

activeMenu();

// ==========================================
// HEADER SHADOW
// ==========================================

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ==========================================
// SCROLL PROGRESS
// ==========================================

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

progressBar.style.position = "fixed";

progressBar.style.top = "0";

progressBar.style.left = "0";

progressBar.style.height = "4px";

progressBar.style.width = "0%";

progressBar.style.background = "#eb0a1e";

progressBar.style.zIndex = "99999";

progressBar.style.transition = "width .15s linear";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const scrollTop = window.pageYOffset;

    const docHeight =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});
// ==========================================
// FAQ ACCORDION
// ==========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question?.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements = document.querySelectorAll(

    ".fade-up, .fade-left, .fade-right, .zoom-in"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.15,

        rootMargin: "0px 0px -50px 0px"

    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

// ==========================================
// STAGGER ANIMATION
// ==========================================

const staggerContainers = [

    ".car-grid",

    ".promo-grid",

    ".why-grid",

    ".testimonial-grid",

    ".quick-grid"

];

staggerContainers.forEach(selector => {

    const container = document.querySelector(selector);

    if (!container) return;

    [...container.children].forEach((item, index) => {

        item.style.transitionDelay = `${index * 0.12}s`;

        item.classList.add("fade-up");

        revealObserver.observe(item);

    });

});

// ==========================================
// HERO ANIMATION
// ==========================================

window.addEventListener("load", () => {

    const heroContent = document.querySelector(".hero-content");

    const heroImage = document.querySelector(".hero-image");

    if (heroContent) {

        heroContent.classList.add("show");

    }

    if (heroImage) {

        heroImage.classList.add("show");

    }

});

// ==========================================
// PARALLAX HERO
// ==========================================

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const offset = window.scrollY * 0.08;

    heroImage.style.transform = `translateY(${offset}px)`;

});

// ==========================================
// ACTIVE BUTTON EFFECT
// ==========================================

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.97)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

// ==========================================
// IMAGE FADE-IN
// ==========================================

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                imageObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.1

    }

);

images.forEach(img => {

    img.style.opacity = "0";

    img.style.transform = "translateY(20px)";

    img.style.transition = "all .6s ease";

    imageObserver.observe(img);

});
// ==========================================
// COUNTER ANIMATION
// ==========================================

const counters = document.querySelectorAll(

    ".stat-box h3, .about-stat h3"

);

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.textContent.trim();

            const number = parseInt(text.replace(/\D/g, ""));

            if (isNaN(number)) return;

            const suffix = text.replace(/[0-9]/g, "");

            let current = 0;

            const increment = Math.max(1, Math.ceil(number / 60));

            const timer = setInterval(() => {

                current += increment;

                if (current >= number) {

                    current = number;

                    clearInterval(timer);

                }

                counter.textContent = current + suffix;

            }, 25);

            counterObserver.unobserve(counter);

        });

    },

    {

        threshold: 0.4

    }

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});

// ==========================================
// TYPING EFFECT
// ==========================================

const typingElement = document.querySelector("[data-typing]");

if (typingElement) {

    const text = typingElement.dataset.typing;

    let index = 0;

    typingElement.textContent = "";

    function typeText() {

        if (index < text.length) {

            typingElement.textContent += text.charAt(index);

            index++;

            setTimeout(typeText, 60);

        }

    }

    window.addEventListener("load", typeText);

}

// ==========================================
// TESTIMONIAL AUTO SLIDER
// ==========================================

const testimonialGrid = document.querySelector(".testimonial-grid");

if (testimonialGrid && window.innerWidth <= 768) {

    let current = 0;

    const cards = testimonialGrid.querySelectorAll(".testimonial-card");

    function showTestimonial(index) {

        cards.forEach((card, i) => {

            card.style.display = i === index ? "block" : "none";

        });

    }

    if (cards.length > 0) {

        showTestimonial(current);

        setInterval(() => {

            current++;

            if (current >= cards.length) {

                current = 0;

            }

            showTestimonial(current);

        }, 5000);

    }

}

// ==========================================
// HERO PARALLAX CONTENT
// ==========================================

const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    if (!heroContent) return;

    const offset = window.scrollY * 0.04;

    heroContent.style.transform = `translateY(${offset}px)`;

});

// ==========================================
// BUTTON RIPPLE
// ==========================================

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.offsetX - radius}px`;

        circle.style.top = `${e.offsetY - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.querySelector(".ripple");

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

// ==========================================
// BUTTON HOVER GLOW
// ==========================================

document.querySelectorAll(".btn-primary").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.boxShadow =

            "0 12px 35px rgba(235,10,30,.35)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.boxShadow = "";

    });

});

// ==========================================
// SECTION FADE DELAY
// ==========================================

document.querySelectorAll("section").forEach((section, index) => {

    section.style.animationDelay = `${index * 0.08}s`;

});

// ==========================================
// PERFORMANCE
// ==========================================

window.addEventListener(

    "scroll",

    () => {},

    {

        passive: true

    }

);
// ==========================================
// LAZY LOADING IMAGE
// ==========================================

const lazyImages = document.querySelectorAll("img");

if ("IntersectionObserver" in window) {

    const lazyObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            if (img.dataset.src) {

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

            }

            img.classList.add("loaded");

            observer.unobserve(img);

        });

    });

    lazyImages.forEach(img => lazyObserver.observe(img));

}

// ==========================================
// AUTO CLOSE MENU (OUTSIDE CLICK)
// ==========================================

document.addEventListener("click", (e) => {

    if (!navMenu || !menuToggle) return;

    const clickedMenu = navMenu.contains(e.target);

    const clickedToggle = menuToggle.contains(e.target);

    if (

        navMenu.classList.contains("active") &&

        !clickedMenu &&

        !clickedToggle

    ) {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-times");

            icon.classList.add("fa-bars");

        }

    }

});

// ==========================================
// DEBOUNCE
// ==========================================

function debounce(func, wait = 100) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, wait);

    };

}

// ==========================================
// RESIZE EVENT
// ==========================================

window.addEventListener(

    "resize",

    debounce(() => {

        if (window.innerWidth > 992) {

            navMenu?.classList.remove("active");

            menuToggle?.classList.remove("active");

        }

    }, 150)

);

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        navMenu?.classList.remove("active");

        menuToggle?.classList.remove("active");

    }

});

// ==========================================
// CURRENT YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

// ==========================================
// SAFE EXTERNAL LINK
// ==========================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {

    link.setAttribute("rel", "noopener noreferrer");

});

// ==========================================
// ERROR HANDLER
// ==========================================

window.addEventListener("error", (event) => {

    console.error("JavaScript Error:", event.message);

});

// ==========================================
// DOM READY
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Toyota Premium Website Loaded Successfully.");

});

// ==========================================
// END OF FILE
// ==========================================
