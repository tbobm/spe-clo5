FROM kennethreitz/pipenv
ADD . /app
WORKDIR /app
RUN pipenv install
EXPOSE 80
CMD ["pipenv", "run", "flask", "run"]
