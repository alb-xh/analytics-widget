#!/bin/bash

cd ./src

echo "Functions:"

for file in *; do
  echo " - ${file%.*}" # or do something else
done
