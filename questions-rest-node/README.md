## API REST QUESTION
### API de controle de questões/pontuações e transações

 - framework: Express (Node.js)
 - banco de dados: MongoDB
 - build: typescript
 
## Rodar isoladamente (sem docker)
* **pré-requisitos:**
  - instalar Node.js (8+)
  - instalar npm (5+)
  - instalar MongoDB ou subir um container do MongoDB (https://hub.docker.com/_/mysql/)
  
* **passo a passo:**
  1) clone o repositório: git clone https://github.com/betonr/teste-back.git
  2) cd teste-back/questions-rest-node
  3) npm install 
  4) npm run build
  
  5) npm run dev **ou** npm start
  
* **TEST:** 
    - para rodar os casos de testes => npm t
