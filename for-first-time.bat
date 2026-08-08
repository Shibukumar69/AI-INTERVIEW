@echo off
title AETHER COHORT // First Time Setup
cls
echo ===================================================================
echo   📦 AETHER COHORT // Initial Setup & Dependency Installation
echo ===================================================================
echo.
echo [1/2] Installing Backend Dependencies...
cd /d %~dp0backend
call npm install
echo.
echo [2/2] Installing Frontend Dependencies...
cd /d %~dp0frontend
call npm install
echo.
echo ===================================================================
echo   ✅ Setup Complete! Now starting the application...
echo ===================================================================
cd /d %~dp0
call start-all.bat