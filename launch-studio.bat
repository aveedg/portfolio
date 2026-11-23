@echo off
setlocal
cd /d "%~dp0"

REM Try user specific Python path first
if exist "%LOCALAPPDATA%\Python\bin\python.exe" (
    start "" "%LOCALAPPDATA%\Python\bin\python.exe" "%~dp0update-projects.py"
    exit /b
)

REM Try py launcher
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" py "%~dp0update-projects.py"
    exit /b
)

REM Try python in PATH
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" python "%~dp0update-projects.py"
    exit /b
)

echo Python was not found in your standard PATH or %LOCALAPPDATA%\Python\bin.
echo Please run: C:\Users\sheer\AppData\Local\Python\bin\python.exe update-projects.py
pause
