#!/usr/bin/env bash

# Will print a docker tag with a version based on the current git tag or "latest" if no tag is found
# e.g.: ghcr.io/camptocamp/mel-dataplatform/catalogue:1.0.0
# or: ghcr.io/camptocamp/mel-dataplatform/catalogue:latest

appName=$1
gitTag=$(git describe --exact-match --tags 2>/dev/null | sed "s/^v//") # remove "v" in front of version if any
gitRef=$(git rev-parse --short HEAD)
dockerTag=${gitTag:-"latest"}

echo "ghcr.io/camptocamp/mel-dataplatform/${appName}:${dockerTag}"
