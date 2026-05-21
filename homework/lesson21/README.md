# Lekcja 21 — Homework: Wlasny obraz Pythona + push na Docker Hub

## Co realizuje

| Wymaganie z polecenia                                    | Gdzie w pliku                          |
|----------------------------------------------------------|----------------------------------------|
| Dockerfile na podstawie Pythona                          | `Dockerfile` — `FROM python:3.12-slim` |
| Prosty skrypt dzialajacy domyslnie                       | `app.py` + `CMD ["python", "app.py"]`  |
| Uzytkownik (nie-root) + katalog domyslny                 | `RUN groupadd/useradd ... appuser` + `WORKDIR /app` + `USER appuser` |
| Etykiety zgodne ze specyfikacja Open Containers          | `LABEL org.opencontainers.image.*`     |
| Zmienna srodowiskowa wykorzystywana przez skrypt         | `ENV GREETING_NAME=...` -> `os.environ.get("GREETING_NAME")` w `app.py` |

> **Uwaga:** podmien `serwin` w `Dockerfile` i w komendach
> ponizej na swoj login z Docker Hub przed buildem.

---

## 1. Build obrazu lokalnie

```bash
# Z katalogu homework/lesson21/
cd homework/lesson21

# Build z tagiem nazwa:wersja oraz nazwa:latest
docker build \
  -t serwin/devops-handbook-hello:1.0.0 \
  -t serwin/devops-handbook-hello:latest \
  .

# Sprawdz, ze obraz jest na liscie
docker images | grep devops-handbook-hello
```

## 2. Test lokalny

```bash
# Uruchom z domyslna ENV
docker run --rm serwin/devops-handbook-hello:1.0.0

# Uruchom z nadpisana ENV (zmienna idzie do skryptu Pythona)
docker run --rm -e GREETING_NAME="Mateusz" serwin/devops-handbook-hello:1.0.0

# Sprawdz, ze CMD dziala jako uzytkownik appuser (uid 10001, NIE root)
docker run --rm serwin/devops-handbook-hello:1.0.0 \
  python -c "import os; print('uid:', os.getuid(), 'cwd:', os.getcwd())"
# Oczekiwane: uid: 10001  cwd: /app

# Sprawdz etykiety OCI obecne w gotowym obrazie
docker inspect --format '{{json .Config.Labels}}' \
  serwin/devops-handbook-hello:1.0.0 | jq
```

## 3. Konto na Docker Hub

1. Zaloz konto: <https://hub.docker.com/signup>
2. (Opcjonalnie, zalecane) utworz Personal Access Token zamiast loginu haslem:
   Account Settings -> Security -> New Access Token (scope: Read & Write).

## 4. Login + push do rejestru

```bash
# Logowanie (uzyj PAT jako haslo, login = nazwa konta)
docker login -u serwin

# Push obu tagow
docker push serwin/devops-handbook-hello:1.0.0
docker push serwin/devops-handbook-hello:latest
```

Po wypchnieciu obraz bedzie dostepny pod:

```
https://hub.docker.com/r/serwin/devops-handbook-hello
```

Ten link wysylasz prowadzacemu.

## 5. Pull i smoke test z czystej maszyny

Zeby sprawdzic, ze obraz dziala dla kogos innego (czyli prowadzacego):

```bash
docker rmi serwin/devops-handbook-hello:1.0.0  # usun lokalnie
docker run --rm -e GREETING_NAME="Prowadzacy" \
  serwin/devops-handbook-hello:1.0.0
```

---

## Multi-arch build (opcjonalnie — bonus)

Jesli budujesz na Apple Silicon (arm64) a prowadzacy ma x86_64,
zrob obraz na obie architektury jednym poleceniem przez `buildx`:

```bash
docker buildx create --use --name multiarch || true
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t serwin/devops-handbook-hello:1.0.0 \
  -t serwin/devops-handbook-hello:latest \
  --push \
  .
```

`--push` od razu wypycha — nie musisz robic osobnego `docker push`.

---

## Checklist deliverable

- [ ] Konto na hub.docker.com utworzone
- [ ] `docker build` zakonczony bez bledow
- [ ] `docker run` lokalnie wypisuje powitanie z ENV
- [ ] `docker push` zakonczony powodzeniem
- [ ] Link do obrazu na Docker Hub wyslany prowadzacemu
