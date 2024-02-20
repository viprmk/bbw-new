const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

document.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 600, fill: "forwards" });
});

document.querySelectorAll(".video-container, .details--open").forEach(element => {
    element.addEventListener("mouseover", function () {
        cursorDot.style.width = "64px";
        cursorDot.style.height = "64px";
        cursorDot.style.color = "white";
        cursorDot.style.zIndex = "9999";
        cursorOutline.style.zIndex = "9998"; 
        cursorOutline.style.border = "2px solid transparent";
        cursorDot.style.backgroundColor = "hsla(340, 74%, 40%, 1)";
        if (element.classList.contains("video-container")) {
            cursorDot.innerHTML = "Open";
        } else if (element.classList.contains("details--open")) {
            cursorDot.innerHTML = "Close";
        }
    });

    cursorOutline.addEventListener("mouseover", function () {
        cursorOutline.style.border = "2px solid hsla(340, 74%, 40%, 1)";
    });

    element.addEventListener("mouseout", function () {
        cursorDot.style.width = "14px";
        cursorDot.style.height = "14px";
        cursorDot.innerHTML = "";
        setTimeout(() => {
            cursorDot.style.backgroundColor = "hsla(340, 74%, 40%, 1)";
            cursorOutline.style.border = "2px solid hsla(224, 41%, 40%, 1)";
        }, 100);
    });
});