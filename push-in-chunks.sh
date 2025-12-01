#!/bin/bash

# Script to push Git repository in smaller chunks
# This helps overcome HTTP 400 errors when pushing large repositories

echo "Starting chunked push to remote..."

# Configure Git to increase the buffer size and timeout
git config http.postBuffer 524288000
git config http.lowSpeedLimit 1000
git config http.lowSpeedTime 300

# Get the current branch name
BRANCH=$(git symbolic-ref --short HEAD)
REMOTE=${1:-origin}

echo "Pushing to $REMOTE/$BRANCH..."

# Try pushing with a larger post buffer first
echo "Attempting push with increased buffer size..."
git push $REMOTE $BRANCH && { echo "Push successful!"; exit 0; }

echo "Standard push failed, trying chunked approach..."

# Create a temporary branch for chunked pushing
TEMP_BRANCH="temp-chunked-push-$(date +%s)"
git branch $TEMP_BRANCH $BRANCH

# Get the last successful commit on the remote
LAST_REMOTE_COMMIT=$(git rev-parse $REMOTE/$BRANCH 2>/dev/null || echo "")

if [ -z "$LAST_REMOTE_COMMIT" ]; then
    echo "Remote branch doesn't exist yet. Will push in chunks from the beginning."
    # Get the first commit
    LAST_REMOTE_COMMIT=$(git rev-list --max-parents=0 HEAD)
fi

# Get all commits between the last remote commit and HEAD
COMMITS=$(git rev-list --reverse $LAST_REMOTE_COMMIT..$BRANCH)

if [ -z "$COMMITS" ]; then
    echo "No new commits to push."
    git branch -D $TEMP_BRANCH
    exit 0
fi

# Push commits in chunks
echo "Pushing commits in chunks..."
COUNTER=0
CHUNK_SIZE=5

for COMMIT in $COMMITS; do
    git update-ref refs/heads/$TEMP_BRANCH $COMMIT
    echo "Pushing commit $COMMIT ($(git log -1 --pretty=%s $COMMIT))"
    
    if git push -f $REMOTE $TEMP_BRANCH:$BRANCH; then
        echo "Successfully pushed commit $COMMIT"
        COUNTER=$((COUNTER + 1))
        
        # Add a small delay between pushes
        sleep 2
        
        # If we've pushed CHUNK_SIZE commits, wait a bit longer
        if [ $((COUNTER % CHUNK_SIZE)) -eq 0 ]; then
            echo "Pushed $CHUNK_SIZE commits, waiting 10 seconds before continuing..."
            sleep 10
        fi
    else
        echo "Failed to push commit $COMMIT"
        echo "You may need to try with a smaller chunk size or investigate further."
        git branch -D $TEMP_BRANCH
        exit 1
    fi
done

# Clean up
git branch -D $TEMP_BRANCH
echo "All commits pushed successfully to $REMOTE/$BRANCH!"
