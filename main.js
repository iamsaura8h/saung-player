let {app , BrowserWindow } = require('electron')

// main window variable this will hold the reference to the main window
let mainWindow = null;

// create the main window
// this function is called when the app is ready
let createWindow = () => { 
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences : {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    mainWindow.loadFile(__dirname + 'ui/index.html');  

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
}

// when app is ready, create the main window
app.on('ready', createWindow);

// when all windows are closed, close the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});