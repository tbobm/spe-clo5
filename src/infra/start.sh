#! /bin/bash

docker network create -d bridge clo
docker network create -d bridge establishment
docker network create -d bridge address
docker network create -d bridge booking
docker network create -d bridge room
docker network create -d bridge user
docker network create -d bridge policy-price

cd .docker && docker-compose up -d --build --remove-orphans
