## DOCKERS
* **pré-requisitos:**
  1) instalar docker (https://docs.docker.com/install/) => 18+
  2) instalar docker-compose (https://docs.docker.com/compose/install/) => 1.22+
  3) possuir conexão com a internet
  
### **Executar todos os serviços (passo a passo):**
  1) clone o repositório: git clone https://github.com/betonr/teste-back.git
  2) cd teste-back/dockers
  3) docker-compose up -d
  
  **subir o banco de dados (mysql)**
  
  4) executar o arquivo setupDatabase.sh
      - Ex.(ubuntu): sh setupDatabase.sh
    
  **confira o serviços:**
  - acesse http://localhost:8086/healthcheck (verifique se os três serviços estão com status = OK)
  - outros links:
    - portal = http://localhost:8086/portal
    - portainer = http://localhost:8086/dockers/
    - docs = http://localhost:8086/docs/auth/ ou http://localhost:8086/docs/question/
