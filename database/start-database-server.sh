#!/bin/bash

JSON_SERVER_PORT=${PHONEBOOK_DATABASE_PORT:-3000}
JSON_SERVER_HOST=${PHONEBOOK_DATABASE_HOST:-localhost}

json-server \
  --watch ./db.json \
  --host $JSON_SERVER_HOST \
  --port $JSON_SERVER_PORT