const TOTAL_VIDEOS = 15;

const videoA = document.getElementById('videoA');
const videoB = document.getElementById('videoB');

let current = videoA;
let next = videoB;

const polaroid = document.getElementById('polaroid');

function loadRandomVideo() {
	const n = Math.floor(Math.random() * TOTAL_VIDEOS) + 1;
	next.src = `assets/${n}.mp4`;
	next.load();
}

function switchVideos() {
	current.classList.remove('active');
	next.classList.add('active');
	
	[current, next] = [next, current];
}

[videoA, videoB].forEach(video => {
	video.addEventListener('loadedmetadata', () => {
		video.play().catch(() => {});
			
		if (video === next) {
			switchVideos();
		}
	});
});
			
// When current video ends → preload next
videoA.addEventListener('ended', loadRandomVideo);
videoB.addEventListener('ended', loadRandomVideo);

document.addEventListener('click', () => {
  videoA.play().catch(() => {});
  videoB.play().catch(() => {});
}, { once: true });


window.addEventListener('load', () => {
	videoA.classList.add('active');
	loadRandomVideo();
});
