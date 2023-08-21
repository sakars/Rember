const Rember = require('./main.cjs');

const { app } = require('electron');

if(require('electron-squirrel-startup')) app.quit();

Rember(app);