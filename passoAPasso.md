[1] Primeira coisa, instalar as dependências do projeto com o npm install

[2] alterar o arquivo .env para o seu nome de usuário e senha do banco de dados do my sql.

[3] criar a conexão com o banco de dados com o arquivo connection que vai dentro da pasta models

**importante como o model é quem conversa com o banco de dados vamos começar por ele. A ordem é a sequinte: requesição > controller > services > model > database**

[5] Criar o model do product: *primeiro passo do crud - create*. Toda conexão com o banco de dados é assíncrona então sempre usaremos async/await no model.

[6] Criar o services do product: aqui é onde acontece o intermédio entre o controller e o model e onde passamos as funções do model para o controller.

[7] Criar o controller do product: aqui é onde é recebido os parametros da requisição através do body e enviados ao service.

[8] Criar o middleware de validação conforme os requisitos necessários.

[9] Começar a ajustar o index.js

[10] Para efetuar o Create do crud, utilizamos o método post, onde o controller recebe as informações e utiliza na função createProduct, então essa função é exportada e recebida no service do product, *atenção* o controller recebe um objeto, no service desestruturamos esse objeto para ter acesso somente ao que precisamos e passamos essa informação para o model. No model com a desestruturação efetuamos a query no banco de dados.