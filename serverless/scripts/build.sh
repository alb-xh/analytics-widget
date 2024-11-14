#!/bin/bash

DIR=./src/"$1"

[[ ! -d $DIR ]] && { echo "Please specify appropriate function name"; exit 1; }

rm -rf ./dist
mkdir dist
cp -r ./src/common ./package.json ./package-lock.json .gcloudignore .env ./dist
cp -r "$DIR" ./dist/"$1"
echo "import './$1/index.js';" > ./dist/index.js

echo "Build was successfull"

