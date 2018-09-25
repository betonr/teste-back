# Teste back-end Allgoo
 > CASE: https://github.com/Allgoo/teste-back

# APLICAÇÃO
 > DEMO: https://betonoronha.com.br/portal
 
 # ARQUITETURA
 Baseada no conceito de micro serviços, foi construida uma arquitetura com dockers que conta com dois serviços no back-end e front-end servido estaticamente através do orquestrador web (NGINX);
 
 ![diagram architecture_full](https://github.com/betonr/teste-back/blob/master/diagram_test_allgoo_back.jpg)
 
 # EXECUÇÃO DOS SERVIÇOS
 * **pré-requisito:**
    - instalar docker (18+)
    - instalar docker-compose (1.22+)
    - possuir conexão com a internet
  
 * **executar (passo a passo):**
    - link: https://github.com/betonr/teste-back/tree/master/dockers
 
 # ESPECIFICAÇÃO
 * **front-end:**
   Desenvolvido com o framework Vue.js, a aplicação é uma SPA(single page application) na qual é servida estaticamente pelo servidor web (NGINX);
   
   O front-end conta com dois setores da aplicação: o de usuário comum e o de usuário administrador
      1. O setor do usuário comum, posssibilita o controle de publicações, a votação em uma determinada informação publica(que no seja sua) e os ranking dos usuários cadastrados(por honestidade e/ou por pontuação). Para acessar esse setor, faz-se necessário realizar o login via facebook;
      2. Já o setor de aministradores, possiblita verificar os logs de transações (realizadas ao transferir pontos a outros usuários depois de uma votação). Para acessar esse setor, o admin deve clicar no botão "login - administrador" e preencher os dados com:
         - email: admin@admin.com
         - senha: admin
      
   - link do código e demais infos: https://github.com/betonr/teste-back/tree/master/front
   
 * **Micro serviço de autenticação:**
   O micro serviço de 'autenticaço' é responsável pelo controle de usuário (CRUD e authenticação) da aplicação como um todo. Nesse micro serviço, foi utilizado o banco de dados relacional, chamado MySQL.
    - linguagem: Python
    - banco de dados: MySQL
    - framework: Flask (python 3)
    - link da documentação do microserviço: https://betonoronha.com.br/docs/auth/
    - link do código e demais infos: https://github.com/betonr/teste-back/tree/master/auth-rest-python

 * **Micro serviço de questões:**
   O micro serviço de 'questões' é responsável pelo controle das publicações realizadas na aplicação, ou seja, é através dele que são publicadas as questões/informações para sejam respondidas por outros usuário. Além disso, é esse serviço que faz todo o controle de pontuação e transações da aplicação. Para armazenamento dos dados foi utilizado o banco de dados não relacional, chamado MongoDB.
    - linguagem: Node
    - banco de dados: MongoDB
    - framework: Express (Node.js 8)
    - link da documentação do microserviço: https://betonoronha.com.br/docs/question/
    - link do código e demais infos: https://github.com/betonr/teste-back/tree/master/questions-rest-node
    
 * **Healthcheck:**
   Para a consulta do status dos serviços, foi implementado uma página web que faz as requisições aos microserviços e devolve se está 'OK', além disso, temos o portainer que possíbilita verificação das informações e logs dos containers executados.
    - link da página estática: https://betonoronha.com.br/healthcheck/
    - link do portainer: https://betonoronha.com.br/dockers/
      - usuário do portainer: admin
      - senha do portainer: adminadmin 
  
