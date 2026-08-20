@echo off
setlocal
set "NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
"%NODE%" "%~dp0capture.js" session personal
pause
