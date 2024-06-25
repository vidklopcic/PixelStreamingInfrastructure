@Rem Copyright Epic Games, Inc. All Rights Reserved.
@echo off

@Rem Set script directory as working directory.
pushd "%~dp0"
title Cirrus

@Rem Download certificates
echo Downloading certificates...
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://xr.gamelab.si/.cert/cert.pem', '..\..\certificates\client-cert.pem')"
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://xr.gamelab.si/.cert/key.pem', '..\..\certificates\client-key.pem')"

@Rem Echo local IP address
echo IP ADDRESS:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4 Address"') do echo %%a

@Rem Run setup to ensure we have node and cirrus installed.
call setup.bat %*

@Rem Move to cirrus directory.
pushd ..\..

@Rem Run node server and pass any argument along.
platform_scripts\cmd\node\node.exe cirrus %*

@Rem Pop cirrus directory.
popd

@Rem Pop script directory.
popd

pause