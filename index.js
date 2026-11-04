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
