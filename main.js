// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // secure preload
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'ui', 'index.html'));

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
}

// Handle file picker from renderer
ipcMain.handle('dialog:selectFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        filters: [
            { name: 'Audio/Music Files', extensions: ['mp3', 'wav', 'flac', 'ogg'] }
        ]
    });
    return result;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
