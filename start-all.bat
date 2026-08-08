@echo off
title AETHER COHORT // Autonomous Technical Interview Engine
cls
echo ===================================================================
echo   🧠 AETHER COHORT // 31-Day Enterprise AI Interview Agent
echo ===================================================================
echo.
echo Starting Core Backend Server on Port 5000...
start cmd /k "title Backend Server && cd /d %~dp0backend && node server.js"

echo.
echo Starting Next-Gen Frontend on Port 5173...
start cmd /k "title Frontend Client && cd /d %~dp0frontend && npm run dev"

echo.
echo ===================================================================
echo   🚀 All systems active!
echo   📡 Backend API:    http://localhost:5000/api
echo   🌐 Web Interface:  http://localhost:5173
echo ===================================================================
timeout /t 5
