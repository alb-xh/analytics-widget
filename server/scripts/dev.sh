#!/bin/bash

FILE=./src/"$1".js

[[ ! -f $FILE ]] && { echo "Please specify appropriate function name"; exit 1; }

functions-framework --target=main --source=$FILE