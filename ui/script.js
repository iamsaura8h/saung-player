// ui/script.js
const selectFileBtn = document.getElementById("selectFile");
const titleElement = document.querySelector("h2");

selectFileBtn.onclick = async () => {
    const file = await window.electronAPI.selectFile();

    if (!file.canceled && file.filePaths.length > 0) {
        const fullPath = file.filePaths[0];
        const fileName = fullPath.split("\\").pop(); // Extract filename only
        titleElement.textContent = fileName; // Update <h2> with song name
    } else {
        titleElement.textContent = "No file selected";
    }
};
