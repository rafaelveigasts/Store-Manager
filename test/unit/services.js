const sinon = require('sinon');
const { expect } =  require('chai');
const connection = require('../../models/connection');
const SaleModel = require('../../models/SaleModel');
const SaleService = require('../../services/SaleService');
const ProductModel = require('../../models/ProductModel');
const ProductService = require('../../services/ProductService');

describe('Verifica se insere um produto no DB', () => {
  describe('Verifica é o produto é inserido com sucesso',() => {
    const payload = {
      name: 'Produto 1',
      quantity: 10,
    }

    before(async() => {
      sinon.stub(ProductModel, 'getAllProducts').resolves([{
        id: 1,
        name: 'Produto 1',
        quantity: 10,
      }])

      sinon.stub(ProductModel, 'createProduct').resolves({
        id: 1,
        name: 'Produto 1',
        quantity: 10,
      })
    })

    after(() => {
      ProductModel.getAllProducts.restore();
      ProductModel.createProduct.restore();
    })

    it('Retorna um obj', async () => {
      const result = await ProductService.createProduct(payload);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    })
  })

  describe('Verifica a busca de um produto', () => {
    before(async()=>{
      const execute = [[]]

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
      connection.execute.restore();
    })

    describe('Quando um produto não é localizado', async () => {
      it('Deve retornar null', async () => {
        const result = await ProductService.findProductById();
        expect(result).to.be.a('object');
      })
    })
  })
})