// ======================================
// RUNAWAY STUDIO - FULL JS (FIXED)
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // AOS (SAFE CHECK)
    // ==============================
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // ==============================
    // MOBILE MENU
    // ==============================
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.onclick = () => {
            navMenu.classList.toggle("show");
        };
    }

    // ==============================
    // NAVBAR SCROLL EFFECT
    // ==============================
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5,7,13,.92)";
            navbar.style.backdropFilter = "blur(25px)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
        } else {
            navbar.style.background = "rgba(5,7,13,.55)";
            navbar.style.boxShadow = "none";
        }
    });

    // ==============================
    // TYPING ANIMATION
    // ==============================
    const typing = document.getElementById("typing");

    const words = [
        "Wedding Photography",
        "Cinematic Videography",
        "Graduation Session",
        "Creative Studio",
        "Commercial Production"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (!typing) return;

        const current = words[wordIndex];

        if (!deleting) {
            typing.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typing.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 90);
    }

    typeEffect();

    // ==============================
    // SCROLL PROGRESS BAR
    // ==============================
    const progress = document.createElement("div");
    progress.id = "progress";
    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const value = (window.scrollY / total) * 100;
        progress.style.width = value + "%";
    });

    // ==============================
    // BACK TO TOP BUTTON
    // ==============================
    const topBtn = document.createElement("button");
    topBtn.innerHTML = "↑";
    topBtn.id = "topBtn";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ==============================
    // ACTIVE MENU
    // ==============================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    // ==============================
    // PARTICLE BACKGROUND
    // ==============================
    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");
        let particles = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2 + 1;
                this.dx = (Math.random() - 0.5) * 0.5;
                this.dy = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(212,175,55,.65)";
                ctx.fill();
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;

                if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

                this.draw();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => p.update());
            requestAnimationFrame(animate);
        }

        animate();
    }

    // ==============================
    // CURSOR GLOW
    // ==============================
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    window.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });

    // ==============================
    // PARALLAX HERO
    // ==============================
    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {
        if (hero) {
            const offset = window.scrollY;
            hero.style.backgroundPositionY = offset * 0.4 + "px";
        }
    });

    // ==============================
    // COUNTER
    // ==============================
    const counters = document.querySelectorAll(".about-grid h3");

    const speed = 60;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const counter = entry.target;
                const target = counter.innerText;

                const number = parseInt(target.replace(/\D/g, ""));
                const suffix = target.replace(/[0-9]/g, "");

                let count = 0;

                const update = () => {
                    count += Math.ceil(number / speed);

                    if (count < number) {
                        counter.innerText = count + suffix;
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = number + suffix;
                    }
                };

                update();
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(c => observer.observe(c));

    // ==============================
    // REVEAL ANIMATION
    // ==============================
    const reveals = document.querySelectorAll(".service-card,.portfolio-item,.testimonial-card");

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    reveals.forEach(el => revealObserver.observe(el));

    // ==============================
    // FLOATING EFFECT SERVICE CARD
    // ==============================
    document.querySelectorAll(".service-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform =
                `rotateX(${-(y - rect.height / 2) / 20}deg)
                 rotateY(${(x - rect.width / 2) / 20}deg)
                 translateY(-10px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
        });

    });

    // ==============================
    // BUTTON RIPPLE EFFECT
    // ==============================
    document.querySelectorAll(".btn-primary").forEach(btn => {

        btn.addEventListener("click", function (e) {

            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();

            ripple.style.left = e.clientX - rect.left + "px";
            ripple.style.top = e.clientY - rect.top + "px";
            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);
        });

    });

    // ==============================
    // IMAGE LOADING EFFECT
    // ==============================
    const images = document.querySelectorAll("img");

    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "scale(1)";
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = 0;
        img.style.transform = "scale(.95)";
        img.style.transition = ".7s";
        imgObserver.observe(img);
    });

    // ==============================
    // PRELOADER REMOVE
    // ==============================
    window.addEventListener("load", () => {
        const loader = document.getElementById("preloader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 700);
        }
    });

    // ==============================
    // LIGHTBOX
    // ==============================
    const gallery = document.querySelectorAll(".portfolio-item img");

    if (gallery.length) {

        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";

        lightbox.innerHTML = `
            <span id="closeLightbox">&times;</span>
            <img id="lightboxImg">
        `;

        document.body.appendChild(lightbox);

        const lightboxImg = document.getElementById("lightboxImg");

        gallery.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.classList.add("active");
                lightboxImg.src = img.src;
            });
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target.id === "lightbox" || e.target.id === "closeLightbox") {
                lightbox.classList.remove("active");
            }
        });
    }

    // ==============================
    // PORTFOLIO FILTER
    // ==============================
    const filterBtns = document.querySelectorAll(".portfolio-filter button");
    const items = document.querySelectorAll(".portfolio-item");

    if (filterBtns.length && items.length) {

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {

                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const value = btn.innerText.toLowerCase();

                items.forEach(item => {

                    const category = (item.dataset.category || "").toLowerCase();

                    if (value === "all" || category === value) {
                        item.style.display = "block";
                        item.style.opacity = "1";
                    } else {
                        item.style.display = "none";
                    }
                });

            });
        });
    }

    // ==============================
    // TESTIMONIAL SLIDER
    // ==============================
    const testimonials = document.querySelectorAll(".testimonial-card");

    let current = 0;

    function showTestimonial() {

        if (!testimonials.length) return;

        testimonials.forEach(card => card.style.display = "none");

        testimonials[current].style.display = "block";

        current = (current + 1) % testimonials.length;
    }

    if (testimonials.length) {
        showTestimonial();
        setInterval(showTestimonial, 5000);
    }

    // ==============================
    // WHATSAPP FLOATING
    // ==============================
    const wa = document.createElement("a");

    wa.href="https://wa.me/6285774447910?text=Halo%20saya%20mau%20booking%20foto";
    wa.target = "_blank";
    wa.className = "whatsapp";
    wa.innerHTML = '<i class="fab fa-whatsapp"></i>';

    document.body.appendChild(wa);

    // ==============================
    // YEAR AUTO
    // ==============================
    const year = document.getElementById("year");

    if (year) {
        year.innerText = new Date().getFullYear();
    }

});

document.getElementById("waForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const event = document.getElementById("event").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value;

    const phoneNumber = "6281234567890"; // GANTI NOMOR KAMU

    const text =
`Halo Runaway Studio 👋
Saya ingin booking:

Nama: ${name}
Event: ${event}
Tanggal: ${date}
Pesan: ${message}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
});

function sendToWA(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const event = document.getElementById("event").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value;

    const phone = "6285774447910";

    const text =
`Halo Runaway Studio 👋

Nama: ${name}
Event: ${event}
Tanggal: ${date}
Pesan: ${message}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
}
