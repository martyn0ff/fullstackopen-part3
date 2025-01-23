#!/bin/bash

npm --prefix ./database run start &
DB_PID=$!

npm --prefix ./backend run dev &
BACKEND_PID=$!

npm --prefix ./frontend run dev &
FRONTEND_PID=$!

cleanup() {
  echo "Shutting down..."
  kill $DB_PID $BACKEND_PID $FRONTEND_PID
  wait $DB_PID $BACKEND_PID $FRONTEND_PID
}

trap cleanup SIGINT

wait

echo "All processes have completed."
