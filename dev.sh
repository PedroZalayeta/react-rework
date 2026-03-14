#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting LibreCourseUY development servers...${NC}"

# Get directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/LibreCourseUY-backend"
FRONTEND_DIR="$SCRIPT_DIR/LibreCourseUY"

# Function to handle cleanup
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${GREEN}Starting backend (port 6453)...${NC}"
cd "$BACKEND_DIR"
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
echo -e "${GREEN}Starting frontend (port 5173)...${NC}"
cd "$FRONTEND_DIR"
npm run dev -- --port 5173 &
FRONTEND_PID=$!

echo -e "${GREEN}Both servers running!${NC}"
echo -e "Frontend: ${YELLOW}http://localhost:5173${NC}"
echo -e "Backend:  ${YELLOW}http://localhost:6453${NC}"
echo -e "\nPress ${YELLOW}Ctrl+C${NC} to stop both servers"

# Wait for both processes
wait
