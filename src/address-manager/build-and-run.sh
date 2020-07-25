#! /bin/bash

./docker-build.sh
cd infra && ./start.sh
