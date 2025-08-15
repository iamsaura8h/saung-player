// ui/script.js
const selectFileBtn = document.getElementById("selectFile");
const titleElement = document.querySelector("h2");
const audioPlayer = document.getElementById('audioPlayer');

selectFileBtn.onclick = async () => {
    const file = await window.electronAPI.selectFile();

    if (!file.canceled && file.filePaths.length > 0) {
        const fullPath = file.filePaths[0];
        const fileName = fullPath.split("\\").pop(); // Extract filename only

         // Update <h2> with song name
        titleElement.textContent = fileName;

        // Load and play the song
        audioPlayer.src = `file:///${fullPath.replace(/\\/g, "/")}`;
        audioPlayer.style.display="block";
        audioPlayer.play().catch(error => console.log("Playback Failed:",err));

    } else {
        titleElement.textContent = "No file selected";
        audioPlayer.style.display = "none";
        audioPlayer.pause();
    }   

};
