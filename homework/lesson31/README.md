# Lekcja 31 (AWS cz. 3) — Zadanie domowe: SNS przez AWS CLI

Zakres zadania:

1. Zainstalować AWS CLI
2. Utworzyć temat (topic) SNS — w treści zadania "kolejkę SNS"; SNS operuje na tematach,
   kolejki to domena SQS
3. Dodać subskrypcję na wysyłkę maila
4. Przetestować, wywołując publish przez CLI

Cały scenariusz (poza instalacją i `aws configure`) automatyzuje skrypt [`sns-demo.sh`](sns-demo.sh).

## Krok 1 — instalacja AWS CLI v2

**macOS:**

```bash
brew install awscli
# lub oficjalny instalator:
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o AWSCLIV2.pkg
sudo installer -pkg AWSCLIV2.pkg -target /
```

**Linux (x86_64):**

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip awscliv2.zip
sudo ./aws/install
```

**Windows:** instalator MSI z https://awscli.amazonaws.com/AWSCLIV2.msi

Weryfikacja:

```bash
aws --version
# aws-cli/2.x.x Python/3.x ...
```

## Krok 2 — konfiguracja poświadczeń

W konsoli AWS (IAM) utwórz access key dla swojego użytkownika (użytkownik musi mieć
uprawnienia do SNS, np. polityka `AmazonSNSFullAccess` na czas ćwiczenia), następnie:

```bash
aws configure
# AWS Access Key ID:     AKIA...
# AWS Secret Access Key: ...
# Default region name:   eu-central-1
# Default output format: json
```

Weryfikacja, że CLI działa i widzi konto:

```bash
aws sts get-caller-identity
```

## Krok 3 — utworzenie tematu SNS

```bash
aws sns create-topic --name homework-lesson31
```

Oczekiwany wynik:

```json
{
    "TopicArn": "arn:aws:sns:eu-central-1:123456789012:homework-lesson31"
}
```

Zapisz ARN do zmiennej (przyda się w kolejnych krokach):

```bash
TOPIC_ARN=$(aws sns create-topic --name homework-lesson31 --query TopicArn --output text)
echo "$TOPIC_ARN"
```

`create-topic` jest idempotentne — ponowne wywołanie z tą samą nazwą zwraca istniejący ARN.

## Krok 4 — subskrypcja e-mail

```bash
aws sns subscribe \
  --topic-arn "$TOPIC_ARN" \
  --protocol email \
  --notification-endpoint twoj.mail@example.com
```

Oczekiwany wynik:

```json
{
    "SubscriptionArn": "pending confirmation"
}
```

**Ważne:** wejdź na skrzynkę i kliknij link **Confirm subscription** w mailu od
`AWS Notifications`. Bez potwierdzenia publish nie dotrze.

Weryfikacja potwierdzenia:

```bash
aws sns list-subscriptions-by-topic --topic-arn "$TOPIC_ARN"
```

Po potwierdzeniu `SubscriptionArn` zmienia się z `PendingConfirmation` na pełny ARN.

## Krok 5 — test: publish przez CLI

```bash
aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --subject "Test SNS z AWS CLI" \
  --message "Czesc! To wiadomosc opublikowana przez aws sns publish."
```

Oczekiwany wynik:

```json
{
    "MessageId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

Po chwili wiadomość powinna pojawić się na skrzynce e-mail.

## Sprzątanie

```bash
# ARN subskrypcji z listy:
aws sns list-subscriptions-by-topic --topic-arn "$TOPIC_ARN" \
  --query 'Subscriptions[0].SubscriptionArn' --output text

aws sns unsubscribe --subscription-arn "arn:aws:sns:...:homework-lesson31:..."
aws sns delete-topic --topic-arn "$TOPIC_ARN"
```

## Skrypt automatyzujący

```bash
chmod +x sns-demo.sh
./sns-demo.sh twoj.mail@example.com            # tworzy temat, subskrybuje, czeka na potwierdzenie, publikuje
./sns-demo.sh twoj.mail@example.com --cleanup  # usuwa subskrypcję i temat
```
