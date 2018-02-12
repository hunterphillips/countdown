'use strict'; 
const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');

let win = null;

function createWindow() {
   //create browser window
   win = new BrowserWindow({
      width: 500,
      height: 550,
      // transparent: true,
      frame: false,
      // alwaysOnTop: true
   });

   //load index.html
   win.loadURL(`file://${__dirname}/index.html`);

   //open devtools
   win.webContents.openDevTools();

   win.on('closed', () => {
      win = null;
   });
}

//run create window function
app.on('ready', createWindow);

//quit when all windows closed
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});



