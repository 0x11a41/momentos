const TOTAL_VIDEOS = 8;

const videoA = document.getElementById('videoA');
const videoB = document.getElementById('videoB');

let current = videoA;
let next = videoB;

const polaroid = document.getElementById('polaroid');

let startX = 0;
let startY = 0;

// Load a random video into "next"
function loadRandomVideo() {
	const n = Math.floor(Math.random() * TOTAL_VIDEOS) + 1;
	next.src = `assets/${n}.mp4`;
	next.load();
}

// Switch videos smoothly (crossfade)
function switchVideos() {
	current.classList.remove('active');
	next.classList.add('active');
	
	// swap references
	[current, next] = [next, current];
}

// When metadata is ready → start playback + switch
[videoA, videoB].forEach(video => {
	video.addEventListener('loadedmetadata', () => {
		try {
			const maxStart = Math.max(0, video.duration - 5);
			video.currentTime = Math.random() * maxStart;
		} catch (e) {}
			
		video.play().catch(() => {});
			
		if (video === next) {
			switchVideos();
		}
	});
});
			
// When current video ends → preload next
videoA.addEventListener('ended', loadRandomVideo);
videoB.addEventListener('ended', loadRandomVideo);

// Tap fallback for autoplay restrictions
document.addEventListener('click', () => {
  videoA.play().catch(() => {});
  videoB.play().catch(() => {});
}, { once: true });

// Initial setup
window.addEventListener('load', () => {
	videoA.classList.add('active'); // first video visible
	loadRandomVideo();
});
