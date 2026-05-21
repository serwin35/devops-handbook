"""Prosty skrypt powitalny dla obrazu Docker (homework lekcja 21).

Uruchomienie:
docker build -t <image> .
docker run --rm <image>
"""

from __future__ import annotations

import os
import platform
import socket
from datetime import datetime, timezone


def main() -> None:
    name = os.environ.get("GREETING_NAME", "anonimowy uzytkownik")

    print("=" * 60)
    print(f"  Witaj, {name}!")
    print("=" * 60)
    print(f"  hostname     : {socket.gethostname()}")
    print(f"  python       : {platform.python_version()}")
    print(f"  platform     : {platform.platform()}")
    print(f"  user (uid)   : {os.getuid()}")
    print(f"  cwd          : {os.getcwd()}")
    print(f"  utc time     : {datetime.now(timezone.utc).isoformat()}")
    print("=" * 60)
    print("  ENV GREETING_NAME mozesz nadpisac przez:")
    print("    docker run --rm -e GREETING_NAME=Mateusz <image>")
    print("=" * 60)


if __name__ == "__main__":
    main()
