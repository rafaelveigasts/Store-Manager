[1] Primeira coisa, instalar as dependências do projeto com o npm install

[2] alterar o arquivo .env para o seu nome de usuário e senha do banco de dados do my sql.

[3] criar a conexão com o banco de dados com o arquivo connection que vai dentro da pasta models

**importante como o model é quem conversa com o banco de dados vamos começar por ele. A ordem é a sequinte: requesição > controller > services > model > database**

[5] Criar o model do product: *primeiro passo do crud - create*. Toda conexão com o banco de dados é assíncrona então sempre usaremos async/await no model.

[6] Criar o services do product: aqui é onde acontece o intermédio entre o controller e o model e onde passamos as funções do model para o controller.

