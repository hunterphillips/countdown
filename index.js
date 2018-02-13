'use strict'; 
const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');

let win = null;

function createWindow() {
   //create browser window
   win = new BrowserWindow({
      width: 550,
      height: 580,
      'minWidth': 441,
      'minHeight': 165,
      transparent: true,
      frame: false,
      hasShadow: false
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



