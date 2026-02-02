#!/bin/sh

# Path to the file that will store the environment variables
ENV_CONFIG_FILE="/usr/share/nginx/html/env-config.js"

# Start creating the file
echo "window._env_ = {" > "$ENV_CONFIG_FILE"

# Add specific environment variables that should be exposed to the frontend
# Note: Be careful not to expose sensitive secrets! Only public variables.

if [ -n "$VITE_API_URL" ]; then
  echo "  VITE_API_URL: \"$VITE_API_URL\"," >> "$ENV_CONFIG_FILE"
fi

if [ -n "$VITE_API_BASE_URL" ]; then
  echo "  VITE_API_BASE_URL: \"$VITE_API_BASE_URL\"," >> "$ENV_CONFIG_FILE"
fi

if [ -n "$VITE_CHATBOT_URL" ]; then
  echo "  VITE_CHATBOT_URL: \"$VITE_CHATBOT_URL\"," >> "$ENV_CONFIG_FILE"
fi

# Close the object
echo "};" >> "$ENV_CONFIG_FILE"

# Execute the passed command (usually starts Nginx)
exec "$@"
