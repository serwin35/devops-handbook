"""Zadanie domowe 1: kalkulator BMI.

Wzor: BMI = waga[kg] / (wzrost[m])^2
Wzrost podajemy w cm, dzielimy przez 100.
"""


def klasyfikuj_bmi(bmi: float) -> str:
    """Zwraca slowna interpretacje BMI."""
    if bmi < 18.5:
        return "niedowaga"
    if bmi < 25:
        return "waga prawidlowa"
    if bmi < 30:
        return "nadwaga"
    return "otylosc"


def read_positive_float(prompt: str) -> float:
    """Wczytuje dodatnia liczbe od uzytkownika z obsluga bledow."""
    while True:
        try:
            value = float(input(prompt))
        except ValueError:
            print("To nie jest liczba. Sprobuj jeszcze raz.")
            continue
        if value <= 0:
            print("Wartosc musi byc dodatnia.")
            continue
        return value


def main() -> None:
    waga = read_positive_float("Podaj wage w kg: ")
    wzrost_cm = read_positive_float("Podaj wzrost w cm: ")

    bmi = waga / (wzrost_cm / 100) ** 2
    kategoria = klasyfikuj_bmi(bmi)

    print(f"Twoje BMI: {bmi:.2f} -> {kategoria}")


if __name__ == "__main__":
    main()
