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
    const maxWidth = screenWidth; // Giảm kích thước tối đa của pop-up
    const maxHeight = screenHeight;
    const x = Math.floor(Math.random() * (maxWidth < 0 ? 0 : maxWidth));
    const y = Math.floor(Math.random() * (maxHeight < 0 ? 0 : maxHeight));

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 25000);
}

function showLoadingScreen() {
    const loadingContainer = document.createElement("div");
    loadingContainer.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9998; display: flex; flex-direction: column; justify-content: center; align-items: center;";
    
    const spinner = document.createElement("div");
    spinner.style.cssText = "width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid #fc72a7ff; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 30px;";
    
    const energyBarContainer = document.createElement("div");
    energyBarContainer.style.cssText = "width: 300px; height: 20px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; position: relative;";
    
    const energyBar = document.createElement("div");
    energyBar.style.cssText = "width: 0%; height: 100%; background: linear-gradient(90deg, #ff6b9d, #fc72a7ff); border-radius: 10px; transition: width 0.1s ease;";
    
    const spinStyle = document.createElement("style");
    spinStyle.textContent = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
    document.head.appendChild(spinStyle);
    
    energyBarContainer.appendChild(energyBar);
    loadingContainer.appendChild(spinner);
    loadingContainer.appendChild(energyBarContainer);
    document.body.appendChild(loadingContainer);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 100 / 150; // 15s = 150 * 100ms
        energyBar.style.width = Math.min(progress, 100) + "%";
        
        if (progress >= 100) {
            clearInterval(interval);
            loadingContainer.remove();
            showSwipeGuide();
        }
    }, 100);
}

function showSwipeGuide() {
    const guide = document.createElement("div");
    guide.innerHTML = "<div class='arrow'></div><div class='arrow'></div><div class='arrow'></div>";
    guide.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; display: flex; gap: 15px; align-items: center;";
    
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideLeft {
            0% { opacity: 0.3; transform: translateX(0px); }
            50% { opacity: 1; transform: translateX(-10px); }
            100% { opacity: 0.3; transform: translateX(-20px); }
        }
        @-webkit-keyframes slideLeft {
            0% { opacity: 0.3; -webkit-transform: translateX(0px); }
            50% { opacity: 1; -webkit-transform: translateX(-10px); }
            100% { opacity: 0.3; -webkit-transform: translateX(-20px); }
        }
        .arrow {
            width: 0;
            height: 0;
            border-top: 25px solid transparent;
            border-bottom: 25px solid transparent;
            border-right: 40px solid #fc72a7ff;
            animation: slideLeft 1.2s infinite ease-in-out;
            -webkit-animation: slideLeft 1.2s infinite ease-in-out;
        }
        .arrow:nth-child(1) {
            animation-delay: 0s;
            -webkit-animation-delay: 0s;
        }
        .arrow:nth-child(2) {
            animation-delay: 0.2s;
            -webkit-animation-delay: 0.2s;
        }
        .arrow:nth-child(3) {
            animation-delay: 0.4s;
            -webkit-animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    guide.className = "swipe-guide";
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
    // enterFullscreen();
    startPopups();
    
    // Hiển thị loading screen sau 1s, sau đó showSwipeGuide sau 15s
    setTimeout(() => {
        showLoadingScreen();
    }, 5000);
    
    document.removeEventListener("click", startExperience);
});