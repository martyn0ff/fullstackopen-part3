#!/bin/bash

cd ./server && \
  npm install && \
cd ../ui && \
  rm -rfv ./dist && \
  npm install && \
  npm run build && \
  mv -v ./dist ../server
