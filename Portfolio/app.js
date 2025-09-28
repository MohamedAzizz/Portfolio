// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

//Theme Managment
const themeToggle=document.getElementById("themeToggle");
const body=document.body;

//check for saved theme perference or default to "dark"
const currentTheme=localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme",currentTheme)

themeToggle.addEventListener("click",()=>{
    const currentTheme=body.getAttribute("data-theme")
    const newTheme=currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme",newTheme)
    localStorage.setItem("theme",newTheme)

    //Aniate theme toggle
    gsap.to(themeToggle,{
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
    })
})


//Mobile Menu Managment
const menuToggle =document.getElementById("menuToggle")
const mobileMenu =document.getElementById("mobileMenu")

menuToggle.addEventListener("click",() => {
    menuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    //Prevent body scroll when menu is open
    if(mobileMenu.classList.countains("active")){
        body.style.overflow="hidden"
    } else{
        body.style.overflow=""
    }
})

//Loading Animation
function initLoader() {
     const loader = document.querySelector(".loader")
     const loaderText = document.querySelector(".loader-text")
     const LoaderProgress = document.querySelector(".loader-progress")

     // animation loader text
     gsap.to(loaderText,{
         opacity: 1,
         duration: 0.7,
         ease: "power2.out",
     })

     // animation progress bar
     gsap.to(LoaderProgress,{
         width: "100%",
         duration: 2,
         ease: "power2.inOut",
         onComplete: () => {
             gsap.to(loader,{
                 opacity:0,
                 duration: 0.7,
                 onComplete:() => {
                     loader.style.display = "none"
                     initAnimations()
                }
           })
      }
 })
}

//initialize loader on page load
 window.addEventListener("load", initLoader)

//custom cursor (only on desktop)
if(window.innerWidth>768){
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    document.addEventListener("mouseover", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
        })

        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.2,
        })
    })
}

//initialize all animations
function initAnimations(){
//Navigation animation
    gsap.to("nav",{
        y:0,
        duration: 1,
         ease: "power3.out",
     })
 

const heroTl = gsap.timeline()
heroTl
.to(".hero-title", {
    opacity:1,
    filter:'blur(0px)',
    y:0,
    duration:1.2,
    ease: "power3.out",
})
.to(".hero-subtitle", {
    opacity:1,
    filter:'blur(0px)',
    y:0,
    duration:0.8,
    ease: "power3.out",
}, "-=0.5")
.to(".hero-description", {
    opacity:1,
    filter:'blur(0px)',
    y:0,
    duration:0.8,
    ease: "power3.out",
}, "-=0.3")
.to(".cta-button", {
    opacity:1,
    filter:'blur(0px)',
    y:0,
    duration:0.8,
    ease: "power3.out",
}, "-=0.3")
}

// Animation pour la section About
function initAboutAnimations() {
    // Animation des éléments de la section About
    const aboutTitle = document.querySelector('.about-title');
    const aboutText = document.querySelector('.about-text');
    const statItems = document.querySelectorAll('.stat-item');
    const visualContainer = document.querySelector('.visual-container');
    
    // Timeline pour les animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    aboutTl
        .to(aboutTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to(aboutText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to(visualContainer, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.3')
        .to(statItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5');
}

// Initialiser les animations après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que les animations principales soient initialisées
    setTimeout(initAboutAnimations, 1000);
});



// Animations pour les sections Skills et Projects
function initSkillsProjectsAnimations() {
    // Animation pour la section Skills
    const skillsTitle = document.querySelector('.skills-title');
    const skillsTrack = document.querySelector('.skills-track');
    
    gsap.to(skillsTitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animation pour la section Projects
    const projectsTitle = document.querySelector('.projects-title');
    const projectCards = document.querySelectorAll('.project-card');
    
    gsap.to(projectsTitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    projectCards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Initialiser les animations après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que les animations principales soient initialisées
    setTimeout(initSkillsProjectsAnimations, 1000);
});
// Animations pour la section Contact et Footer
function initContactFooterAnimations() {
    // Animation pour la section Contact
    const contactTitle = document.querySelector('.contact-title');
    const contactText = document.querySelector('.contact-text');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form-container');
    
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    contactTl
        .to(contactTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to(contactText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to(contactForm, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.3')
        .to(contactItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5');
}

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Animation d'envoi
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi (remplacer par votre logique d'envoi d'email)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, var(--color), var(--accent))';
            this.reset();
        }, 2000);
    }, 2000);
});

// Initialiser les animations après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que les animations principales soient initialisées
    setTimeout(initContactFooterAnimations, 1000);
});