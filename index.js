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
// SANGUINE — SMOOTH LINEAR MOUSE TRAIL

(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.id = "mouseTrail";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width, height;
    let points = [];
    let mouse = { x: -100, y: -100 };
    let lastTime = 0;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        points.push({
            x: mouse.x,
            y: mouse.y,
            life: 1
        });

        if (points.length > 35) points.shift();
    });

    function animate(time) {
        const delta = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1;
        lastTime = time;

        ctx.clearRect(0, 0, width, height);

        points.forEach(point => {
            point.life -= 0.018 * delta;
        });

        points = points.filter(point => point.life > 0);

        if (points.length > 2) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Soft outer glow
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length - 1; i++) {
                const midX = (points[i].x + points[i + 1].x) / 2;
                const midY = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
            }

            const last = points[points.length - 1];
            ctx.lineTo(last.x, last.y);

            ctx.strokeStyle = "rgba(255, 20, 35, 0.22)";
            ctx.lineWidth = 9;
            ctx.shadowBlur = 16;
            ctx.shadowColor = "#ff1428";
            ctx.stroke();

            // Main crimson streak
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length - 1; i++) {
                const midX = (points[i].x + points[i + 1].x) / 2;
                const midY = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
            }

            ctx.lineTo(last.x, last.y);

            ctx.strokeStyle = "#e51b32";
            ctx.lineWidth = 2;
            ctx.shadowBlur = 7;
            ctx.stroke();

            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
