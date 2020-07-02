#! /bin/bash

rm -rf build
npm run build
cp Dockerfile build
cp .env build
cp ormconfig.prod.json build/ormconfig.json
cp package.json build
cd build
npm i
docker build -t address-manager .
cd ..
rm -rf build
