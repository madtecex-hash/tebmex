@echo off
title Servidor Web - Tienda
echo ==========================================
echo    INICIANDO PAGINA WEB
echo    Por favor espera unos segundos...
echo ==========================================
echo.
cd /d "%~dp0"
node scripts\start.mjs
pause
