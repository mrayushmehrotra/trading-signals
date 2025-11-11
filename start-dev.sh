#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd apps/server && bun run dev &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Start the frontend
echo "Starting frontend..."
cd apps/frontend && npm run dev &
FRONTEND_PID=$!

# Function to cleanup processes
cleanup() {
    echo "Shutting down..."
    kill $SERVER_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Trap cleanup function on script exit
trap cleanup EXIT INT TERM

# Wait for both processes
wait