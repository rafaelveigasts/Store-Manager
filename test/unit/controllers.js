const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");

const SaleService = require("../../services/SaleService");
const ProductService = require("../../services/ProductService");
const SaleController = require("../../controllers/SaleController");
const ProductController = require("../../controllers/ProductController");

describe("Ao chamar create no controller", () => {
  describe("quando o payload não é valido", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductService, "createProduct")
        .resolves({ code: 400, message: { message: "Product not found" } });
    });

    after(() => {
      ProductService.createProduct.restore();
    });

    it("É chamado com o status 400", async () => {
      await ProductController.createProduct(request, response);

      expect(response.status.calledWith(400)).to.be.true;
    });
  });

  describe("quando o payload é inserido com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "Produto 1",
        quantity: 10,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .createStubInstance(ProductService, "createProduct")
        .resolves({ id: 1, name: "Produto 1", quantity: 10 });
    });

    after(() => {
      ProductService.createProduct.restore();
    });

    it("É retornado o código 201", async () => {
      await ProductController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });

    it("É chamado o método json com o obj", async () => {
      const response = {};
      const request = {};

      begore(() => {
        request.params = {
          id: 1000,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon
          .stub(ProductService, "findProductById")
          .resolves({ code: 404, message: { message: "Product not found" } });
      });

      after(() => {
        ProductService.findProductById.restore();
      });
    });
    it("404 é chamado1", async () => {
      await ProductController.findProductById(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });
  });
  describe("quando é localizado", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductService, "findProductById")
        .resolves({ id: 1, name: "Produto 1", quantity: 10 });
    });

    after(() => {
      ProductService.findProductById.restore();
    });

    it("É retornado o código 200", async () => {
      await ProductController.findProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("é chamado o json com objeto", async () => {
      await ProductController.findProductById(request, response);

      expect(response.json.calledWith(sinon.match.object).to.be.equal(true));
    });
  });
});

describe('Quando chama o controller do Sale', () => {
  describe('quando o payload é invalido', () => {
    const response = {}
    const request = {}

    before(()=> {
      request.body = {}

      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns()

      sinon.stub(SaleService, 'createSalesProducts').resolves({
        code: 400,
        message: {
          message: "'product_id' is required"
        }})
    })

    after(() => {
      SaleService.createSalesProducts.restore()
    })

    it('É chamado com o status 400', async () => {
      await SaleController.createSale(request, response)

      expect(response.status.calledWith(400)).to.be.true
    })
  })
  
  describe('qdo vai com sucesso', () => {
    const response = {}
    const request = {}

    before(()=> { 
      request.body = {
        product_id: 1,
        quantity: 10
      }
      
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns()
      
      sinon.stub(SaleService, 'createSalesProducts').resolves({
        id:1,
        itemsSold:[{
          product_id: 1,
          quantity: 10
        }]
      })
    })
    
    after(() => {
      SaleService.createSalesProducts.restore()
    })

    it('Chama o cod 201', async() => {
      await SaleController.createSale(request, response)

      expect(response.status.calledWith(201)).to.be.true
    })

    it('é chamado json com o obj', async() => {
      await SaleController.createSale(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.true
    })
  })
})

