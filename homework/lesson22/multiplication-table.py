"""Zadanie domowe 2: tabliczka mnozenia"""

ROZMIAR = 10
SZEROKOSC = 4


def main() -> None:
    separator = "+" + ("-" * (SZEROKOSC + 2) + "+") * ROZMIAR

    print(separator)
    for i in range(1, ROZMIAR + 1):
        for j in range(1, ROZMIAR + 1):
            print(f"| {i * j:{SZEROKOSC}} ", end="")
        print("|")
        print(separator)


if __name__ == "__main__":
    main()
