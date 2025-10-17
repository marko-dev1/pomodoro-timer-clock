How to Run Locally

Clone the repository

git clone https://github.com/marko-dev1/pomodoro-timer-clock.git
cd pomodoro-timer


Install dependencies

npm install


Run the app

npm start

 Build as a Desktop App

You can package and install the Pomodoro Timer as a desktop application using Electron Builder or Electron Packager.

Example with Electron Packager:
npm install -g electron-packager
electron-packager . PomodoroTimer --platform=win32 --arch=x64 --icon=icon.ico --out=dist --overwrite


This creates an executable file (e.g., PomodoroTimer.exe on Windows) in the dist/ folder that you can install and run just like any other app.

💡 Usage

Launch the Pomodoro Timer app.

Click Start to begin a focus session.

The timer will automatically switch to a break after each session.

Stay consistent and boost your productivity!