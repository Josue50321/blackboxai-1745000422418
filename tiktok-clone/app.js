const videos = document.querySelectorAll('video');
const likeButtons = document.querySelectorAll('.like-btn');

function pauseAllVideosExcept(currentIndex) {
  videos.forEach((video, index) => {
    if (index !== currentIndex) {
      video.pause();
    }
  });
}

function playVideo(index) {
  videos[index].play();
  pauseAllVideosExcept(index);
}

function handleScroll() {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  videos.forEach((video, index) => {
    const videoTop = video.parentElement.offsetTop;
    const videoBottom = videoTop + video.parentElement.offsetHeight;

    if (scrollPosition >= videoTop - viewportHeight / 2 && scrollPosition < videoBottom - viewportHeight / 2) {
      playVideo(index);
    } else {
      video.pause();
    }
  });
}

function toggleLike(button) {
  button.classList.toggle('text-red-500');
  button.classList.toggle('text-white');
}

window.addEventListener('scroll', handleScroll);

// Initial play of the first video
if (videos.length > 0) {
  videos[0].play();
}

likeButtons.forEach((btn) => {
  btn.addEventListener('click', () => toggleLike(btn));
});

// Optional: Add swipe support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

function handleGesture() {
  if (touchEndY < touchStartY - 50) {
    // Swipe up
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
  if (touchEndY > touchStartY + 50) {
    // Swipe down
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  }
}

window.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});
