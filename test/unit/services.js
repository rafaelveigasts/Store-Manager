const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../models/connection");
const SaleModel = require("../../models/SaleModel");
const SaleService = require("../../services/SaleService");
const ProductModel = require("../../models/ProductModel");
const ProductService = require("../../services/ProductService");

describe("Verifica se insere um produto no DB", () => {
  describe("Verifica é o produto é inserido com sucesso", () => {
    const payload = {
      name: "Produto 1",
      quantity: 10,
    };

    before(() => {
      sinon.stub(ProductModel, "getAllProducts").resolves([
        {
          id: 11,
          name: "Produto 1",
          quantity: 11,
        },
      ]);

      sinon.stub(ProductModel, "createProduct").resolves({
        id: 1,
        name: "teste 1",
        quantity: 11,
      });
    });

    after(() => {
      ProductModel.getAllProducts.restore();
      ProductModel.createProduct.restore();
    });

    it("Retorna um obj", async () => {
      const result = await ProductService.createProduct(payload);
      expect(result).to.be.an("object");
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
      const execute = [
        {
          id: 1,
          name: "Produto 1",
          quantity: 10,
        },
      ];

      sinon.stub(ProductModel, "findProductById").resolves(execute);
    });

    after(async () => {
      ProductModel.findProductById.restore();
    });

    it('O objeto é retornado corretamente', async() => {
      const result = await ProductService.findProductById(1);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    })
  });

  describe('Verifica se a venda é inserida no DB', () => {
    describe('Verifica se a venda é inserida com sucesso', () => {
      const execute =[[{product_id:1, quantity:1}]]
      before(() => {
        const payload = { id:1 }
        sinon.stub(SaleModel, 'createSale').resolves(1)
        sinon.stub(SaleModel, 'createSalesProducs').resolves(payload)
      })

      after(() => {
        SaleModel.createSale.restore()
        SaleModel.createSalesProducs.restore()
      })

      it('Deve retornar um objeto com o produto inserido', async() => { 
        const result = await SaleService.createSale()
        expect(result).to.be.an('object')
        expect(result).to.have.property('id')
        expect(result).to.have.property('itemsSold')
      })
    })
  })

  describe('Quando a venda é localizada com sucesso', () => {
    before(async() => {
      const execute =  [
        { 
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2
        }
      ]
      sinon.stub(SaleModel, 'getSaleById').resolves(execute)
    })

    after(async() => {
      SaleModel.getSaleById.restore()
    })

    it('Deve retornar um array', async() => {
      const result = await SaleService.getSaleById(1)
      expect(result).to.be.an('array')
      expect(result).to.have.property('date')
      expect(result).to.have.property('product_id')
      expect(result).to.have.property('quantity')
    })

    it('O array deve estar populado', async()=> {
      const result = await SaleService.getSaleById(1)
      expect(result).to.be.an('array')
      expect(result).length.greaterThan(0)
    })
  })

  describe('Lista todas as vendas', async() => {
    before(async() => {
      const execute = [
        { 
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2
        }
      ]

      sinon.stub(SaleModel, 'getAllSales').resolves(execute)
    })

    after(async() => {
      SaleModel.getAllSales.restore()
    })

    it('Deve retornar um array', async() => {
      const result = await SaleService.getAllSales()
      expect(result).to.be.an('array')
      expect(result).to.have.property('date')
      expect(result).to.have.property('product_id')
      expect(result).to.have.property('quantity')
    })

    it('O array deve estar populado', async()=> {
      const result = await SaleService.getAllSales()
      expect(result).to.be.an('array')
      expect(result).length.greaterThan(0)
    })
  })
