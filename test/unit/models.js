const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");
const ProductModel = require("../../models/Product");
const SaleModel = require("../../models/Sale");

describe("Verifica se o produto é inserido no DB", () => {
  const payload = {
    id: 1,
    name: "produto",
    quantity: 10,
  };

  before(async () => {
    const execute = [
      {
        id: 1,
        name: "produto",
        quantity: 10,
      },
    ];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Verifica se o produto é inserido com sucesso no DB", () => {
    it("Deve retornar um objeto com o produto inserido", async () => {
      const result = await ProductModel.createProduct(payload);
      expect(result).to.be.a("object");
    });

    it("O objeto deve ter as propriedades corretas", async () => {
      const result = await ProductModel.createProduct(payload);
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
    });
  });
});

describe("Verifica se o produto está no DB", () => {
  before(async () => {
    const execute = {
      id: 1,
      name: "produto A",
      quantity: 10,
    };

    sinon.stub(ProductModel, "findProductById").resolves(execute);
  });

  after(async () => {
    ProductModel.findProductById.restore();
  });

  describe("Verifica se um produto é localizado com sucesso", () => {
    it("Deve retornar um objeto com o produto localizado", async () => {
      const result = await ProductModel.findProductById(1);
      expect(result).to.be.a("object");
    });

    it("O objeto deve ter as propriedades corretas", async () => {
      const result = await ProductModel.findProductById(1);
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
    });
  });
});

describe("Verifica se um produto não é localizado", () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("Deve retornar um null", async () => {
    const result = await ProductModel.findProductById();

    expect(result).to.be.equal(null);
  });
});

describe("Verifica se a venda é inserida corretamente no DB", () => {
  const payload = [
    [1, 1, 2],
    [2, 1, 5],
  ];

  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "query").resolves(execute);
  });

  after(async () => {
    connection.query.restore();
  });

  it("Deve retornar um objeto com o id da venda", async () => {
    const result = await SaleModel.createSalesProducts(payload);
    expect(result).to.be.a("object");
    expect(result).to.have.a.property("id");
  });
});

describe("Verifica se uma venda é encontrada no DB", () => {
  before(async () => {
    sinon.stub(SaleModel, "getSaleById").resolves([
      {
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2,
      },
      {
        date: "2021-09-09T04:56:29.000Z",
        product_id: 2,
        quantity: 5,
      },
    ]);
  });

  after(async () => {
    SaleModel.getSaleById.restore();
  });

  describe("Quando a venda é localizada verifica se:", () => {
    it("Retorna um array", async () => {
      const result = await SaleModel.getSaleById(1);
      expect(result).to.be.a("array");
    });

    it("O array está populado", async () => {
      const result = await SaleModel.getSaleById(1);
      expect(result).length.greaterThan(0);
    });
  });
});

describe("Verifica se a venda não é localizada", async () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("Retorna um null", async () => {
    const result = await SaleModel.getSaleById(1);
    expect(result).to.be.equal(null);
  });
});

describe("Verifica se lista todas as vendas", () => {
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

    sinon.stub(SaleModel, "getAllSales").resolves(execute);
  });

  after(async () => {
    SaleModel.getAllSales.restore();
  });
});

describe("Quando a venda é localizada", () => {
  it("Retorna um objeto", async () => {
    const result = await SaleModel.getAllSales();
    expect(result).to.be.a('array');
  });

  it("O array está populado", async () => {
    const result = await SaleModel.getAllSales();
    expect(result).length.greaterThan(0);
  });
});

describe('Remove um produto no DB', () => {
  describe('Remove com sucesso no DB',async() => {
    const payload = 1;

    before(async() => {
      const execute = [{ affectedRows: 1 },{}];
      sinon.stub(connection,'execute').resolves(execute);
    })
    after(async() => {
      connection.execute.restore();
    })
    it('retotna um boolean', async() => {
      const response = await ProductModel.deleteProductById(payload);
      expect(response).to.be.a('boolean');
      expect(response).to.be.equal(true);
    });
  })
  describe('não remove com sucesso no DB',async() => {
    const payload = 10;

    before(async() => {
      const execute = [{},{}];
      sinon.stub(connection,'execute').resolves(execute);
    })
    after(async() => {
      connection.execute.restore();
    })
    it('retotna um boolean', async() => {
      const response = await ProductModel.deleteProductById(payload);
      expect(response).to.be.equal(null);
    });
  })
});