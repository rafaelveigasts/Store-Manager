const sinon = require ('sinon');
const { expect } = require ('chai');
const connection = require('../../models/connection');
const SaleModel = require('../../models/SaleModel');
const ProductModel = require('../../models/ProductModel');

describe('Verifica se o produto é inserido no DB', () => {
  const payload ={
    id: 1,
    name: 'Produto 1',
    quantity: 10,
  }

  before(async() => {
    const execute =[{
      id: 1,
      name: 'Produto 1',
      quantity: 10,
    }]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after( async()=>{
    connection.execute.restore();
  })

  describe('Verifica se o produto é inserido com sucesso no DB', () => {
    it('Deve retornar um objeto com o produto inserido', async() => {
      const result = await ProductModel.createProduct(payload);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    })
  })

  describe('Verifica se o produto está no DB', () => {
    before( async() => {
      const execute ={
        id: 1,
        name: 'Produto 1',
        quantity: 10,
      }

      sinon.stub(ProductModel, 'findById').resolves(execute);
    })

    after( async()=> {
      ProductModel.findById.restore();
    })
  })

  describe('Verifica se um produto é localizado com sucesso', () => {
    it('Deve retornar um objeto com o produto localizado', async() => {
      const result = await ProductModel.findById(payload.id);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    })
  })

  describe('Verifica se um produto não é localizado', () => {
    before( async() => {
      const execute =[[]];

      sinon.stub(ProductModel, 'execute').resolves(execute);
    })

    after( async()=> {
      ProductModel.findById.restore();
    })

    it('Deve retornar um null', async() => {
      const result = await ProductModel.findById(payload.id);
     
      expect(result).to.be.null;
    })
  })

  describe('Verifica se a venda é inserida corretamente no DB', () => {
    const payload = [[1,1,2], [2,1,5]];

    before( async() => {
      const execute =[{ insertId: 1 }];

      sinon.stub(connection, 'query').resolves(execute);
    })

    after( async()=> {
      connection.query.restore();
    })

    it('Deve retornar um objeto com o id da venda', async() => {
      const result = await SaleModel.createSalesProducts(payload);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
    })
  })

  describe('Verifica se uma venda é encontrada no DB', () => {
    before( async () => {
      sinon.stub(SaleModel, 'getSaleById').resolves([{
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:56:29.000Z",
        product_id: 2,
        quantity: 5
      }
    ]);
    })

    after( async() => {
      SaleModel.getSaleById.restore();
    })
  })
})