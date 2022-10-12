#!/bin/bash

container=$(docker ps -a | grep 'helios-js' | awk '{ print $1 }')

run_command='run -d --rm --name helios-js --log-driver local -p3034:3034 ses-monitoring-js'

if [ -z "$container" ]
  then
      echo "helios-js container not running"
      echo "starting container..."
      docker $run_command
  else
      echo "helios-js container running, id: $container"
      echo "stop docker container"
      docker stop $container
      echo "starting new container..."
      docker $run_command
fi