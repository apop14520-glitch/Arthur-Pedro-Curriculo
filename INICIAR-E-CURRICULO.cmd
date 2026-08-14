@echo off
title E-CURRICULO - ARTHUR PEDRO
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1"
if errorlevel 1 (
  echo.
  echo Nao foi possivel iniciar o E-Curriculo.
  echo Consulte a pasta logs para mais detalhes.
  pause
)

