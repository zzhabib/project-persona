@echo off
taskkill /F /IM node.exe
start cmd /k "cd front-end && npm run start:legacy"
start cmd /k "cd back-end && npm run start"