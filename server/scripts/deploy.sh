#!/bin/bash

[[ ! -f ./src/"$1".js ]] && { echo "Please specify appropriate function name"; exit 1; }
[[ ! -z "$PRE" ]] && { $PRE "$@"; }
[[ ! -d ./dist ]] && { echo "Please build the function first"; exit 1; }

gcloud functions deploy "$1" --gen2 --runtime=nodejs20 --source=./dist --entry-point=main --trigger-http --allow-unauthenticated
