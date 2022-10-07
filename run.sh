#!/bin/bash

sudo lsof -t -i tcp:3034 -s tcp:listen | sudo xargs kill
docker run -d -p3034:3034 ses-monitoring-js