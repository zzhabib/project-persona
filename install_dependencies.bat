@echo off
taskkill /F /IM node.exe
echo Installing dependencies for the front-end...
cd front-end
call npm install
cd ..

echo Installing dependencies for the back-end...
cd back-end
call npm install
cd ..

echo Dependencies installed for both front-end and back-end.

