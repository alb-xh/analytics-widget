#!/bin/bash

DIR=./src/"$1"

[[ ! -d $DIR ]] && { echo "Please specify appropriate function name"; exit 1; }

functions-framework --target=main --source=$DIR
