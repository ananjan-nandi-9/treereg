#!/bin/bash

# Directory containing the MP4 files
VIDEO_DIR="videos"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "FFmpeg is not installed. Please install it and try again."
    exit 1
fi

# Check if the directory exists
if [ ! -d "$VIDEO_DIR" ]; then
    echo "Directory '$VIDEO_DIR' does not exist. Please create it and add your MP4 files."
    exit 1
fi

# Loop through all MP4 files in the directory
for mp4_file in "$VIDEO_DIR"/*.mp4; do
    if [ -f "$mp4_file" ]; then
        # Extract the file name without extension
        base_name=$(basename "$mp4_file" .mp4)
        # Define the output file name
        webm_file="$VIDEO_DIR/$base_name.webm"
        # Convert MP4 to WebM
        echo "Converting '$mp4_file' to '$webm_file'..."
        ffmpeg -i "$mp4_file" -c:v libvpx-vp9 -b:v 1M -c:a libopus "$webm_file"
        echo "Finished converting '$mp4_file'."
    else
        echo "No MP4 files found in '$VIDEO_DIR'."
    fi
done

echo "All conversions are complete!"
