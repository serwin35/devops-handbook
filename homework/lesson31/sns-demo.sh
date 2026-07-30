#!/usr/bin/env bash
#
# Zadanie domowe do lekcji 31: SNS przez AWS CLI.
#
# Użycie:
#   ./sns-demo.sh adres@email.com             # utworzenie tematu, subskrypcja, publish
#   ./sns-demo.sh adres@email.com --cleanup   # usunięcie subskrypcji i tematu
#
set -euo pipefail

TOPIC_NAME="homework-lesson31"

if [[ $# -lt 1 ]]; then
  echo "Użycie: $0 <adres-email> [--cleanup]" >&2
  exit 1
fi

EMAIL="$1"
MODE="${2:-run}"

echo "==> Tworzenie/pobieranie tematu ${TOPIC_NAME}"
TOPIC_ARN=$(aws sns create-topic --name "$TOPIC_NAME" --query TopicArn --output text)
echo "    TopicArn: ${TOPIC_ARN}"

subscription_arn() {
  aws sns list-subscriptions-by-topic --topic-arn "$TOPIC_ARN" \
    --query "Subscriptions[?Endpoint=='${EMAIL}'].SubscriptionArn | [0]" \
    --output text
}

if [[ "$MODE" == "--cleanup" ]]; then
  SUB_ARN=$(subscription_arn)
  if [[ "$SUB_ARN" == arn:aws:sns:* ]]; then
    echo "==> Usuwanie subskrypcji ${SUB_ARN}"
    aws sns unsubscribe --subscription-arn "$SUB_ARN"
  else
    echo "==> Brak potwierdzonej subskrypcji do usunięcia (status: ${SUB_ARN})"
  fi
  echo "==> Usuwanie tematu"
  aws sns delete-topic --topic-arn "$TOPIC_ARN"
  echo "Posprzątane."
  exit 0
fi

SUB_ARN=$(subscription_arn)
if [[ "$SUB_ARN" == "None" || -z "$SUB_ARN" ]]; then
  echo "==> Tworzenie subskrypcji e-mail dla ${EMAIL}"
  aws sns subscribe \
    --topic-arn "$TOPIC_ARN" \
    --protocol email \
    --notification-endpoint "$EMAIL" >/dev/null
fi

echo "==> Czekam na potwierdzenie subskrypcji — kliknij link 'Confirm subscription' w mailu"
for _ in $(seq 1 30); do
  SUB_ARN=$(subscription_arn)
  if [[ "$SUB_ARN" == arn:aws:sns:* ]]; then
    echo "    Subskrypcja potwierdzona: ${SUB_ARN}"
    break
  fi
  printf '.'
  sleep 10
done
echo

if [[ "$SUB_ARN" != arn:aws:sns:* ]]; then
  echo "Subskrypcja nadal niepotwierdzona — potwierdź maila i uruchom skrypt ponownie." >&2
  exit 1
fi

echo "==> Publikacja wiadomości testowej"
MESSAGE_ID=$(aws sns publish \
  --topic-arn "$TOPIC_ARN" \
  --subject "Test SNS z AWS CLI" \
  --message "Czesc! To wiadomosc opublikowana przez aws sns publish ($(date))." \
  --query MessageId --output text)

echo "    MessageId: ${MESSAGE_ID}"
echo "Sprawdź skrzynkę ${EMAIL}."
