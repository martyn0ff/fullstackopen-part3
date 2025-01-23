#!/bin/bash

# Backend currently does not require any special treatment for builds

# Clean previous build, build frontend files and move them
# to static server
rm -vrf ./frontend-static/dist \
  && cd ./frontend \
  && npm run build \
  && mv -v ./frontend/dist ./frontend-static