#!/bin/sh
set -e

export PORT=${PORT:-80}
export BACKEND_URL=${BACKEND_URL:-http://localhost:8000}

envsubst '${PORT} ${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
