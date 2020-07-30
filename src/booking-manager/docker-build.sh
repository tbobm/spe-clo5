#! /bin/bash

docker build -t registry.clo5.local/booking-manager:$CI_COMMIT_BRANCH-rc .
