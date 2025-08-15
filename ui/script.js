const selectFileBtn = document.getElementById("selectFile");
const titleElement = document.getElementById("songTitle");
const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");

// Load last song on app start
(async () => {
    const lastSong = await window.electronAPI.loadLastSong();
    if (lastSong) {
        const fileName = lastSong.split("\\").pop();
        titleElement.textContent = fileName;
        audioPlayer.src = `file:///${lastSong.replace(/\\/g, "/")}`;
        audioPlayer.style.display = "block";
    }
})();

selectFileBtn.onclick = async () => {
    const file = await window.electronAPI.selectFile();

    if (!file.canceled && file.filePaths.length > 0) {
        const fullPath = file.filePaths[0];
        const fileName = fullPath.split("\\").pop();

        // Update title and album art
        titleElement.textContent = fileName;
        albumArt.src = "./images/album art.jpeg"; // You can later use album art extraction

        // Load and play
        audioPlayer.src = `file:///${fullPath.replace(/\\/g, "/")}`;
        audioPlayer.style.display = "block";
        audioPlayer.play().catch(err => console.error("Playback failed:", err));

        // Save last song
        window.electronAPI.saveLastSong(fullPath);
    } else {
        titleElement.textContent = "No file selected";
        audioPlayer.style.display = "none";
    }
};
