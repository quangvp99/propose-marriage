const messages = ["I Love You !"];
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

function showSwipeGuide() {
    const guide = document.createElement("div");
    guide.innerHTML = "<span>◀</span><span>◀</span><span>◀</span><span>◀</span><span>◀</span>";
    guide.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; z-index: 9999; display: flex; gap: 10px;";
    
    const style = document.createElement("style");
    style.textContent = "@keyframes glow { 0% { color: rgba(255,255,255,0.3); } 100% { color: #fc72a7ff; } } .guide span:nth-child(1) { animation: glow 0.6s infinite alternate 0.4s; } .guide span:nth-child(2) { animation: glow 0.6s infinite alternate 0.3s; } .guide span:nth-child(3) { animation: glow 0.6s infinite alternate 0.2s; } .guide span:nth-child(4) { animation: glow 0.6s infinite alternate 0.1s; } .guide span:nth-child(5) { animation: glow 0.6s infinite alternate; }";
    document.head.appendChild(style);
    guide.className = "guide";
    document.body.appendChild(guide);
    
    setupSwipeDetection();
}

function setupSwipeDetection() {
    let startX = 0;
    
    document.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 100) {
            navigateToSecondPage();
        }
    });
    
    // Hỗ trợ chuột cho desktop
    document.addEventListener("mousedown", (e) => {
        startX = e.clientX;
    });
    
    document.addEventListener("mouseup", (e) => {
        if (startX - e.clientX > 100) {
            navigateToSecondPage();
        }
    });
}

function navigateToSecondPage() {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; top: 0; left: 100%; width: 100%; height: 100%; background: #F8C7DA; z-index: 10000; transition: left 0.5s ease;";
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.left = "0";
    }, 10);
    
    setTimeout(() => {
        // Lưu trạng thái để bật nhạc ở trang tiếp theo
        sessionStorage.setItem('autoPlayMusic', 'true');
        window.location.href = "second-page.html";
    }, 500);
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
    
    // Hiển thị hướng dẫn vuốt sau 15s
    setTimeout(() => {
        showSwipeGuide();
    }, 1000);
    
    document.removeEventListener("click", startExperience);
});