@echo off
title PARAR E-CURRICULO - ARTHUR PEDRO
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop.ps1"
timeout /t 2 /nobreak >nul

