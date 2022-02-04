const sinon = require("sinon");
const { expect } = require("chai");

const SaleService = require("../../services/Sale");
const ProductService = require("../../services/Product");
const SaleController = require("../../controllers/Sale");
const ProductController = require("../../controllers/Product");

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
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });

  describe("quando o payload é inserido com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "teste 1",
        quantity: 2,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(ProductService, "createProduct")
        .resolves({ id: 1, name: "Produto 1", quantity: 2 });
    });

    after(() => {
      ProductService.createProduct.restore();
    });

    it("É retornado o código 201", async () => {
      await ProductController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("É chamado o método json com o obj", async () => {
      await ProductController.createProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Ao chamar o controller com findProductById", () => {
  describe("quando não existe o produto", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 100,
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
    
    it("404 é chamado1", async () => {
      await ProductController.findProductById(request, response);
      
      expect(response.status.calledWith(404)).to.equal(true);
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
        .resolves({ id: 1, name: "produto A", quantity: 10 });
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

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Quando chama o controller do Sale", () => {
  describe("quando o payload é invalido", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, "createSalesProducts").resolves({
        code: 400,
        message: {
          message: '"product_id" is required',
        },
      });
    });

    after(() => {
      SaleService.createSalesProducts.restore();
    });

    it("É chamado com o status 400", async () => {
      await SaleController.createSale(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });

  describe("qdo vai com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        product_id: 1,
        quantity: 5,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, "createSalesProducts").resolves({
        id: 1,
        itemsSold: [
          {
            product_id: 1,
            quantity: 5,
          },
        ],
      });
    });

    after(() => {
      SaleService.createSalesProducts.restore();
    });

    it("Chama o cod 201", async () => {
      await SaleController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it("é chamado json com o obj", async () => {
      await SaleController.createSale(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Ao chamao o controler de getSaleById", () => {
  describe("quando o payload não é valido", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon
        .stub(SaleService, "getSaleById")
        .resolves({ code: 404, message: { message: "Sale not found" } });
    });

    after(() => {
      SaleService.getSaleById.restore();
    });

    it("É chamado com o status 404", async () => {
      await SaleController.getSaleById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("quando a venda é localizada com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, "getSaleById").resolves([
        {
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2,
        },
      ]);
    });

    after(() => {
      SaleService.getSaleById.restore();
    });

    it("É chamado com o status 200", async () => {
      await SaleController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("É chamado o json com o objeto", async () => {
      await SaleController.getSaleById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe("Ao chamar o controller de getAllSales", () => {
  describe("quando litas todas as vendas com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub(SaleService, "getAllSales").resolves([
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2,
        },
      ]);
    });

    after(() => {
      SaleService.getAllSales.restore();
    });

    it("É chamado com o status 200", async () => {
      await SaleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("É chamado o json com o objeto", async () => {
      await SaleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
