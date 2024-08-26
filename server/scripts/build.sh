#!/bin/bash

FILE=./src/"$1".js

[[ ! -f $FILE ]] && { echo "Please specify appropriate function name"; exit 1; }

rm -rf ./dist
mkdir dist
cp ./package.json ./package-lock.json .gcloudignore ./dist
cp $FILE ./dist/index.js

echo "Build was successfull"

