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

  
})