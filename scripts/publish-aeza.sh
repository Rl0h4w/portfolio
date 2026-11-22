#!/usr/bin/env bash
set -euo pipefail

build_dir=${1:?Usage: publish-aeza.sh BUILD_DIRECTORY}
: "${AEZA_SSH_HOST:?Missing Aeza host}"
: "${AEZA_SSH_KEY_FILE:?Missing deploy key file}"
: "${AEZA_SSH_KNOWN_HOSTS_FILE:?Missing trusted SSH host key file}"

test -f "$build_dir/index.html"
tar -C "$build_dir" -czf - . |
  ssh -T -o BatchMode=yes -o ConnectTimeout=15 \
    -o StrictHostKeyChecking=yes -o HostKeyAlias=aeza-portfolio \
    -o "UserKnownHostsFile=$AEZA_SSH_KNOWN_HOSTS_FILE" \
    -o IdentitiesOnly=yes -i "$AEZA_SSH_KEY_FILE" \
    "portfolio-deploy@$AEZA_SSH_HOST"
