// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const path = require('node:path')
const MqttClient = require('./logic/mqttclient');
const Status = require('./model/status');

const client = new MqttClient();

let currentStatus = Status.getAllStatus()[0]

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

const createTray = () => {
  
  const defaultStatus = Status.getAllStatusMap().get('green')
  tray = new Tray(defaultStatus.getIconPath())
  let menuItems = Status.getAllStatus().map(status => {
    return {
      label: status.name,
      icon: nativeImage.createFromPath(status.getIconPath()),
      type: 'radio',
      click: () => handleClickTay(status)
    }
  })

  menuItems.push({type: 'separator'})
  menuItems.push({label: 'Quit', role: 'quit'})

  const contextMenu = Menu.buildFromTemplate(menuItems)
  
  // Set default to first status
  contextMenu.items[0].checked = true
  tray.setContextMenu(contextMenu)

  // Removed because only working on macOS
  //tray.setTitle("AAN")

  return tray
}


let tray = null

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  
  createWindow()
  tray = createTray()
  
  client.connect();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  //Resend status every 10 seconds
  setInterval(resendStatus, 10000)

}
)

function resendStatus() {
  client.publish('70419_1', String(currentStatus.code + 10));
}

function handleClickTay(status) {
  client.publish('70419_1', String(status.code + 10))
  tray.setImage(status.getIconPath())
  currentStatus = status
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on ('will-quit', () => {
  client.disconnect();
})