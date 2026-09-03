(() => {
    "use strict";

    // =========================================================
    // GSAP
    // =========================================================

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // =========================================================
    // DOM
    // =========================================================

    const body = document.body;

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const contactForm = document.getElementById("contactForm");

    // =========================================================
    // THEME
    // =========================================================

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        body.dataset.theme = savedTheme;
    } else {
        body.dataset.theme = "dark";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const newTheme =
                body.dataset.theme === "dark" ? "light" : "dark";

            body.dataset.theme = newTheme;
            localStorage.setItem("theme", newTheme);

            if (gsap) {
                gsap.fromTo(
                    themeToggle,
                    { scale: 0.9 },
                    {
                        scale: 1,
                        duration: 0.25,
                        ease: "power2.out"
                    }
                );
            }
        });
    }

    // =========================================================
    // MOBILE MENU
    // =========================================================

    function closeMobileMenu() {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        body.classList.remove("menu-open");
    }

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            body.classList.toggle("menu-open", isOpen);

        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    // =========================================================
    // DESKTOP CUSTOM CURSOR
    // =========================================================

    const isDesktop =
        window.matchMedia("(pointer: fine)").matches &&
        window.innerWidth > 768;

    if (isDesktop && gsap) {

        const cursor = document.querySelector(".cursor");
        const follower = document.querySelector(".cursor-follower");

        if (cursor && follower) {

            let mouseX = 0;
            let mouseY = 0;

            let followerX = 0;
            let followerY = 0;

            window.addEventListener(
                "mousemove",
                (event) => {
                    mouseX = event.clientX;
                    mouseY = event.clientY;

                    gsap.set(cursor, {
                        x: mouseX - 10,
                        y: mouseY - 10
                    });
                },
                { passive: true }
            );

            gsap.ticker.add(() => {

                followerX += (mouseX - followerX) * 0.15;
                followerY += (mouseY - followerY) * 0.15;

                gsap.set(follower, {
                    x: followerX - 20,
                    y: followerY - 20
                });

            });

            // Hover effects
            document
                .querySelectorAll("a, button, .skill-item, .project-card")
                .forEach(element => {

                    element.addEventListener("mouseenter", () => {
                        gsap.to(follower, {
                            scale: 1.5,
                            duration: 0.2,
                            overwrite: true
                        });
                    });

                    element.addEventListener("mouseleave", () => {
                        gsap.to(follower, {
                            scale: 1,
                            duration: 0.2,
                            overwrite: true
                        });
                    });

                });
        }
    }

    // =========================================================
    // HERO ANIMATION
    // =========================================================

    function initHero() {

        if (!gsap) return;

        const elements = [
            ".hero-title",
            ".hero-subtitle",
            ".hero-description",
            ".cta-button"
        ];

        gsap.to("nav", {
            y: 0,
            duration: 0.7,
            ease: "power3.out"
        });

        const timeline = gsap.timeline();

        timeline
            .to(".hero-title", {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power3.out"
            })
            .to(".hero-subtitle", {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.4")
            .to(".hero-description", {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.3")
            .to(".cta-button", {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.3");
    }

    // =========================================================
    // SCROLL ANIMATIONS
    // =========================================================

    function animateSection(selector, options = {}) {

        if (!gsap || !ScrollTrigger) return;

        const elements = document.querySelectorAll(selector);

        if (!elements.length) return;

        gsap.fromTo(
            elements,
            {
                opacity: 0,
                y: options.y || 30
            },
            {
                opacity: 1,
                y: 0,
                duration: options.duration || 0.7,
                stagger: options.stagger || 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: options.trigger || elements[0],
                    start: options.start || "top 85%",
                    once: true
                }
            }
        );
    }

    function initScrollAnimations() {

        animateSection(".about-title", {
            trigger: "#about"
        });

        animateSection(".about-text", {
            trigger: "#about",
            delay: 0.1
        });

        animateSection(".stat-item", {
            trigger: ".about-stats",
            stagger: 0.08
        });

        animateSection(".visual-container", {
            trigger: ".visual-container",
            y: 40
        });

        animateSection(".skills-title", {
            trigger: "#skills"
        });

        animateSection(".skill-item", {
            trigger: ".skills-scroll-container",
            stagger: 0.05
        });

        animateSection(".projects-title", {
            trigger: "#projects"
        });

        animateSection(".project-card", {
            trigger: ".projects-grid",
            stagger: 0.12
        });

        animateSection(".contact-title", {
            trigger: "#contact"
        });

        animateSection(".contact-text", {
            trigger: "#contact"
        });

        animateSection(".contact-item", {
            trigger: ".contact-details",
            stagger: 0.08
        });

        animateSection(".contact-form-container", {
            trigger: ".contact-form-container",
            y: 40
        });
    }

    // =========================================================
    // CONTACT FORM
    // =========================================================

    if (contactForm) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const button = contactForm.querySelector(".submit-btn");

            if (!button) return;

            const originalContent = button.innerHTML;

            button.disabled = true;
            button.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Envoi...';

            // Simulation temporaire
            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            button.innerHTML =
                '<i class="fas fa-check"></i> Message envoyé !';

            setTimeout(() => {

                button.innerHTML = originalContent;
                button.disabled = false;

                contactForm.reset();

            }, 1800);
        });
    }

    // =========================================================
    // REDUCE MOTION
    // =========================================================

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // =========================================================
    // INITIALIZATION
    // =========================================================

    function init() {

        if (prefersReducedMotion) {

            document.body.classList.add("reduce-motion");

            document.querySelectorAll(
                ".hero-title, .hero-subtitle, .hero-description, .cta-button"
            ).forEach(element => {

                element.style.opacity = "1";
                element.style.transform = "none";
                element.style.filter = "none";

            });

            return;
        }

        initHero();
        initScrollAnimations();

        if (ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    // IMPORTANT:
    // On ne bloque plus le site avec un loader de plusieurs secondes.

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, {
            once: true
        });
    } else {
        init();
    }

})();
