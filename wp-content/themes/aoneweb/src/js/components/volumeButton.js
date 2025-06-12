const video = document.querySelector(".video");
const volumeBtn = document.querySelector(".volume-btn");
const btnIcon = document.querySelector(".volume-btn .icon");

if(volumeBtn) {
    function toggleVolume() {
        if (video.muted) {
            btnIcon.classList.remove("icon-volume-off");
            btnIcon.classList.add("icon-volume-on");
        } else {
            btnIcon.classList.remove("icon-volume-on");
            btnIcon.classList.add("icon-volume-off");
        }
        video.muted = !video.muted;
    }
    volumeBtn.addEventListener("click", toggleVolume);
}






