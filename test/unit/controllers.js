const sinon = require('sinon');
const {expect} = require('chai');

const connection = require('../../models/connection');

const SaleService = require('../../services/SaleService');
const ProductService = require('../../services/ProductService');
const SaleController = require('../../controllers/SaleController');
const ProductController = require('../../controllers/ProductController');

describe('Ao chamar create no controller', () => {
  describe('quando o payload não é valido', () => {
    const response = {}
    const request = {}

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'createProduct').resolves({code:400, message: {message: 'Product not found'}});
    })

    after(()=>{
      ProductService.createProduct.restore();
    })

    it('É chamado com o status 400', async () =>{
      await ProductController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.true;
    })
  })
})