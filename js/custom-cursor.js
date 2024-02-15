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

document.querySelectorAll(".video-container, .details__vid").forEach(element => {
    element.addEventListener("mouseover", function () {
        cursorDot.style.width = "64px";
        cursorDot.style.height = "64px";
        cursorDot.style.color = "white";
        cursorDot.style.backgroundColor = "hsla(340, 74%, 40%, 1);";
        if (element.classList.contains("video-container")) {
            cursorDot.innerHTML = "Open";
        } else if (element.classList.contains("details__vid")) {
            cursorDot.innerHTML = "Close";
        }
    });

    element.addEventListener("mouseout", function () {
        cursorDot.style.width = "14px";
        cursorDot.style.height = "14px";
        cursorDot.innerHTML = "";
        setTimeout(() => {
            cursorDot.style.backgroundColor = "hsla(322, 67%, 49%, 1)";
        }, 100);
    });
});


// const videoContainers = document.querySelectorAll('.video-container');
// const cursorElements = document.querySelectorAll('.cursor-white-circle, .cursor-white-outline, .cursor-dot, .cursor-outline');

// videoContainers.forEach(videoContainer => {
//     videoContainer.addEventListener('mouseover', () => {
//         cursorElements.forEach(element => {
//             element.style.opacity = '0';
//             element.style.pointerEvents = 'none';
//         });
//     });

//     videoContainer.addEventListener('mouseout', () => {
//         cursorElements.forEach(element => {
//             element.style.opacity = '';
//             element.style.pointerEvents = '';
//         });
//     });
// });
