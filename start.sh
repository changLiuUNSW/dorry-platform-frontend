#!/bin/bash
echo ..........Restarting the docker service on your machine..........
sudo service docker stop
sudo dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:5000 --api-enable-cors=true
