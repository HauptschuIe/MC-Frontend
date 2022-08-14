const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const path = require('path');
const { getPositionForDisplayId } = require('../src/helper-classes/screen-config-reader');

// TODO: close entire app if of analysis window is closed
var analysisBrowserWindows = [];
var testing = [];
var mainWindow;

function createWindows() {
  // We cannot require the screen module until the app is ready.
  const { screen } = require('electron')

  // Create a main window that starts maximized on the primary display
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  // TODO: enable web security and add middleware to enable CORS
  mainWindow = new BrowserWindow({ width, height, frame: false, fullscreen: true, show: false, webPreferences: { 
    webSecurity: false, nodeIntegration: true , preload: path.resolve(rootPath(), './preload.js')}
  })
  mainWindow.loadURL(rootPath()+'/../dist/index.html')
  //mainWindow.loadURL('http://localhost:3000')
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.on('closed', _ => {
    app.quit();
  });


  // TODO: pull all screens, put graph windows on all secondary screens
  const displays = screen.getAllDisplays()
  
  const externalDisplays = displays.filter((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  
  externalDisplays.forEach(display => {
    testing.push({browserWindowId: display.id, displaybounfs: display.bounds});
  });
  
  externalDisplays.forEach(display => {
    
    win = new BrowserWindow({
    // TODO: enable web security and add middleware to enable CORS
    frame: false, 
    fullscreen: true, 
    show: false,
    x: display.bounds.x + 0,
    y: display.bounds.y + 0,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.resolve(rootPath(), './preload.js'),
    }
    })
    win.maximize();
    win.loadURL(rootPath()+'/../dist/secondary-index.html');
    //TODO: for each screen, get positions for id; if returned position is null, do not create a browser window for that screen
    analysisBrowserWindows.push({browserWindowId: win.id, displayPosition: getPositionForDisplayId(display.id)});

    win.on('closed', _ => {
      app.quit();
    });
  });
 /*
  win = new BrowserWindow({
    // TODO: enable web security and add middleware to enable CORS
    //x: bounds.x + 0,
    //y: bounds.y + 0,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.resolve(rootPath(), './preload.js'),
  }
  })

  win.loadURL(rootPath()+'/../dist/secondary-index.html');
  win.webContents.openDevTools();
  console.log("***************ID: "+primaryDisplay.id);
  console.log("+++++++++++++++Position" + getPositionForDisplayId("2"));
  //TODO: for each screen, get positions for id; if returned position is null, do not create a browser window for that screen
  analysisBrowserWindows.push({browserWindowId: win.id, displayPosition: getPositionForDisplayId("2")});
  console.log("+++++++++++++++Position" + win.id);

  win.on('closed', _ => {
    app.quit();
  });
*/
}

function rootPath() {
  return __dirname;
} 

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindows)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', () => {
  ipcMain.handle('getAnalysisBrowserWindows', async (event, arg) => {
    return analysisBrowserWindows;
  });

  ipcMain.handle('getIdDisplays', async (event, arg) => {
    return testing;
  });

  ipcMain.handle('panelAddSend', async (event, arg) => {
    console.log("id of browser window: "+arg.browserWindow);
    var targetWindow = BrowserWindow.fromId(arg.browserWindow);
    targetWindow.webContents.send('panelAddToWindow', arg );
    return "sent "+arg.browserWindow + ", " + arg.visualization.internalId + " to window.";
  });

  ipcMain.handle('panelRemoveSend', async (event, arg) => {
    console.log("id of browser window: "+arg.browserWindow);
    var targetWindow = BrowserWindow.fromId(arg.browserWindow);
    targetWindow.webContents.send('panelRemoveFromWindow', arg );
    return "removed "+arg.browserWindow + ", " + arg.visualizationInternalId + " from window.";
  });

  ipcMain.handle('filtersUpdated', async (event, arg) => {
    {analysisBrowserWindows.map((d, idx, { length }) => {
      var targetWindow = BrowserWindow.fromId(d.browserWindowId);
      targetWindow.webContents.send('updatedFilterBroadcast', arg );
    })}
    return "posted updated filter message.";
  });

  ipcMain.handle('filterRequest', async (event, arg) => {
      mainWindow.webContents.send('triggerFilterBroadcast');
    return "triggered filter broadcast.";
  });

  ipcMain.handle('close', async (event, arg) => {
    app.quit();
  });
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.