[1] Primeira coisa, instalar as dependências do projeto com o npm install

[2] alterar o arquivo .env para o seu nome de usuário e senha do banco de dados do my sql.

[3] criar a conexão com o banco de dados com o arquivo connection que vai dentro da pasta models

**importante como o model é quem conversa com o banco de dados vamos começar por ele. A ordem é a sequinte: requesição > controller > services > model > database**

[5] Criar o model do product: _primeiro passo do crud - create_. Toda conexão com o banco de dados é assíncrona então sempre usaremos async/await no model.

[6] Criar o services do product: aqui é onde acontece o intermédio entre o controller e o model e onde passamos as funções do model para o controller.

[7] Criar o controller do product: aqui é onde é recebido os parametros da requisição através do body e enviados ao service.

[8] Criar o middleware de validação conforme os requisitos necessários.

[9] Começar a ajustar o index.js

[10] Para efetuar o Create do crud, utilizamos o método post, onde o controller recebe as informações e utiliza na função createProduct, então essa função é exportada e recebida no service do product, _atenção_ o controller recebe um objeto, no service desestruturamos esse objeto para ter acesso somente ao que precisamos e passamos essa informação para o model. No model com a desestruturação efetuamos a query no banco de dados.

[11] Para efetuar o Read do crud, utilizamos o método get, aqui é um pouco diferente pois os dados estão todos no BD, isso significa que o controller não recebe nada específico na requisição, ele faz a query direto no bd e retorna os resultados.

[12] Para efetuar o Update do crud, utilizamos o método put, onde o controller recebe as informações da requisição, o id pelos params e o nome e quantidade pelo body e utiliza na função updateProductById, então essa função é exportada e recebida no service do product, que só repassa pro model os dados a serem atualizados atrávez da query.

[13] Para efetuar o Delete do crud, utilizamos o método delete, onde o controller recebe as informações do id a ser deletado pelo param e utiliza na função deleteProductById, então essa função é exportada e recebida no service do product, _atenção_ o controller recebe um objeto, no service desestruturamos esse objeto para ter acesso somente ao que precisamos e passamos essa informação para o model. No model com a desestruturação efetuamos a query no banco de dados.

A PARTIR DESSE PONTO SE TRATA DAS VENDAS

[14] A idéia geral é que cada venda seja um objeto com um id e um objeto dentro com os produtos, ou seja, {id:1, {produto: a, qtde:2} }, para isso a melhor forma de abstrair o pensamento é fazer o caminho inverso, do controller até o model.

[15] No controller definimos a função createSale que dessa vez irá receber TODO o body da requisição e passar para a função createSaleProduct no server. Atribuimos uma variável sale para podermos passar ao service as mensagens de erro. Nesta variável aguardamos o service criar o produto de Vendas com todo o body da requisição.

[16] No service a função create Sale vai abrir um espaço no banco de dados e a função createSalesProducts que vai receber todo o body, vai passar pelas validações. Atribuimos uma variavel id a função createSale e outra variável sales que retornará um array com o id(da venda), id do produto e quantidade e retornamos no formato {id: x, itemvendido{id do produto:y, quantidade:z}}

[17] no model a função create sale abre o espaço vazio e a createSalesProducts insete o valor do arry nela.