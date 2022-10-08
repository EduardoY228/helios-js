#!/bin/bash

container=$(docker ps -a | grep 'helios-js' | awk '{ print $1 }')

if [ -z "$container" ]
  then
      echo "helios-js container not running"
      echo "starting container..."
      docker run -d --name helios-js -p3034:3034 ses-monitoring-js
  else
      echo "helios-js container running, id: $container"
      echo "stop docker container"
      docker stop $container
      echo "remove docker container"
      docker rm helios-js
      echo "starting new container..."
      docker run -d --name helios-js -p3034:3034 ses-monitoring-js
fi