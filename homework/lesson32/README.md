# Lekcja 32 (AWS cz. 4) — Zadanie domowe: Boto3 + IAM

Zakres zadania:

1. Zainstalować Python Boto3
2. Przygotować klasę do zarządzania użytkownikami i grupami
   (dodawanie, usuwanie, przypisywanie i odpisywanie)
3. Plik ([`iam_manager.py`](iam_manager.py)) podesłać prowadzącemu na Slacku

## Krok 1 — instalacja Boto3

```bash
cd homework/lesson32
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Weryfikacja:

```bash
python -c "import boto3; print(boto3.__version__)"
```

## Krok 2 — poświadczenia AWS

Boto3 korzysta z tych samych poświadczeń co AWS CLI (`~/.aws/credentials`),
więc wystarczy wcześniejsze `aws configure`. Użytkownik musi mieć uprawnienia IAM,
na czas ćwiczenia np. polityka `IAMFullAccess`.

Weryfikacja:

```bash
aws sts get-caller-identity
```

## Krok 3 — klasa `IamManager`

Plik `iam_manager.py` zawiera klasę `IamManager` z metodami:

| Metoda                                        | Opis                                          |
|-----------------------------------------------|-----------------------------------------------|
| `create_user(user_name)`                      | tworzy użytkownika IAM                        |
| `delete_user(user_name)`                      | usuwa użytkownika (najpierw odpina od grup)   |
| `create_group(group_name)`                    | tworzy grupę                                  |
| `delete_group(group_name)`                    | usuwa grupę (najpierw odpina członków)        |
| `add_user_to_group(user_name, group_name)`    | przypisuje użytkownika do grupy               |
| `remove_user_from_group(user_name, group_name)` | odpisuje użytkownika od grupy               |
| `list_users()` / `list_groups()`              | listy nazw (z paginatorami)                   |
| `list_users_in_group(group_name)`             | członkowie grupy                              |
| `get_groups_for_user(user_name)`              | grupy użytkownika                             |

Obsługa błędów: `ClientError` z kodami `EntityAlreadyExists` / `NoSuchEntity`
traktowana idempotentnie (warning + kontynuacja), pozostałe błędy logowane jako error.

## Krok 4 — użycie

```bash
python iam_manager.py create-user jan.kowalski
python iam_manager.py create-group developers
python iam_manager.py add-to-group jan.kowalski developers
python iam_manager.py list-users
python iam_manager.py list-groups
python iam_manager.py remove-from-group jan.kowalski developers
python iam_manager.py delete-group developers
python iam_manager.py delete-user jan.kowalski
```

Pełny scenariusz z automatycznym sprzątaniem (tworzy `homework-demo-user`
i `homework-demo-group`, przypisuje, wypisuje i usuwa):

```bash
python iam_manager.py demo
```

Przykładowy wynik dema:

```text
2026-07-30 13:00:00,000 - INFO - Utworzono użytkownika: homework-demo-user
2026-07-30 13:00:00,300 - INFO - Utworzono grupę: homework-demo-group
2026-07-30 13:00:00,600 - INFO - Dodano użytkownika homework-demo-user do grupy homework-demo-group
2026-07-30 13:00:00,900 - INFO - Grupy użytkownika homework-demo-user: ['homework-demo-group']
2026-07-30 13:00:01,200 - INFO - Członkowie grupy homework-demo-group: ['homework-demo-user']
2026-07-30 13:00:01,500 - INFO - Usunięto użytkownika homework-demo-user z grupy homework-demo-group
2026-07-30 13:00:01,800 - INFO - Usunięto grupę: homework-demo-group
2026-07-30 13:00:02,100 - INFO - Usunięto użytkownika: homework-demo-user
2026-07-30 13:00:02,100 - INFO - Demo zakończone, zasoby posprzątane.
```

## Uwagi

- `delete_user` usuwa tylko przypisania do grup; jeżeli użytkownik ma access keys,
  login profile lub przypięte polityki, AWS odrzuci usunięcie (`DeleteConflict`) —
  w ćwiczeniu tworzymy "gołych" użytkowników, więc problem nie występuje.
- Do oddania zadania: wyślij `iam_manager.py` prowadzącemu na Slacku.
