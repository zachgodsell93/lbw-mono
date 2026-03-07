#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# LBW Node Backend - Initial Server Setup Script
# Run once on a fresh Ubuntu VM to provision Docker and the application.
#
# Usage: curl -sSL <raw-github-url>/deploy/setup.sh | bash
#   or:  chmod +x setup.sh && ./setup.sh
#
# Prerequisites:
#   - Ubuntu 22.04+ VM
#   - A GitHub deploy key added to the repo (for git clone via SSH)
# =============================================================================

APP_DIR="/opt/lbw-node-backend"
REPO_URL="git@github.com:laybackandwin/lbw-node-backend.git"

echo "==> Installing Docker..."
sudo apt-get update -qq
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -qq
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow current user to run docker without sudo
sudo usermod -aG docker "$USER"

echo "==> Cloning repository to ${APP_DIR}..."
sudo git clone "${REPO_URL}" "${APP_DIR}"
sudo chown -R "$USER:$USER" "${APP_DIR}"

echo "==> Creating .env file from template..."
cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
echo ""
echo "    *** IMPORTANT: Edit ${APP_DIR}/.env and fill in your secrets ***"
echo ""

echo "==> Building and starting the container..."
cd "${APP_DIR}"
# newgrp docker is needed so current shell picks up the docker group
sg docker -c "docker compose up --build -d"

echo ""
echo "==> Setup complete!"
echo "    Container status:"
sg docker -c "docker compose ps"
echo ""
echo "    Next steps:"
echo "    1. Edit ${APP_DIR}/.env with your real secret values"
echo "    2. Restart: cd ${APP_DIR} && docker compose up -d"
echo "    3. Configure GitHub Actions secrets (SSH_HOST, SSH_USERNAME, SSH_KEY, SSH_PORT)"
