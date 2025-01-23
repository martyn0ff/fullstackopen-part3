#!/bin/bash

cd ./backend \
  && npm install \
&& cd ../database \
  && npm install \
&& cd ../frontend \
  && npm install \
  && npm run build \
  && rm -vrf ../frontend-static/dist \
  && mv -v dist ../frontend-static \
&& cd ../frontend-static \
  && npm install