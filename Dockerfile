FROM python:3.11-slim-bookworm

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENV CONFIG_FILE_PATH="/app/config.toml"

CMD ["python3", "adelite/adelite.py", "-c", "$CONFIG_FILE_PATH"]