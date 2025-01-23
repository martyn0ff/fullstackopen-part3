#!/bin/bash

# Backend currently does not require any special treatment for builds

# Clean previous build, build frontend files and move them
# to static server
rm -vrf ./frontend-static/dist \
  && npm --prefix ./frontend run build \
  && mv -v ./frontend/dist ./frontend-static