#!/bin/bash

[[ ! -d ./src/"$1" ]] && { echo "Please specify appropriate function name"; exit 1; }
[[ ! -z "$PRE" ]] && { $PRE "$@"; }
[[ ! -d ./dist ]] && { echo "Please build the function first"; exit 1; }

gcloud functions deploy "$1" --no-gen2 --runtime=nodejs20 --source=./dist --entry-point=main --trigger-http --allow-unauthenticated
