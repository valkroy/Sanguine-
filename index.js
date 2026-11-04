/* =========================================
   SANGUINE — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION
    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");

    if (menu && nav) {

        menu.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            menu.textContent = isOpen ? "✕" : "☰";
            menu.setAttribute("aria-expanded", String(isOpen));
        });

        // Close menu after selecting a navigation link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menu.textContent = "☰";
                menu.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {
            if (
                !nav.contains(event.target) &&
                !menu.contains(event.target)
            ) {
                nav.classList.remove("open");
                menu.textContent = "☰";
                menu.setAttribute("aria-expanded", "false");
            }
        });
    }

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.style.background = "rgba(9, 9, 12, 0.97)";
            navbar.style.boxShadow = "0 5px 30px rgba(0,0,0,0.25)";
        } else {
            navbar.style.background = "rgba(9, 9, 12, 0.85)";
            navbar.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    // AUTOMATIC FOOTER YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = nav
        ? nav.querySelectorAll('a[href^="#"]')
        : [];

    if ("IntersectionObserver" in window && navLinks.length) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }
                    });

                }

            });

        }, {
            threshold: 0.4
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // PAGE LOADED
    console.log("SANGUINE website loaded successfully.");

});