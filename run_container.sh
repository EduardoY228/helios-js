#!/bin/bash

container=$(docker ps | grep 'helios-js' | awk '{ print $1 }')

if [ -z "$container" ]
  then
      echo "ses-monitoring-js container not running"
      echo "starting container..."
      docker run -d --name helios-js -p3034:3034 ses-monitoring-js
  else
      echo "ses-monitoring-js container running, id: $container"
      echo "rerun docker container"
      docker stop $container
      echo "starting container..."
      docker run -d --name helios-js -p3034:3034 ses-monitoring-js
fi