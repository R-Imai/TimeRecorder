"use strict";

const electron = require("electron");
const iconimage = electron.nativeImage.createFromPath(`${__dirname}/logo.png`)
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

if (process.platform == 'darwin') {
  app.dock.setIcon(iconimage)
}

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
      width: 700,
      height: 610,
      'transparent': true,
      'frame': false,
      "resizable": false
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (process.platform != 'darwin') {
    mainWindow.setIcon(iconimage)
  }

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
