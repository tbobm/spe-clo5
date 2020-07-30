#! /bin/bash

rm -rf node_modules
docker build -t registry.clo5.local/options-manager:test-rc .
