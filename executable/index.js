const { Rember } = require('rember-build');
const { app } = require('electron');
if (require('electron-squirrel-startup'))
    app.quit();
Rember(app);