const startDialog = document.getElementById('startDialog');
const gif = document.getElementById('gif');
const question = document.getElementById('question');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const bgMusic = document.getElementById('bg-music0');
const sound1 = document.getElementById('bg-music1');
const sound2 = document.getElementById('bg-music2');
const sound3 = document.getElementById('bg-music3');
const sound4 = document.getElementById('bg-music4');
const sound5 = document.getElementById('bg-music5');

bgMusic.loop = true;

// Ẩn nội dung chính ban đầu
gif.style.display = 'none';
question.style.display = 'none';
noBtn.style.display = 'none';
yesBtn.style.display = 'none';

// Kiểm tra và tự động bật nhạc nếu chuyển từ trang đầu
if (sessionStorage.getItem('autoPlayMusic') === 'true') {
  sessionStorage.removeItem('autoPlayMusic'); // Xóa flag sau khi sử dụng
  startDialog.style.display = 'block';
  gif.style.display = 'none';
  question.style.display = 'none';
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  bgMusic.play().catch(error => {
    console.log('Lỗi phát nhạc:', error);
  });
}

// Xử lý click vào dialog
startDialog.addEventListener('click', () => {
  startDialog.style.display = 'none';
  gif.style.display = 'block';
  question.style.display = 'block';
  noBtn.style.display = 'inline-block';
  yesBtn.style.display = 'inline-block';
  bgMusic.play();
  enterFullscreen();
});

const content = [
  { gif: 'https://i.pinimg.com/originals/7a/ef/73/7aef734a86dce4dc206976d4f0586f2c.gif', message: 'Em chắc chứ? 😢' },
  { gif: 'https://i.pinimg.com/originals/c8/07/e2/c807e26d8aed392f172f0bf441f60626.gif', message: 'Thử nghĩ lại nha 🥺' },
  { gif: 'https://i.pinimg.com/originals/0d/ac/7e/0dac7e14010362ff081e2167be218341.gif', message: 'Đừng mà, cho anh cơ hội đi 💔' },
  { gif: 'https://i.pinimg.com/originals/88/e7/86/88e786492cc527584feee199936813dd.gif', message: 'Thiệt luôn đó hả? 😭' },
  { gif: 'https://i.pinimg.com/originals/82/be/ae/82beaeb21c686871437f88bbc1593288.gif', message: 'Một lần nữa thôi, năn nỉ đó 😞' },
  { gif: 'https://i.pinimg.com/originals/97/91/de/9791de11497556c4a5e800427c48fc47.gif', message: 'Anh buồn đó nha... 😔' },
];

let clickCount = 0;

noBtn.addEventListener('click', () => {
  const index = clickCount % content.length;
  gif.src = content[index].gif;
  question.textContent = content[index].message;
  clickCount++;

  if (clickCount === 3) {
    noBtn.textContent = 'Bấm Có đi 😭';
  } else if (clickCount === 7) {
    noBtn.textContent = 'Năn nỉ đó bấm Có đi 😭';
  }

  const sounds = [sound1, sound2, sound3];
  sounds[(clickCount - 1) % 3].play();

  const emoji = document.createElement('div');
  emoji.textContent = '😭';
  emoji.classList.add('emoji-effect');

  const rect = noBtn.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  emoji.style.left = `${rect.left + rect.width / 2}px`;
  emoji.style.top = `${rect.top + scrollY}px`;

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 1000);

  // Thêm class shake
  noBtn.classList.add('shake');

  // Gỡ class sau khi animation kết thúc để có thể lặp lại lần sau
  setTimeout(() => noBtn.classList.remove('shake'), 600);

});

yesBtn.addEventListener('click', () => {
  // Gửi thông báo đến Telegram
  fetch('https://api.telegram.org/bot8446989308:AAGVoLIldSggR79-BI7F9_P2AF3ElGq1pkQ/sendmessage?chat_id=-5051147343&text=Chiiu said: Anh đồng ý làm chồng em nhé!%0A👉👈')
    .catch(error => console.log('Lỗi gửi Telegram:', error));
  
  bgMusic.pause(); // Dừng nhạc nền
  question.textContent = 'Anh biết mà! Chúc mừng Chiiu đã có anh ❤️';
  gif.src = 'https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif';
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
  explodeHearts();

  // --- PHÁT ÂM THANH ---
  // Reset trạng thái sound5 trước khi phát lại
  sound5.pause();
  sound5.currentTime = 0;

  // Giảm âm lượng sound4 xuống để làm nền
  sound4.volume = 0.1; // Nền nhẹ hơn
  sound4.currentTime = 101.0;
  sound4.play();

  // Phát sound5 (giọng chính)
  sound5.play();

  // Khi sound5 kết thúc -> trả âm lượng sound4 về bình thường
  const onSound5End = () => {
    sound4.volume = 1.0;
    sound4.loop = true; // Tiếp tục lặp sound4
    sound5.removeEventListener('ended', onSound5End);
  };

  sound5.addEventListener('ended', onSound5End);
});

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

function explodeHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    const icons = ['❤️', '💖'];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.classList.add('emoji-effect');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`; // Không cộng scrollY nữa
    heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  setTimeout(explodeHearts, 500);
}
