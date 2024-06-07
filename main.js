// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const path = require('node:path')


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

let tray = null



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  let iconPathGreen = path.join(__dirname , 'assets','green.png')
  let iconPathYellow = path.join(__dirname , 'assets','yellow.png')
  let iconPathRed = path.join(__dirname , 'assets','red.png')
  let iconPathWhite = path.join(__dirname , 'assets','white.png')
  let iconPathPurple = path.join(__dirname , 'assets','purple.png')
  
  tray = new Tray(iconPathGreen)
  const contextMenu = Menu.buildFromTemplate([
    { icon: nativeImage.createFromPath(iconPathGreen), label: 'Verfügbar', type: 'radio', click: () => {tray.setImage(iconPathGreen)} },
    { icon: nativeImage.createFromPath(iconPathYellow),label: 'Abwesend', type: 'radio', click: () => {tray.setImage(iconPathYellow)} },
    { icon: nativeImage.createFromPath(iconPathRed),label: 'Bitte nicht stören/Beschäftigt', type: 'radio', click: () => {tray.setImage(iconPathRed)} },
    { icon: nativeImage.createFromPath(iconPathPurple),label: 'Kaffeepause', type: 'radio', click: () => {tray.setImage(iconPathPurple)} },
    { icon: nativeImage.createFromPath(iconPathWhite),label: 'kein Status', type: 'radio', click: () => {tray.setImage(iconPathWhite)} },
  ])

  // Make a change to the context menu
  contextMenu.items[0].checked = true

  // Call this again for Linux because we modified the context menu
  tray.setToolTip('This is my application.')
  //tray.setTitle("AAN")
  tray.setContextMenu(contextMenu)

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})