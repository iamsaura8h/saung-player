// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow = null;
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'ui', 'index.html'));

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
}

// File picker
ipcMain.handle('dialog:selectFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        filters: [
            { name: 'Audio/Music Files', extensions: ['mp3', 'wav', 'flac', 'ogg'] }
        ]
    });
    return result;
});

// Save last song
ipcMain.on('save:lastSong', (event, songPath) => {
    fs.writeFileSync(settingsPath, JSON.stringify({ lastSong: songPath }), 'utf-8');
});

// Load last song
ipcMain.handle('load:lastSong', () => {
    if (fs.existsSync(settingsPath)) {
        const data = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
        return data.lastSong || null;
    }
    return null;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
