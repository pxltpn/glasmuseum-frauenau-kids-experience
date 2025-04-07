const { app, BrowserWindow, globalShortcut, screen } = require('electron');

function createWindows() {
  const displays = screen.getAllDisplays();

  if (displays.length < 2) {
    console.error('You need at least two displays connected.');
    app.quit();
    return;
  }

  // Display 1 → shows "/"
  const mainDisplay = displays[0];
  const win1 = new BrowserWindow({
    x: mainDisplay.bounds.x,
    y: mainDisplay.bounds.y,
    width: mainDisplay.bounds.width,
    height: mainDisplay.bounds.height,
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  win1.loadURL('https://www.youtube.com/');

  // Display 2 → shows "/screen2"
  const secondDisplay = displays[1];
  const win2 = new BrowserWindow({
    x: secondDisplay.bounds.x,
    y: secondDisplay.bounds.y,
    width: secondDisplay.bounds.width,
    height: secondDisplay.bounds.height,
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  win2.loadURL('https://www.youtube.com/watch?v=-uMGMmqMleM');

  // Optional: same quit shortcut applies to both
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
