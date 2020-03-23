// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { app, BrowserWindow } from 'electron';

function main() {
  console.log('Starting electron app');
  // Create the browser window.
  const win = new BrowserWindow({
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

async function run() {
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    main();
    // if (BrowserWindow.getAllWindows().length === 0) {
    //   main();
    // }
  });

  console.log('Waiting for app to be ready...');
  await app.whenReady();
  console.log('App ready');

  console.log('Creating temp store');
  // await createTempStore();
  // console.log(`Composer settings: ${JSON.stringify(settings, null, ' ')}`);

  console.log('Starting server');
  console.log('Beginning app start up');

  main();
}

run()
  .catch(e => {
    console.error(e);
    app.quit();
  })
  .then(() => {
    console.log('Run completed');
  });
