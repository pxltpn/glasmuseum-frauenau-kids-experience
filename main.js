const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

function getKioskPage() {
  // Define the path to the config file in app storage
  const configPath = path.join(app.getPath('userData'), 'config.json');

  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config.page || '/';
  }

  // Default fallback
  return '/';
}

function createWindow() {
  const pagePath = getKioskPage();

  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Load the Next.js page (running locally or hosted)
  win.loadURL(`http://localhost:3000${pagePath}`);

  // Quit with Cmd/Ctrl + Shift + Q
  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
