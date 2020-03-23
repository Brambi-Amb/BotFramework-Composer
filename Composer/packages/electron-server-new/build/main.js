'use strict';
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const electron_1 = require('electron');
function main() {
  console.log('Starting electron app');
  // Create the browser window.
  const win = new electron_1.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  // and load the index.html of the app.
  const CONTENT_URL = 'http://localhost:3000/home';
  console.log('Loading project from: ', CONTENT_URL);
  win.loadURL(CONTENT_URL);
  win.maximize();
  win.show();
  win.once('ready-to-show', () => {
    // only show if the main window still hasn't loaded
    if (!win.isVisible()) {
      win.show();
    } else {
      win.hide();
    }
  });
}
function run() {
  return __awaiter(this, void 0, void 0, function*() {
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        electron_1.app.quit();
      }
    });
    electron_1.app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      main();
      // if (BrowserWindow.getAllWindows().length === 0) {
      //   main();
      // }
    });
    console.log('Waiting for app to be ready...');
    yield electron_1.app.whenReady();
    console.log('App ready');
    console.log('Creating temp store');
    // await createTempStore();
    // console.log(`Composer settings: ${JSON.stringify(settings, null, ' ')}`);
    console.log('Starting server');
    console.log('Beginning app start up');
    main();
  });
}
run()
  .catch(e => {
    console.error(e);
    electron_1.app.quit();
  })
  .then(() => {
    console.log('Run completed');
  });
//# sourceMappingURL=main.js.map
