const messages = ["I Miss You !"];
const colors = ["white"];
const dialog = document.getElementById("startDialog");
const audio = document.getElementById("backgroundMusic");

function createPopup() {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = messages[Math.floor(Math.random() * messages.length)];
    popup.style.color = colors[Math.floor(Math.random() * colors.length)];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Điều chỉnh giới hạn vị trí để pop-up không tràn ra ngoài
    const maxWidth = screenWidth - 150; // Giảm kích thước tối đa của pop-up
    const maxHeight = screenHeight - 50;
    const x = Math.floor(Math.random() * (maxWidth < 0 ? 0 : maxWidth));
    const y = Math.floor(Math.random() * (maxHeight < 0 ? 0 : maxHeight));

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 25000);
}

function startPopups() {
    setInterval(() => {
        createPopup();
    }, 30);
}

function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

document.addEventListener("click", function startExperience() {
    dialog.style.display = "none";
    audio.play().catch(error => {
        console.log("Lỗi phát nhạc:", error);
    });
    enterFullscreen();
    startPopups();
    document.removeEventListener("click", startExperience);
});