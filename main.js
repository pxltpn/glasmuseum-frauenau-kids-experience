const { app, BrowserWindow, globalShortcut, screen } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow(display, url) {
  const win = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // Load the development server during development
    win.loadURL(url);
  } else {
    // Load the local build in production
    win.loadFile(path.join(__dirname, 'out', 'index.html'));
  }

  return win;
}

function createWindows() {
  const displays = screen.getAllDisplays();

  if (displays.length === 1) {
    // Single display → show "/"
    createWindow(displays[0], 'http://localhost:3000/');
  } else if (displays.length >= 2) {
    // Display 1 → shows "/"
    createWindow(displays[0], 'http://localhost:3000/');

    // Display 2 → shows "/screen2"
    createWindow(displays[1], 'http://localhost:3000/screen2');
  }

  // Optional: same quit shortcut applies to all cases
  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindows();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindows();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
