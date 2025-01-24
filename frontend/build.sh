#!/bin/bash

cd ./server && \
  npm install && \
cd ../ui && \
  rm -rfv ../server/dist && \
  npm install && \
  npm run build && \
  mv -v ./dist ../server
