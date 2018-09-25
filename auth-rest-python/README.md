## API REST AUTH
### API de autenticação e controle de usuário

 - framework: Flask
 - banco de dados: MySQL
 
## Rodar isoladamente (sem docker)
* **pré-requisitos:**
  - instalar python (3.5+)
  - instalar MySQL ou subir um container do MySQL (https://hub.docker.com/_/mysql/)
  - instalar de client do MySQL
      - Ex.(linux-debian) => 'default-libmysqlclient-dev'
          - sudo apt-get install -y default-libmysqlclient-dev
  
* **passo a passo:**
  1) clone o repositório: git clone https://github.com/betonr/teste-back.git
  2) cd teste-back/auth-rest-python
  3) sudo pip3 install --no-cache-dir -r requirements.txt
  
      **subindo o banco**:
      - python3 manage.py db init
      - python3 manage.py db migrate
      - python3 manage.py db upgrate
  
  4) FLASK_ENV=development python3 app.py **ou** FLASK_ENV=production python3 app.py
  
* **TEST:** 
    - para rodar os casos de testes => FLASK_ENV=test python3 test.py

    * **obs:** antes de executar os testes é necessário inserir um usuário administrador no banco de dados
       - Tem-se um exemplo do insert no seguinte arquivo: https://github.com/betonr/teste-back/blob/master/dockers/mysql/users.sql
