# Lekcja 19 — Homework: Konfiguracja cz. 2 (Ansible — role, srodowiska)

## Zadania

| Katalog              | Zadanie                                      |
|----------------------|----------------------------------------------|
| `zadanie1/`          | Czesc praktyczna Zadanie 1 — LAMP w rolach   |
| `zadanie-domowe-2/`  | Zadanie domowe 2 — wlasna rola na Galaxy    |

## zadanie1 — LAMP w rolach

3 role: `apache`, `mysql`, `php` zlozone w jeden playbook `site.yml`
deployujacy kompletny stos LAMP. Patrz `zadanie1/README.md`.

## zadanie-domowe-2 — Wlasna rola na Galaxy

Rola `dumper` (automatyczny backup MySQL) — zaprojektowana, ulinowana,
udokumentowana, z CI/CD i przygotowana do publikacji na Ansible Galaxy.

**Deliverable:** link do roli na Galaxy wyslany na Slack.

Patrz `zadanie-domowe-2/README.md` po instrukcje publikacji.
