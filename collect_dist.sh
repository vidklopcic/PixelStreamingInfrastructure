#!/bin/bash

rm -rf LgmDist
mkdir LgmDist LgmDist/Frontend LgmDist/Signalling
cp -r Frontend/implementations/lgm_metahuman/dist/* LgmDist/Frontend/
cp -r LGMWebServer/dist/* LgmDist/Signalling/
tar -czvf LgmDist.tar.gz LgmDist
rm -rf LgmDist