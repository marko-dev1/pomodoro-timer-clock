const { exec } = require('child_process');
const path = require('path');

// Start Electron directly
const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
const appPath = __dirname;

exec(`"${electronPath}" "${appPath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error('Error starting Pomodoro Timer:', error);
        return;
    }
    console.log(stdout);
});