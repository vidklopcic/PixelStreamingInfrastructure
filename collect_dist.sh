#!/bin/bash

rm -rf LgmDist
mkdir LgmDist LgmDist/Frontend LgmDist/Signalling
cp -r Frontend/implementations/lgm_metahuman/dist/* LgmDist/Frontend/
cp -r LGMWebServer/* LgmDist/Signalling/
rm -rf LgmDist/Signalling/node_modules LgmDist/Signalling/dist LgmDist/Signalling/.git
tar -czvf LgmDist.tar.gz -C LgmDist . -C ../Scripts deploy.bat
rm -rf LgmDist