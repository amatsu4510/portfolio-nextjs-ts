#!/bin/bash

# Stop and remove existing containers
docker compose down

# Clean up unused Docker resources
docker system prune -a

if [ "$1" = "P" ]; then
    docker compose -f compose.prod.yaml up --build -d
elif [ "$MODE" == "D" ]; then
    docker compose -f compose.yaml up --build -d
else
    echo "Usage: ./dockerstart.sh [P|D]"
    echo "P: Production mode"
    echo "D: Development mode"
fi