FROM python:3.8
WORKDIR /app
COPY scripts /scripts
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN python -m flask db upgrade
CMD [ "python", "-m",  "flask", "run"]
