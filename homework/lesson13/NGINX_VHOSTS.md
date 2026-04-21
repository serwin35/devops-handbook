# NGINX — Virtual Hosts

Dokumentacja konfiguracji dwoch niezaleznych stron pod oddzielnymi domenami
(`project1.local`, `project2.local`) obsługiwanych przez jeden serwer Nginx.

## Architektura

```
                  ┌──────────────┐
                  │  Nginx :80   │
                  └──────┬───────┘
                         │  server_name
         ┌───────────────┼───────────────┐
         │                               │
 project1.local                   project2.local
         │                               │
         ▼                               ▼
 /var/www/project1                /var/www/project2
 (index.html)                     (index.html)
         │                               │
         ▼                               ▼
 project1.access.log              project2.access.log
 project1.error.log               project2.error.log
```

## Struktura katalogow

| Sciezka                                     | Opis                           |
|---------------------------------------------|--------------------------------|
| `/var/www/project1/`                        | Root Project 1                 |
| `/var/www/project2/`                        | Root Project 2                 |
| `/etc/nginx/sites-available/project1.conf`  | Konfiguracja vhost 1           |
| `/etc/nginx/sites-available/project2.conf`  | Konfiguracja vhost 2           |
| `/etc/nginx/sites-enabled/`                 | Aktywne vhost (symlinki)       |
| `/var/log/nginx/project1.access.log`        | Logi dostepu Project 1         |
| `/var/log/nginx/project1.error.log`         | Logi bledow Project 1          |
| `/var/log/nginx/project2.access.log`        | Logi dostepu Project 2         |
| `/var/log/nginx/project2.error.log`         | Logi bledow Project 2          |
| `/etc/hosts`                                | Mapowanie domen → 127.0.0.1    |

## Jak dodac nowy virtual host

### Krok 1 — przygotowanie katalogu i pliku HTML

```bash
sudo mkdir -p /var/www/projectN
echo "<h1>Project N</h1>" | sudo tee /var/www/projectN/index.html
sudo chown -R www-data:www-data /var/www/projectN
sudo chmod -R 755 /var/www/projectN
```

### Krok 2 — plik konfiguracyjny

Utworz `/etc/nginx/sites-available/projectN.conf`:

```nginx
server {
    listen 80;
    server_name projectN.local;
    root /var/www/projectN;
    index index.html;

    access_log /var/log/nginx/projectN.access.log;
    error_log /var/log/nginx/projectN.error.log;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

### Krok 3 — aktywacja (symlink)

```bash
sudo ln -s /etc/nginx/sites-available/projectN.conf /etc/nginx/sites-enabled/
```

### Krok 4 — walidacja skladni

```bash
sudo nginx -t
# oczekiwane:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Krok 5 — reload (bez przerwy)

```bash
sudo systemctl reload nginx
```

### Krok 6 — mapowanie domeny lokalnie

```bash
sudo bash -c 'echo "127.0.0.1 projectN.local" >> /etc/hosts'
```

### Krok 7 — test

```bash
curl http://projectN.local
```

## Jak wylaczyc vhost (bez usuwania)

Zalety oddzielenia `sites-available` od `sites-enabled` — mozna szybko
wlaczac/wylaczac bez edycji plikow:

```bash
# wylacz (usun tylko symlink)
sudo rm /etc/nginx/sites-enabled/projectN.conf
sudo systemctl reload nginx

# wlacz ponownie
sudo ln -s /etc/nginx/sites-available/projectN.conf /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

## Debugging — najczestsze problemy

### 1. `curl` zwraca domyslna strone Nginx zamiast Twojej

**Przyczyna:** Plik `default` w `sites-enabled/` ma wyzszy priorytet (ladowany
alfabetycznie jako pierwszy — staje sie `default_server`).

```bash
# sprawdz aktywne vhost
ls -la /etc/nginx/sites-enabled/

# usun default
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### 2. `server_name` nie pasuje do domeny

Nginx wybiera `default_server`, gdy zadna `server_name` nie pasuje.

```bash
# pokaz co Nginx widzi dla konkretnej domeny
curl -H "Host: project1.local" http://127.0.0.1

# sprawdz konfiguracje
sudo grep -r server_name /etc/nginx/sites-enabled/
```

### 3. 403 Forbidden

Nginx nie ma praw odczytu katalogu `root`.

```bash
sudo chown -R www-data:www-data /var/www/projectN
sudo chmod -R 755 /var/www/projectN
```

### 4. 404 Not Found mimo poprawnej domeny

Zle `root` lub brakujacy plik.

```bash
ls -la /var/www/projectN/
sudo tail -20 /var/log/nginx/projectN.error.log
```

### 5. Nginx nie restartuje po zmianie

```bash
# zawsze test przed reload
sudo nginx -t

# jesli blad - pokazuje linie i plik
# napraw, ponowny test, reload
sudo systemctl reload nginx
```

## Szybkie checki

```bash
# 1. Co nasluchuje na 80
sudo ss -tlnp | grep :80

# 2. Status Nginx
sudo systemctl status nginx

# 3. Pelna konfiguracja (wszystko zzone)
sudo nginx -T | less

# 4. Logi bledow (follow)
sudo tail -f /var/log/nginx/error.log

# 5. Logi konkretnego vhosta
sudo tail -f /var/log/nginx/project1.access.log
```

## Reload vs restart — dlaczego reload?

| Komenda                         | Efekt                                |
|---------------------------------|--------------------------------------|
| `systemctl reload nginx`        | Przeladuj konfiguracje (graceful) — bez przerwy w dzialaniu, stare procesy obsluguja otwarte polaczenia do konca |
| `systemctl restart nginx`       | Pelny restart — krotka przerwa w dostepnosci (~1s) |

**Zasada:** zawsze uzywaj `reload`, chyba ze zmieniasz cos fundamentalnego
(np. numer portu, user, worker_processes).

## Kryteria oceny (z PDF)

- [x] Utworzono dwa katalogi z plikami HTML (`/var/www/project1`, `/var/www/project2`)
- [x] Utworzono dwie oddzielne konfiguracje Nginx (virtual hosts) w `sites-available`
- [x] Konfiguracje zostaly aktywowane za pomoca dowiazan symbolicznych w `sites-enabled`
- [x] Oba virtual hosty dzialaja poprawnie (`curl http://project1.local` i `curl http://project2.local` zwracaja odpowiednie strony)
- [x] Przygotowano dokumentacje `NGINX_VHOSTS.md`

## Poziom zaawansowany (opcjonalnie)

- Niestandardowe strony bledow (`404.html`, `50x.html`) dla kazdego vhosta
- Oddzielne pliki logow (juz zaimplementowane: `projectN.access.log`, `projectN.error.log`)
- Gzip compression:

```nginx
location ~* \.(html|css|js|json|xml)$ {
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;
    gzip_comp_level 6;
}
```
