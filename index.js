"use strict";
const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

let win = null;

function createWindow() {
	//create browser window
	win = new BrowserWindow({
		width: 550,
		height: 625,
		minWidth: 375,
		minHeight: 175,
		transparent: true,
		frame: false,
		hasShadow: true,
		alwaysOnTop: true,
		// titleBarStyle: "customButtonsOnHover",
		// 09/08/20 -- Doesnt work without?
		webPreferences: {
			nodeIntegration: true,
		},
	});

	//load index.html
	win.loadURL(`file://${__dirname}/index.html`);

	//open devtools
	// win.webContents.openDevTools();

	win.on("close", (event) => {
		if (app.quitting) {
			win = null;
		} else {
			event.preventDefault();
			win.hide();
		}
	});
}

//run create window function
app.whenReady().then(createWindow);

//quit when all windows closed
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	win.show();
});
app.on("before-quit", () => (app.quitting = true));
