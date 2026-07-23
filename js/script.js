 
    initStickyHeader();

    initMobileMenu();

    initSmoothScroll();

    initBackToTop();

});

/* ==========================================================
   ELEMENTS
========================================================== */

const header = document.getElementById("header");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const backTop = document.getElementById("backTop");

/* ==========================================================
   PRELOADER
========================================================== */

function initPreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 500);

    });

}

/* ==========================================================
   STICKY HEADER
========================================================== */

function initStickyHeader() {

    const onScroll = () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    onScroll();

    window.addEventListener("scroll", onScroll);

}

/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu() {

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        navMenu.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    if (!backTop) return;

    const toggleButton = () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    };

    toggleButton();

    window.addEventListener("scroll", toggleButton);

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollReveal() {

    const items = document.querySelectorAll(

        ".hero-content, .quick-card, .counter-box, .about-image, .about-content, .car-card, .promo-wrapper, .why-card, .simulation-grid, .testimonial-card, .faq-item"

    );

    if (!items.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: .15

        }

    );

    items.forEach((item) => {

        item.classList.add("reveal");

        observer.observe(item);

    });

}

/* ==========================================================
   COUNTER ANIMATION
========================================================== */

function initCounter() {

    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const runCounter = (counter) => {

        const target = parseInt(counter.dataset.counter);

        const duration = 1800;

        let start = 0;

        const step = Math.ceil(target / (duration / 16));

        const timer = setInterval(() => {

            start += step;

            if (start >= target) {

                start = target;

                clearInterval(timer);

            }

            counter.textContent = start.toLocaleString("id-ID");

        }, 16);

    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                runCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: .6

    });

    counters.forEach(counter => {

        counter.textContent = "0";

        observer.observe(counter);

    });

}

/* ==========================================================
   ACTIVE MENU
========================================================== */

function initActiveMenu() {

    const sections = document.querySelectorAll("section[id]");

    const links = document.querySelectorAll(".nav-menu a");

    if (!sections.length) return;

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (pageYOffset >= top && pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================================
   HERO PARALLAX
========================================================== */

function initHeroParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    window.addEventListener("scroll", () => {

        const offset = window.pageYOffset;

        hero.style.backgroundPositionY = offset * 0.45 + "px";

    });

}

/* ==========================================================
   LAZY IMAGE
========================================================== */

function initLazyImage() {

    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.removeAttribute("data-src");

            observer.unobserve(img);

        });

    });

    images.forEach(img => observer.observe(img));

}

/* ==========================================================
   WINDOW LOAD
========================================================== */

window.addEventListener("load", () => {

    initScrollReveal();

    initCounter();

    initActiveMenu();

    initHeroParallax();

    initLazyImage();

});
/* ==========================================================
   FAQ ACCORDION
========================================================== */

function initFAQ() {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach((item) => {

        const answer = item.querySelector("p");

        if (!answer) return;

        answer.style.maxHeight = "0px";

        answer.style.overflow = "hidden";

        answer.style.transition = "max-height .35s ease";

        item.addEventListener("click", () => {

            const opened = item.classList.contains("active");

            items.forEach((faq) => {

                faq.classList.remove("active");

                const p = faq.querySelector("p");

                if (p) {

                    p.style.maxHeight = "0px";

                }

            });

            if (!opened) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

}

/* ==========================================================
   RIPPLE BUTTON
========================================================== */

function initRipple() {

    document.querySelectorAll(".btn").forEach((button) => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(this.clientWidth, this.clientHeight);

            const radius = diameter / 2;

            circle.style.width = circle.style.height = diameter + "px";

            circle.style.left =

                e.clientX - this.getBoundingClientRect().left - radius + "px";

            circle.style.top =

                e.clientY - this.getBoundingClientRect().top - radius + "px";

            circle.classList.add("ripple");

            const ripple = this.querySelector(".ripple");

            if (ripple) {

                ripple.remove();

            }

            this.appendChild(circle);

        });

    });

}

/* ==========================================================
   FLOATING WHATSAPP ANIMATION
========================================================== */

function initFloatingWA() {

    const wa = document.querySelector(".floating-wa");

    if (!wa) return;

    setInterval(() => {

        wa.classList.add("pulse");

        setTimeout(() => {

            wa.classList.remove("pulse");

        }, 1200);

    }, 4500);

}

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function initProgressBar() {

    const progress = document.createElement("div");

    progress.id = "scroll-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const total =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const percent = (window.scrollY / total) * 100;

        progress.style.width = percent + "%";

    });

}

/* ==========================================================
   AUTO HIDE HEADER
========================================================== */

function initAutoHideHeader() {

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const current = window.pageYOffset;

        if (current > lastScroll && current > 180) {

            header.classList.add("hide");

        } else {

            header.classList.remove("hide");

        }

        lastScroll = current;

    });

}

/* ==========================================================
   CARD HOVER EFFECT
========================================================== */

