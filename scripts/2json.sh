#!/bin/sh

name="$1"
ext="$2"

assimp export "src/models/$name/source/$name.$ext" "src/models/$name/source/$name.json"
