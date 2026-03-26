@echo off
title Farm Management System

echo ========================================
echo    Farm Management System Startup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed.
    echo Please install Node.js from https://nodejs.org
    echo Download the LTS version and restart your terminal after installation.
    echo.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
)
echo ✅ Backend dependencies installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
)
echo ✅ Frontend dependencies installed

echo.
echo 🌟 Starting servers...
echo    Backend will run on: http://localhost:5002
echo    Frontend will run on: http://localhost:8083
echo    GPS Tracking: http://localhost:8083/gps-tracking
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in background
start "Backend Server" cmd /c "cd ..\backend && npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
start "Frontend Server" cmd /c "npm run dev"

echo.
echo ✅ Both servers are starting...
echo Backend: http://localhost:5002
echo Frontend: http://localhost:8083
echo GPS Tracking: http://localhost:8083/gps-tracking
echo.
echo Close this window to stop the servers (or press Ctrl+C)
pause
