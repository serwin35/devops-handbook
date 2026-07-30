"""Zadanie domowe do lekcji 32 (AWS cz. 4).

Klasa do zarządzania użytkownikami i grupami IAM z użyciem Boto3:
dodawanie, usuwanie, przypisywanie i odpisywanie użytkowników od grup.

Użycie z linii poleceń:
    python iam_manager.py create-user jan.kowalski
    python iam_manager.py create-group developers
    python iam_manager.py add-to-group jan.kowalski developers
    python iam_manager.py list-users
    python iam_manager.py remove-from-group jan.kowalski developers
    python iam_manager.py delete-group developers
    python iam_manager.py delete-user jan.kowalski
    python iam_manager.py demo          # pełny scenariusz + sprzątanie
"""

import argparse
import logging
import sys

import boto3
from botocore.exceptions import ClientError

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


class IamManager:
    """Zarządza użytkownikami i grupami IAM."""

    def __init__(self) -> None:
        self.iam = boto3.client("iam")

    # --- użytkownicy ---

    def create_user(self, user_name: str) -> bool:
        """Tworzy użytkownika IAM. Zwraca True, gdy użytkownik istnieje po wywołaniu."""
        try:
            self.iam.create_user(UserName=user_name)
            logger.info("Utworzono użytkownika: %s", user_name)
            return True
        except ClientError as error:
            if error.response["Error"]["Code"] == "EntityAlreadyExists":
                logger.warning("Użytkownik %s już istnieje, pomijam.", user_name)
                return True
            logger.error("Nie udało się utworzyć użytkownika %s: %s", user_name, error)
            return False

    def delete_user(self, user_name: str) -> bool:
        """Usuwa użytkownika IAM (najpierw odpina go od wszystkich grup)."""
        try:
            for group_name in self.get_groups_for_user(user_name):
                self.remove_user_from_group(user_name, group_name)
            self.iam.delete_user(UserName=user_name)
            logger.info("Usunięto użytkownika: %s", user_name)
            return True
        except ClientError as error:
            if error.response["Error"]["Code"] == "NoSuchEntity":
                logger.warning("Użytkownik %s nie istnieje, pomijam.", user_name)
                return True
            logger.error("Nie udało się usunąć użytkownika %s: %s", user_name, error)
            return False

    def list_users(self) -> list[str]:
        """Zwraca nazwy wszystkich użytkowników IAM."""
        users: list[str] = []
        for page in self.iam.get_paginator("list_users").paginate():
            users.extend(user["UserName"] for user in page["Users"])
        return users

    # --- grupy ---

    def create_group(self, group_name: str) -> bool:
        """Tworzy grupę IAM. Zwraca True, gdy grupa istnieje po wywołaniu."""
        try:
            self.iam.create_group(GroupName=group_name)
            logger.info("Utworzono grupę: %s", group_name)
            return True
        except ClientError as error:
            if error.response["Error"]["Code"] == "EntityAlreadyExists":
                logger.warning("Grupa %s już istnieje, pomijam.", group_name)
                return True
            logger.error("Nie udało się utworzyć grupy %s: %s", group_name, error)
            return False

    def delete_group(self, group_name: str) -> bool:
        """Usuwa grupę IAM (najpierw odpina od niej wszystkich użytkowników)."""
        try:
            for user_name in self.list_users_in_group(group_name):
                self.remove_user_from_group(user_name, group_name)
            self.iam.delete_group(GroupName=group_name)
            logger.info("Usunięto grupę: %s", group_name)
            return True
        except ClientError as error:
            if error.response["Error"]["Code"] == "NoSuchEntity":
                logger.warning("Grupa %s nie istnieje, pomijam.", group_name)
                return True
            logger.error("Nie udało się usunąć grupy %s: %s", group_name, error)
            return False

    def list_groups(self) -> list[str]:
        """Zwraca nazwy wszystkich grup IAM."""
        groups: list[str] = []
        for page in self.iam.get_paginator("list_groups").paginate():
            groups.extend(group["GroupName"] for group in page["Groups"])
        return groups

    def list_users_in_group(self, group_name: str) -> list[str]:
        """Zwraca nazwy użytkowników należących do grupy."""
        users: list[str] = []
        for page in self.iam.get_paginator("get_group").paginate(GroupName=group_name):
            users.extend(user["UserName"] for user in page["Users"])
        return users

    # --- przypisania ---

    def add_user_to_group(self, user_name: str, group_name: str) -> bool:
        """Przypisuje użytkownika do grupy."""
        try:
            self.iam.add_user_to_group(GroupName=group_name, UserName=user_name)
            logger.info("Dodano użytkownika %s do grupy %s", user_name, group_name)
            return True
        except ClientError as error:
            logger.error(
                "Nie udało się dodać %s do grupy %s: %s", user_name, group_name, error
            )
            return False

    def remove_user_from_group(self, user_name: str, group_name: str) -> bool:
        """Odpisuje użytkownika od grupy."""
        try:
            self.iam.remove_user_from_group(GroupName=group_name, UserName=user_name)
            logger.info("Usunięto użytkownika %s z grupy %s", user_name, group_name)
            return True
        except ClientError as error:
            if error.response["Error"]["Code"] == "NoSuchEntity":
                logger.warning(
                    "Użytkownik %s nie należy do grupy %s, pomijam.", user_name, group_name
                )
                return True
            logger.error(
                "Nie udało się usunąć %s z grupy %s: %s", user_name, group_name, error
            )
            return False

    def get_groups_for_user(self, user_name: str) -> list[str]:
        """Zwraca nazwy grup, do których należy użytkownik."""
        groups: list[str] = []
        for page in self.iam.get_paginator("list_groups_for_user").paginate(UserName=user_name):
            groups.extend(group["GroupName"] for group in page["Groups"])
        return groups


