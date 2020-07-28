#! /bin/bash

rm -rf build
npm run build
cp Dockerfile build
cp .env build
cp ormconfig.prod.json build/ormconfig.json
cp package.json build
cp -r public build
cd build
npm i
docker build -t 172.16.228.42:443/address-manager:test-rc .
cd ..
rm -rf build
