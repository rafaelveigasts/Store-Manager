const sinon = require("sinon");
const { expect } = require("chai");
const ProductService = require("../../services/Product");
const SaleService = require("../../services/Sale");
const ProductModel = require("../../models/Product");
const SaleModel = require("../../models/Sale");
const connection = require("../../models/connection");

describe("Verifica se insere um produto no DB", () => {
  describe("Verifica é o produto é inserido com sucesso", () => {
    const payload = {
      name: "teste2",
      quantity: 2,
    };

    before(() => {
      sinon.stub(ProductModel, "getAllProducts").resolves([
        {
          id: 1,
          name: "teste",
          quantity: 4,
        },
      ]);

      sinon.stub(ProductModel, "createProduct").resolves({
        id: 1,
        name: "teste",
        quantity: 2,
      });
    });

    after(() => {
      ProductModel.getAllProducts.restore();
      ProductModel.createProduct.restore();
    });

    it("Retorna um obj", async () => {
      const result = await ProductService.createProduct(payload);
      expect(result).to.be.a("object");
    });

    it("O objeto deve ter as propriedades corretas", async () => {
      const result = await ProductService.createProduct(payload);
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
    });
  });
});

describe("Verifica a busca de um produto", () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Quando um produto não é localizado", async () => {
    it("Deve retornar null", async () => {
      const result = await ProductService.findProductById();
      expect(result).to.be.a("object");
    });
  });
});

describe("Quando o produto é localizado", async () => {
  before(async () => {
    const execute ={
        id: 1,
        name: "produto",
        quantity: 10,
      }
    

    sinon.stub(ProductModel, "findProductById").resolves(execute);
  });

  after(async () => {
    ProductModel.findProductById.restore();
  });

  it("O objeto é retornado corretamente", async () => {
    const result = await ProductService.findProductById(1);
    expect(result).to.be.a('object');
  });

  it("O objeto deve ter as propriedades corretas", async () => {
    const result = await ProductService.findProductById(1);
    console.log('94',result);
    expect(result).to.include.all.keys("id", "name", "quantity");
  });
});

describe("Verifica se a venda é inserida no DB", () => {
  describe("Verifica se a venda é inserida com sucesso", () => {
    const execute = [[{ product_id: 1, quantity: 1 }]];
    before(() => {
      const payload = { id: 1 };
      sinon.stub(SaleModel, "createSale").resolves(1);
      sinon.stub(SaleModel, "createSalesProducts").resolves(payload);
    });

    after(() => {
      SaleModel.createSale.restore();
      SaleModel.createSalesProducts.restore();
    });

    it("Deve retornar um objeto com o produto inserido", async () => {
      const result = await SaleService.createSalesProducts(execute);
      console.log('116', result);
      expect(result).to.be.a("object");
    });
  });
});

describe("Busca uma venda no Db", () => {
  describe("Quando a venda não é localizada", () => {
    before(() => {
      sinon.stub(SaleModel, "getSaleById").resolves(null);
    });

    after(() => {
      SaleModel.getSaleById.restore();
    });

    it("Deve retornar um objeto ", async () => {
      const result = await SaleService.getSaleById();
      expect(result).to.be.a("object");
    });
  });
});

describe("Quando a venda é localizada com sucesso", () => {
  before(async () => {
    const execute = [
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
    ];
    sinon.stub(SaleModel, "getSaleById").resolves(execute);
  });

  after(async () => {
    SaleModel.getSaleById.restore();
  });

  it("Deve retornar um array", async () => {
    const result = await SaleService.getSaleById(1);
    expect(result).to.be.an("array");
  });

  it("O array deve estar populado", async () => {
    const result = await SaleService.getSaleById(1);
    expect(result).to.be.an("array");
    expect(result).length.greaterThan(0);
  });
});

describe("Lista todas as vendas", async () => {
  before(async () => {
    const execute = [
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
    ];

    sinon.stub(SaleModel, "getAllSales").resolves([execute]);
  });

  after(async () => {
    SaleModel.getAllSales.restore();
  });

  it("Deve retornar um array", async () => {
    const result = await SaleService.getAllSales();
    expect(result).to.be.a("array");
  });

  it("O array deve estar populado", async () => {
    const result = await SaleService.getAllSales();
    expect(result).length.greaterThan(0);
  });
});

describe("Remove um produto no BD", () => {
  describe("quando é removido com sucesso", () => {
    const payload = 1;

    before(() => {
      sinon.stub(ProductModel, "deleteProductById").resolves(true);
      sinon.stub(ProductModel, "findProductById").resolves({ id: 1 });
    });

    after(() => {
      ProductModel.deleteProductById.restore();
      ProductModel.findProductById.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductService.deleteProductById(payload);
      expect(response).to.be.a("object");
    });

    it('tal objeto possui o "id" do produto deletado', async () => {
      const response = await ProductService.deleteProductById(payload);
      expect(response).to.have.a.property("id");
    });
  });

  describe("quando não é removido com sucesso", () => {
    const payload = 1;

    before(() => {
      sinon.stub(ProductModel, "deleteProductById").resolves(null);
      sinon.stub(ProductModel, "findProductById").resolves();
    });

    after(() => {
      ProductModel.deleteProductById.restore();
      ProductModel.findProductById.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductService.deleteProductById(payload);
      expect(response).to.be.a("object");
    });

    it("tal objeto possui a chave message e code", async () => {
      const response = await ProductService.deleteProductById(payload);
      const { message } = response.message;
      expect(response).to.have.a.property("code");
      expect(response).to.have.a.property("message");
      expect(response.message).to.be.a("object");
      expect(message).to.be.equal("Product not found");
    });
  });
});
