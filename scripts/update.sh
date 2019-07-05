#!/bin/sh
npm install
npm run build

#update client
cd client
yarn install

cd ..

#update widget
cd widget
yarn install



