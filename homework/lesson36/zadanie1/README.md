# Lekcja 36 (Kubernetes) — Zadanie domowe 1: Deployment i Service dla Apache przez `kubectl create`

Utworzenie deploymentu (6 replik Apache, obraz `httpd`) oraz service'u typu NodePort
**imperatywnie, przy użyciu `kubectl create`** (bez plików manifestu) i weryfikacja
poprzez wyświetlenie strony powitalnej Apache.

> Zadanie domowe 2 (to samo, ale z plików manifestu YAML) znajduje się katalog wyżej:
> [`../README.md`](../README.md). Zasoby w tym zadaniu nazwane są `apache-cli`,
> żeby oba zadania mogły działać w klastrze równolegle bez konfliktu selektorów.

Zadanie wykonujemy na **VM z Linuksem** z minikube (opcjonalnie: na maszynie głównej
`kubernetes-1` klastra z wirtualnych maszyn — wtedy pomiń krok 0).

## Krok 0 — instalacja i start minikube na VM (Ubuntu/Debian)

Minikube z driverem docker potrzebuje Dockera:

```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
newgrp docker            # albo przeloguj się
```

Instalacja minikube i kubectl (x86_64):

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Start klastra:

```bash
minikube start --driver=docker
kubectl get nodes
```

## Krok 1 — deployment z 6 replikami Apache'a

```bash
kubectl create deployment apache-cli --image=httpd --replicas=6 --port=80
```

Oczekiwany wynik:

```text
deployment.apps/apache-cli created
```

## Krok 2 — sprawdzenie, czy deployment działa

```bash
kubectl get deployments
kubectl get pods
```

Oczekiwany wynik:

```text
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
apache-cli   6/6     6            6           30s
```

Wszystkie 6 podów `apache-cli-*` powinno mieć status `Running`.

## Krok 3 — service przez `kubectl create`

```bash
kubectl create service nodeport apache-cli --tcp=80:80 --node-port=30081
```

Oczekiwany wynik:

```text
service/apache-cli created
```

Dlaczego to działa: `kubectl create deployment apache-cli` nadaje podom etykietę
`app=apache-cli`, a `kubectl create service` ustawia selektor `app=<nazwa>` — nazwy
muszą się więc zgadzać. (Alternatywa z lekcji:
`kubectl expose deployment apache-cli --type=NodePort --port=80`.)

## Krok 4 — sprawdzenie service'u i portu

```bash
kubectl get services
```

Oczekiwany wynik:

```text
NAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
apache-cli   NodePort   10.x.x.x        <none>        80:30081/TCP   5s
kubernetes   ClusterIP  10.96.0.1       <none>        443/TCP        10m
```

Service wystawia aplikację na porcie **30081** każdego node'a
(gdyby nie podać `--node-port`, Kubernetes przydzieliłby losowy z zakresu 30000–32767).

## Krok 5 — adresy IP node'ów

```bash
kubectl get nodes -o wide
```

Interesuje nas kolumna `INTERNAL-IP`. Przy minikube to samo zwróci:

```bash
minikube ip
```

## Krok 6 — strona powitalna Apache'a

```bash
curl http://<INTERNAL-IP>:30081
```

Oczekiwany wynik:

```html
<html><body><h1>It works!</h1></body></html>
```

Na Linuksie z driverem docker IP node'a (`minikube ip`) jest osiągalne bezpośrednio z VM:

```bash
curl "http://$(minikube ip):30081"
```

Gdyby jednak nie było (inny driver/konfiguracja sieci), użyj tunelu:

```bash
minikube service apache-cli --url
curl <zwrócony-url>
```

## Sprzątanie

```bash
kubectl delete service apache-cli
kubectl delete deployment apache-cli
```

## Kryteria oceny (checklist)

- [ ] Deployment 6 replik Apache poprawnie utworzony przez `kubectl create`
- [ ] Service dla ww. deploymentu poprawnie utworzony przez `kubectl create`
- [ ] Sprawdzony port service'u i adresy IP node'ów
- [ ] Wyświetlona strona powitalna Apache'a ("It works!")
