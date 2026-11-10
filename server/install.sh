#!/usr/bin/env bash
# 一键部署（Ubuntu / Debian）：
#   curl -fsSL https://raw.githubusercontent.com/lcy1021/html-style-base/main/server/install.sh | sudo bash -s -- fineuedesign.com
# 部署某个分支（PR 合并前试跑）：在命令前加 BRANCH=分支名，如 sudo BRANCH=feat/mcp-analytics bash install.sh fineuedesign.com
set -euo pipefail
DOMAIN="${1:-fineuedesign.com}"
DIR=/opt/html-style-base
BRANCH="${BRANCH:-main}"

echo "==> 安装 git、Docker"
apt-get update -qq && apt-get install -y -qq git curl ca-certificates >/dev/null
if ! command -v docker >/dev/null; then curl -fsSL https://get.docker.com | sh; fi

echo "==> 拉取仓库到 $DIR"
if [ -d "$DIR/.git" ]; then git -C "$DIR" fetch -q origin "$BRANCH" && git -C "$DIR" checkout -q "$BRANCH" && git -C "$DIR" pull -q --ff-only origin "$BRANCH"; else git clone -b "$BRANCH" https://github.com/lcy1021/html-style-base.git "$DIR"; fi
cd "$DIR/server"

if [ ! -f .env ]; then
  echo "==> 生成 .env"
  cp .env.example .env
  sed -i "s#^DOMAIN=.*#DOMAIN=$DOMAIN#" .env
  sed -i "s#^SESSION_SECRET=.*#SESSION_SECRET=$(openssl rand -hex 32)#" .env
  PW=$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-16)
  sed -i "s#^ADMIN_PASSWORD=.*#ADMIN_PASSWORD=$PW#" .env
  chmod 600 .env
  echo "    后台临时密码：$PW （记下来；配好 GitHub 登录后可以在 .env 里删掉）"
fi
mkdir -p data && chown -R 1000:1000 data

echo "==> 启动"
docker compose up -d --build
sleep 5
docker compose ps
echo
echo "完成。1 分钟内证书签好后打开：https://$DOMAIN/admin"
echo "查看日志：cd $DIR/server && docker compose logs -f app caddy"
