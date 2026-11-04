// =================================
// SANGUINE — SITE INTERACTIONS
// =================================

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS

    const introScreen = document.getElementById("introScreen");
    const introEnter = document.getElementById("introEnter");

    const menuButton = document.getElementById("menu");
    const nav = document.getElementById("nav");

    const navbar = document.querySelector(".navbar");
    const year = document.getElementById("year");


    // =================================
    // CINEMATIC INTRO
    // =================================

    if (introScreen && introEnter) {

        document.body.classList.add("intro-locked");

        introEnter.addEventListener("click", () => {

            if (introScreen.classList.contains("leaving")) return;

            introEnter.disabled = true;

            introScreen.classList.add("leaving");

            document.body.classList.remove("intro-locked");

            setTimeout(() => {
                introScreen.remove();
            }, 1100);

        });

    }


    // =================================
    // MOBILE NAVIGATION
    // =================================

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.textContent = isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.textContent = "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // =================================
    // NAVBAR SCROLL EFFECT
    // =================================

    const updateNavbar = () => {

        if (navbar) {
            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        }

    };

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    // =================================
    // CURRENT YEAR
    // =================================

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});
// SANGUINE — Crimson Mouse Trail

if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {

    const trail = [];

    for (let i = 0; i < 6; i++) {
        const dot = document.createElement("div");
        dot.className = "mouse-trail";

        document.body.appendChild(dot);
        trail.push(dot);
    }

    window.addEventListener("pointermove", (e) => {

        trail.forEach((dot, index) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            dot.style.opacity = `${0.65 - index * 0.09}`;
            dot.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.09})`;
        });

    });

    window.addEventListener("pointerleave", () => {
        trail.forEach(dot => {
            dot.style.opacity = "0";
        });
    });
}
