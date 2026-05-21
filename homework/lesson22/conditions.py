"""Zadanie 3 z lekcji 22: instrukcje warunkowe."""

wiek = int(input("Podaj swoj wiek: "))

if wiek < 18:
    print("Jestes niepelnoletni.")
elif wiek < 65:
    print("Jestes doroslym.")
else:
    print("Jestes seniorem.")
