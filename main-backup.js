const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  // Create a new BrowserWindow with kiosk settings
  const win = new BrowserWindow({
    fullscreen: true, // Open in full screen
    kiosk: true, // Prevent minimizing, closing, etc.
    webPreferences: {
      nodeIntegration: false, // Disable Node.js integration for security
    },
  });

  // Load your Next.js app (make sure the app is running locally)
  win.loadURL('http://localhost:3000'); // or 'http://localhost:3000/page1'

  // Register a keyboard shortcut to quit the app
  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });

  // Optional: handle multiple windows for kiosk mode
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