def run_demo(manager: IamManager) -> None:
    """Pełny scenariusz: tworzy zasoby, pokazuje przypisania i sprząta po sobie."""
    user_name = "homework-demo-user"
    group_name = "homework-demo-group"

    manager.create_user(user_name)
    manager.create_group(group_name)
    manager.add_user_to_group(user_name, group_name)

    logger.info("Grupy użytkownika %s: %s", user_name, manager.get_groups_for_user(user_name))
    logger.info("Członkowie grupy %s: %s", group_name, manager.list_users_in_group(group_name))

    manager.remove_user_from_group(user_name, group_name)
    manager.delete_group(group_name)
    manager.delete_user(user_name)
    logger.info("Demo zakończone, zasoby posprzątane.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Zarządzanie użytkownikami i grupami IAM")
    subparsers = parser.add_subparsers(dest="command", required=True)

    for command in ("create-user", "delete-user"):
        sub = subparsers.add_parser(command)
        sub.add_argument("user_name")

    for command in ("create-group", "delete-group"):
        sub = subparsers.add_parser(command)
        sub.add_argument("group_name")

    for command in ("add-to-group", "remove-from-group"):
        sub = subparsers.add_parser(command)
        sub.add_argument("user_name")
        sub.add_argument("group_name")

    subparsers.add_parser("list-users")
    subparsers.add_parser("list-groups")
    subparsers.add_parser("demo")

    return parser


def main() -> int:
    args = build_parser().parse_args()
    manager = IamManager()

    match args.command:
        case "create-user":
            ok = manager.create_user(args.user_name)
        case "delete-user":
            ok = manager.delete_user(args.user_name)
        case "create-group":
            ok = manager.create_group(args.group_name)
        case "delete-group":
            ok = manager.delete_group(args.group_name)
        case "add-to-group":
            ok = manager.add_user_to_group(args.user_name, args.group_name)
        case "remove-from-group":
            ok = manager.remove_user_from_group(args.user_name, args.group_name)
        case "list-users":
            print("\n".join(manager.list_users()))
            ok = True
        case "list-groups":
            print("\n".join(manager.list_groups()))
            ok = True
        case "demo":
            run_demo(manager)
            ok = True
        case _:
            ok = False

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
