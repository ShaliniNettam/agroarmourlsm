@echo off
echo Starting Veterinary GPS Tracking System...
echo.

cd /d "%~dp0"

echo Installing dependencies...
call npm install express cors
echo.

echo Starting backend server...
start "Vet Backend" cmd /k "node vet-backend.js"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo Veterinary GPS Tracking System Started!
echo ========================================
echo Backend: http://localhost:5003
echo Frontend: http://localhost:5003/veterinary-gps-working.html
echo.
echo Press any key to open in browser...
pause >nul

start http://localhost:5003/veterinary-gps-working.html
