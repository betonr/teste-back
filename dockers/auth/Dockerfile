FROM python:3.6

WORKDIR /usr/src/auth

COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update
RUN apt-get install -y default-libmysqlclient-dev

EXPOSE 5000

CMD [ "python", "app.py" ]