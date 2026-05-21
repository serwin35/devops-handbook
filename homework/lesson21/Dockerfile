FROM python:3.12-slim

LABEL org.opencontainers.image.title="devops-handbook-hello"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.authors="serwin <mateusz.serwinowski@gmail.com>"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/serwin/devops-handbook"
LABEL org.opencontainers.image.url="https://hub.docker.com/r/serwin/devops-handbook-hello"
LABEL org.opencontainers.image.documentation="https://hub.docker.com/r/serwin/devops-handbook-hello"


ENV GREETING_NAME="Student DevOps"
ENV PYTHONUNBUFFERED=1

RUN groupadd --system --gid 10001 appuser \
 && useradd  --system --uid 10001 --gid appuser --home /app --shell /sbin/nologin appuser \
 && mkdir -p /app \
 && chown -R appuser:appuser /app

WORKDIR /app

COPY --chown=appuser:appuser app.py /app/app.py

USER appuser

CMD ["python", "app.py"]
