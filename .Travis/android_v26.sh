#!/bin/bash
set -e

# install nvm, npm and react-native-cli

#export NODEJS_ORG_MIRROR=http://nodejs.org/dist

#wget https://raw.githubusercontent.com/creationix/nvm/v0.35.0/nvm.sh -O ~/.nvm/nvm.sh
#source ~/.nvm/nvm.sh
#
#nvm install 10.13.0
#
#npm install -g react-native-cli
#
#npm install
#
# Remove any Gradle caches

rm -rf "$HOME/.gradle/caches/modules-2/modules-2.lock"

# Go to android path
cd android

# Remove build folder
rm -rf app/build

# Clean
./gradlew clean

# Test
./gradlew test

# Run release build
./gradlew assembleRelease --console=plain -S
