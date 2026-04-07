#!/bin/bash
# =============================================================
# PS Landing — полный деплой на Timeweb Cloud VPS
# Запускать от root на Ubuntu 24.04
# Использование: bash deploy-ps-landing.sh
# =============================================================

set -e  # выход при ошибке
DOMAIN="polishchuk-ai-systems.ru"
WWW_DOMAIN="www.polishchuk-ai-systems.ru"
APP_DIR="/var/www/ps-landing"
REPO="https://github.com/artemdali21-ship-it/ps-landing.git"
EMAIL="ap@jmcc.world"
PM2_NAME="ps-landing"

echo "======================================================"
echo "  PS Landing Deploy — $(date)"
echo "======================================================"

# ─── ФАЗА 0: Swap (до всего) ─────────────────────────────
echo ""
echo ">>> [0/6] Настройка swap (2GB)..."
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "    Swap создан и активирован"
else
  echo "    Swap уже существует, пропускаем"
fi
free -h | grep Swap

# ─── ФАЗА 1: Подготовка системы ──────────────────────────
echo ""
echo ">>> [1/6] Обновление системы и установка зависимостей..."
apt update -q && apt upgrade -y -q

# Node.js 20 LTS
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
  echo "    Устанавливаем Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - -q
  apt install -y -q nodejs
else
  echo "    Node.js уже установлен: $(node -v)"
fi

# PM2
if ! command -v pm2 &> /dev/null; then
  echo "    Устанавливаем PM2..."
  npm install -g pm2 -q
else
  echo "    PM2 уже установлен: $(pm2 -v)"
fi

# nginx
if ! command -v nginx &> /dev/null; then
  echo "    Устанавливаем nginx..."
  apt install -y -q nginx
else
  echo "    nginx уже установлен"
fi

# certbot
if ! command -v certbot &> /dev/null; then
  echo "    Устанавливаем certbot..."
  apt install -y -q certbot python3-certbot-nginx
else
  echo "    certbot уже установлен"
fi

# git
apt install -y -q git

echo "    Node: $(node -v), npm: $(npm -v), PM2: $(pm2 -v)"

# ─── ФАЗА 2: Firewall ────────────────────────────────────
echo ""
echo ">>> [2/6] Настройка firewall (ufw)..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
ufw status

# ─── ФАЗА 3: Клонирование и сборка ───────────────────────
echo ""
echo ">>> [3/6] Клонирование репо и сборка..."
mkdir -p /var/www

if [ -d "$APP_DIR" ]; then
  echo "    Директория уже есть — делаем git pull..."
  cd "$APP_DIR"
  git fetch origin main
  git reset --hard origin/main
else
  echo "    Клонируем репо..."
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# ENV
echo "    Создаём .env.production..."
cat > "$APP_DIR/.env.production" << ENVEOF
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
ENVEOF

echo "    Устанавливаем зависимости..."
npm install --legacy-peer-deps

echo "    Запускаем сборку (может занять 2-4 минуты)..."
npm run build

echo "    ✓ Сборка завершена"

# ─── ФАЗА 4: PM2 ─────────────────────────────────────────
echo ""
echo ">>> [4/6] Запуск через PM2..."
cd "$APP_DIR"

# Остановить старый процесс если есть
pm2 delete "$PM2_NAME" 2>/dev/null || true

# Запустить
pm2 start npm --name "$PM2_NAME" -- start
sleep 3

# Проверить
if pm2 list | grep -q "$PM2_NAME.*online"; then
  echo "    ✓ PM2 процесс запущен"
else
  echo "    ✗ ОШИБКА: процесс не онлайн. Проверь: pm2 logs $PM2_NAME"
  exit 1
fi

# Проверить localhost
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")
echo "    HTTP localhost:3000 → $HTTP_CODE"

# Автозапуск
pm2 startup systemd -u root --hp /root 2>/dev/null || pm2 startup
pm2 save
echo "    ✓ PM2 автозапуск настроен"

# ─── ФАЗА 5: nginx ───────────────────────────────────────
echo ""
echo ">>> [5/6] Настройка nginx..."

cat > /etc/nginx/sites-available/ps-landing << NGINXEOF
server {
    listen 80;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
    }

    # Next.js static files — кеш 1 год
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Публичные файлы — кеш 1 месяц
    location /images/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=2592000";
    }
}
NGINXEOF

# Активация
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/ps-landing /etc/nginx/sites-enabled/

nginx -t && systemctl reload nginx
echo "    ✓ nginx настроен"

# ─── ФАЗА 6: SSL ─────────────────────────────────────────
echo ""
echo ">>> [6/6] SSL сертификат (Let's Encrypt)..."

# Проверяем DNS
DNS_IP=$(dig +short "$DOMAIN" 2>/dev/null | tail -1)
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "unknown")
echo "    DNS $DOMAIN → $DNS_IP"
echo "    Этот сервер → $SERVER_IP"

if [ "$DNS_IP" = "$SERVER_IP" ]; then
  echo "    DNS совпадает — получаем сертификат..."
  certbot --nginx \
    -d "$DOMAIN" \
    -d "$WWW_DOMAIN" \
    --non-interactive \
    --agree-tos \
    -m "$EMAIL" \
    --redirect
  echo "    ✓ SSL сертификат установлен"

  # Авторенью
  systemctl enable certbot.timer 2>/dev/null || true
  certbot renew --dry-run
else
  echo "    ⚠ DNS ещё не указывает на этот сервер (DNS: $DNS_IP, Server: $SERVER_IP)"
  echo "    Запустите позже вручную:"
  echo "    certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos -m $EMAIL --redirect"
fi

# ─── ИТОГ ────────────────────────────────────────────────
echo ""
echo "======================================================"
echo "  ДЕПЛОЙ ЗАВЕРШЁН"
echo "======================================================"
echo ""
echo "  Статус PM2:"
pm2 status
echo ""
echo "  Проверка:"
echo "  HTTP:  curl -I http://$DOMAIN"
echo "  HTTPS: curl -I https://$DOMAIN"
echo ""
echo "  Логи: pm2 logs $PM2_NAME"
echo "  Перезапуск: pm2 restart $PM2_NAME"
echo "  Обновление: cd $APP_DIR && git pull && npm run build && pm2 restart $PM2_NAME"
echo "======================================================"