function initCardHover() {

    document.querySelectorAll(

        ".car-card,.why-card,.testimonial-card"

    ).forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = (y / rect.height - .5) * -8;

            const rotateY = (x / rect.width - .5) * 8;

            card.style.transform =

                `perspective(1000px)

                 rotateX(${rotateX}deg)

                 rotateY(${rotateY}deg)

                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}

/* ==========================================================
   INITIALIZE
========================================================== */

window.addEventListener("load", () => {

    initFAQ();

    initRipple();

    initFloatingWA();

    initProgressBar();

    initAutoHideHeader();

    initCardHover();

});
/* ==========================================================
   TOAST NOTIFICATION
========================================================== */

function showToast(message, type = "success") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.className = "toast " + type;

    toast.innerHTML = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* ==========================================================
   COPY WHATSAPP
========================================================== */

function initCopyWhatsApp() {

    document.querySelectorAll("[data-copy]").forEach((button) => {

        button.addEventListener("click", async () => {

            const value = button.dataset.copy;

            try {

                await navigator.clipboard.writeText(value);

                showToast("Nomor WhatsApp berhasil disalin");

            } catch (err) {

                showToast("Browser tidak mendukung copy otomatis", "error");

            }

        });

    });

}

/* ==========================================================
   IMAGE LIGHTBOX
========================================================== */

function initLightbox() {

    const images = document.querySelectorAll(".zoom img,.gallery img");

    if (!images.length) return;

    const overlay = document.createElement("div");

    overlay.id = "lightbox";

    overlay.innerHTML = "<img>";

    document.body.appendChild(overlay);

    const preview = overlay.querySelector("img");

    images.forEach((img) => {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", () => {

            preview.src = img.src;

            overlay.classList.add("show");

        });

    });

    overlay.addEventListener("click", () => {

        overlay.classList.remove("show");

    });

}

/* ==========================================================
   DEBOUNCE
========================================================== */

function debounce(callback, delay = 200) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback.apply(null, args);

        }, delay);

    };

}

/* ==========================================================
   THROTTLE
========================================================== */

function throttle(callback, wait = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback.apply(null, args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, wait);

    };

}

/* ==========================================================
   HEADER SHADOW
========================================================== */

function initHeaderShadow() {

    if (!header) return;

    window.addEventListener("scroll",

        throttle(() => {

            if (window.scrollY > 40) {

                header.style.boxShadow =

                    "0 15px 35px rgba(0,0,0,.08)";

            } else {

                header.style.boxShadow = "none";

            }

        }, 100)

    );

}

/* ==========================================================
   BUTTON LOADING
========================================================== */

function initLoadingButton() {

    document.querySelectorAll(".btn-loading").forEach((btn) => {

        btn.addEventListener("click", () => {

            const text = btn.innerHTML;

            btn.disabled = true;

            btn.innerHTML =

                '<i class="fas fa-spinner fa-spin"></i> Loading...';

            setTimeout(() => {

                btn.disabled = false;

                btn.innerHTML = text;

            }, 1800);

        });

    });

}

/* ==========================================================
   INIT
========================================================== */

window.addEventListener("load", () => {

    initCopyWhatsApp();

    initLightbox();

    initHeaderShadow();

    initLoadingButton();

});
/* ==========================================================
   PREMIUM V5
   PART 5 (FINAL)
========================================================== */

/* ==========================================================
   NETWORK STATUS
========================================================== */

function updateNetworkStatus() {

    if (navigator.onLine) {

        showToast("Koneksi internet tersambung");

    } else {

        showToast("Koneksi internet terputus","error");

    }

}

window.addEventListener("online", updateNetworkStatus);

window.addEventListener("offline", updateNetworkStatus);

/* ==========================================================
   REDUCED MOTION
========================================================== */

function initReducedMotion() {

    const reduce = window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );

    if (reduce.matches) {

        document.documentElement.classList.add("reduce-motion");

    }

}

initReducedMotion();

/* ==========================================================
   CURRENT YEAR
========================================================== */

function updateYear() {

    const year = document.getElementById("year");

    if(year){

        year.textContent = new Date().getFullYear();

    }

}

updateYear();

/* ==========================================================
   ACTIVE BUTTON
========================================================== */

function initButtonState(){

    document.querySelectorAll(".btn").forEach(btn=>{

        btn.addEventListener("mousedown",()=>{

            btn.classList.add("pressed");

        });

        btn.addEventListener("mouseup",()=>{

            btn.classList.remove("pressed");

        });

        btn.addEventListener("mouseleave",()=>{

            btn.classList.remove("pressed");

        });

    });

}

initButtonState();

/* ==========================================================
   IMAGE ERROR
========================================================== */

function imageFallback(){

    document.querySelectorAll("img").forEach(img=>{

        img.addEventListener("error",()=>{

            img.src="images/no-image.webp";

        });

    });

}

imageFallback();

/* ==========================================================
   EXTERNAL LINK
========================================================== */

function externalLink(){

    document.querySelectorAll("a[target='_blank']").forEach(link=>{

        link.setAttribute(

            "rel",

            "noopener noreferrer"

        );

    });

}

externalLink();

/* ==========================================================
   PERFORMANCE LOG
========================================================== */

window.addEventListener("load",()=>{

    if("performance" in window){

        const time=Math.round(

            performance.now()

        );

        console.log(

            "Toyota Premium V5 Loaded in",

            time,

            "ms"

        );

    }

});

/* ==========================================================
   GLOBAL ERROR
========================================================== */

window.addEventListener("error",(event)=>{

    console.warn(

        "Script Error:",

        event.message

    );

});

/* ==========================================================
   UNHANDLED PROMISE
========================================================== */

window.addEventListener(

    "unhandledrejection",

    (event)=>{

        console.warn(

            "Promise Error:",

            event.reason

        );

    }

);

/* ==========================================================
   KEYBOARD ACCESSIBILITY
========================================================== */

document.addEventListener("keyup",(e)=>{

    if(e.key==="Escape"){

        const menu=document.querySelector(".nav-menu");

        if(menu){

            menu.classList.remove("active");

        }

        if(menuToggle){

            menuToggle.classList.remove("active");

        }

    }

});

/* ==========================================================
   DISABLE DOUBLE CLICK
========================================================== */

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("dblclick",(e)=>{

        e.preventDefault();

    });

});

/* ==========================================================
   FINISH
========================================================== */

console.log(

"%cToyota Pamulang Premium V5 Ready",

"background:#EB0A1E;color:#fff;padding:8px 15px;border-radius:5px;font-weight:bold"

);
