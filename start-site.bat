@echo off
cd /d "%~dp0"
echo Starting Travel Emoji Album at http://127.0.0.1:5173/
echo Keep this window open while you are viewing or editing the website.
echo.
npm run dev:local
echo.
echo The website server has stopped. Press any key to close this window.
pause >nul
