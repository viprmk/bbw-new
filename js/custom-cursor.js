const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const cursorWhiteCircle = document.querySelector("[data-cursor-white-circle]");
const cursorWhiteOutline = document.querySelector("[data-cursor-white-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 600, fill: "forwards" });

    cursorWhiteCircle.style.left = `${posX}px`;
    cursorWhiteCircle.style.top = `${posY}px`;

    cursorWhiteOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 600, fill: "forwards" });

});

const videoContainers = document.querySelectorAll('.video-container');
const cursorElements = document.querySelectorAll('.cursor-white-circle, .cursor-white-outline, .cursor-dot, .cursor-outline');

videoContainers.forEach(videoContainer => {
    videoContainer.addEventListener('mouseover', () => {
        cursorElements.forEach(element => {
            element.style.opacity = '0';
            element.style.pointerEvents = 'none';
        });
    });

    videoContainer.addEventListener('mouseout', () => {
        cursorElements.forEach(element => {
            element.style.opacity = '';
            element.style.pointerEvents = '';
        });
    });
});
