// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFile: () => ipcRenderer.invoke('dialog:selectFile'),
    saveLastSong: (path) => ipcRenderer.send('save:lastSong', path),
    loadLastSong: () => ipcRenderer.invoke('load:lastSong')
});
