# Lekcja 13 — Homework: Serwery WWW

Konfiguracja Nginx z dwoma virtual hostami oraz architektura reverse proxy z Apache.

## Zadanie 1: Dwa virtual hosts (Nginx)

Skonfiguruj Nginx do obslugi dwoch rownoleglych stron pod oddzielnymi domenami.

### Kroki

```bash
# 1. Katalogi stron
sudo mkdir -p /var/www/project1 /var/www/project2
echo "<h1>Project 1</h1>" | sudo tee /var/www/project1/index.html
echo "<h1>Project 2</h1>" | sudo tee /var/www/project2/index.html
sudo chown -R www-data:www-data /var/www/project1 /var/www/project2

# 2. Pliki konfiguracyjne vhost (sites-available/)
sudo cp project1.conf /etc/nginx/sites-available/project1.conf
sudo cp project2.conf /etc/nginx/sites-available/project2.conf

# 3. Aktywacja (symlinki)
sudo ln -s /etc/nginx/sites-available/project1.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/project2.conf /etc/nginx/sites-enabled/

# 4. Test skladni + reload
sudo nginx -t
sudo systemctl reload nginx

# 5. Mapowanie domen
sudo bash -c 'echo "127.0.0.1 project1.local" >> /etc/hosts'
sudo bash -c 'echo "127.0.0.1 project2.local" >> /etc/hosts'

# 6. Test
curl http://project1.local
curl http://project2.local
```

### Kryteria oceny

- [x] Dwa oddzielne katalogi z plikami HTML
- [x] Dwa pliki konfiguracyjne w `sites-available/`
- [x] Aktywacja przez symlinki w `sites-enabled/`
- [x] `curl http://project1.local` zwraca Project 1
- [x] `curl http://project2.local` zwraca Project 2
- [x] Oddzielne logi dla kazdego vhosta
- [x] Dokumentacja `NGINX_VHOSTS.md`

## Zadanie 2: Reverse proxy (Nginx + Apache)

Architektura: **Client → Nginx:80 → Apache:8080**

### Kroki

```bash
# 1. Apache na porcie 8080
sudo apt install -y apache2
sudo sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
sudo sed -i 's|<VirtualHost \*:80>|<VirtualHost *:8080>|' /etc/apache2/sites-available/000-default.conf
sudo systemctl restart apache2

# 2. Nginx jako proxy
sudo cp apache_proxy.conf /etc/nginx/sites-available/apache_proxy.conf
sudo ln -s /etc/nginx/sites-available/apache_proxy.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 3. Test
curl -v http://localhost
curl http://localhost/health

# 4. Monitoring
sudo tail -f /var/log/nginx/app-proxy.access.log
```

### Kryteria oceny

- [x] Apache nasluchuje na porcie 8080 (nie 80)
- [x] Nginx nasluchuje na 80, proxy_pass do `127.0.0.1:8080`
- [x] Ustawione naglowki `Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`
- [x] Health check endpoint `/health` zwraca 200
- [x] Dokumentacja `NGINX_REVERSE_PROXY.md` z diagramem

## Debugging

Gdy cos nie dziala, zawsze sprawdzaj w kolejnosci:

```bash
sudo tail -20 /var/log/nginx/error.log     # 1. error log
sudo systemctl status nginx apache2         # 2. status
sudo nginx -t                               # 3. skladnia
sudo ss -tlnp | grep -E 'nginx|apache'      # 4. porty
curl -v http://localhost                    # 5. test HTTP
```
