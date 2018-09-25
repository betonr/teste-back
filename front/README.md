## Aplicação
 - SPA (single page application)
 - Framework: Vue.js
 - Plugins: 
   - request: axios
   - design: element-ui e vue-material
   - routes: vue-router
   - test: jest
   - store: vuex
   - validação de form: vee-validate
 - Build: 
   - webpack
   
## Arquitetura
  ![diagram architecture_front](https://github.com/betonr/teste-back/blob/master/front/diagram%20test-allgoo-back-static.jpg)

## Rodar isoladamente (sem docker)
* **pré-requisitos:**
  - instalar Node.js (6+)
  - instalar npm (5+)
  
* **passo a passo:**
  1) clone o repositório: git clone https://github.com/betonr/teste-back.git
  2) cd teste-back/front
  3) npm install
  4) npm start
  
  *TEST: para rodar os casos de testes => npm run test
  
  *BUILD:para gerar o build da aplicação => npm run build
