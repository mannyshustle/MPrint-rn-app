#!/bin/bash
# create a file called firebaseAppID and add your firebase app ID to
# then download your service account key file json and name it android-service-firebase.json
# Read the firebase app ID from a file
FIREBASE_APP_ID=$(cat "$(dirname -- "$0")/firebaseAppID")

# Export the firebase app ID as an environment variable
export FIREBASE_APP_ID

# Export the service account file as an environment variable
export SERVICE_CREDENTIALS_FILE=fastlane/scripts/android-service-firebase.json

cd "$(dirname -- "$0")/../.."

fastlane ios deploy