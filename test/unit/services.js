const sinon = require('sinon');
const { expect } = require('chai');
const ProductService = require('../../services/Product');
const SaleService = require('../../services/Sale');
const ProductModel = require('../../models/Product');
const SaleModel = require('../../models/Sale');
const connection = require('../../models/connection');

describe('Insere um novo produto no BD', () => {
  describe('quando é inserido com sucesso', () => {
    const payload = { name: 'teste2', quantity: 2 };

    before(() => {

      sinon.stub(ProductModel,'getAll')
        .resolves([{ id:1, name:'teste', quantity:4 }])

      sinon.stub(ProductModel,'create')
        .resolves({
          id: 1,
          name: 'teste',
          quantity: 2,
        });
    });

    after(() => {
      ProductModel.create.restore();
      ProductModel.getAll.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payload);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await ProductService.create(payload);
      expect(response).to.have.a.property('name');
    });

  });

});

describe('Busca um produto no DB', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('quando não localiza um produto no DB', async() => {
    it('retorna null',async() => {
      const result = await ProductService.findById();
      expect(result).to.be.a('object');
    })
  })
})

describe('quando localiza um produto no DB', async() => {

  before(async() => {
    const execute = {
      id: 1,
      name: "produto",
      quantity: 10,
    }
    sinon.stub(ProductModel,'findById').resolves(execute);
  })

  after(async() => {
    ProductModel.findById.restore();
  })

  it('retorna um objeto',async() => {
    const result = await ProductService.findById(1);
    expect(result).to.be.a('object');
  })

  it('o objeto possui as propriedades necessarias',async() => {
    const result = await ProductService.findById(1);
    expect(result).to.include.all.keys('id', 'name', 'quantity');
  })
})

describe('Insere uma venda no DB', () => {

  describe('quando é inserido a venda com sucesso',() => {
    const execute = [[{product_id: 1, quantity:1}]]
    before(() => {
      const payload = { id: 1 }
      sinon.stub(SaleModel,'createSale')
      .resolves(1)
      sinon.stub(SaleModel,'createSalesProducts')
      .resolves(payload)
    })
    after(() => {
      SaleModel.createSale.restore();
      SaleModel.createSalesProducts.restore();
    })

    it('retorna um objeto',async() => {
      const response = await SaleService.createSalesProducts(execute);
      expect(response).to.be.a('object');
    })
  })
})

describe('Busca uma venda no DB', () => {
  describe('quando não localiza uma venda no DB', async() => {
    before(() => {
      sinon.stub(SaleModel,'getById')
      .resolves(null)
    })
    after(() => {
      SaleModel.getById.restore();
    })
    it('retorna um objeto',async() => {
      const result = await SaleService.getById();
      expect(result).to.be.a('object');
    })
  })
})

describe('quando localiza uma venda no DB', async() => {

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
    sinon.stub(SaleModel,'getById').resolves(execute);
  })

  after(async() => {
    SaleModel.getById.restore();
  })

  it('retorna um array',async() => {
    const result = await SaleService.getById(1);
    expect(result).to.be.a('array');
  })

  it('o array não esta vazio',async() => {
    const result = await SaleService.getById(1);
    expect(result).length.greaterThan(0);
  })
})


describe('lista todas as vendas com sucesso', async() => {

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
    sinon.stub(SaleModel,'getAll').resolves(execute);
  })

  after(async() => {
    SaleModel.getAll.restore();
  })

  it('retorna um array',async() => {
    const result = await SaleService.getAll();
    expect(result).to.be.a('array');
  })

  it('o array não esta vazio',async() => {
    const result = await SaleService.getAll();
    expect(result).length.greaterThan(0);
  })
})

describe('Remove um produto no BD', () => {
  describe('quando é removido com sucesso', () => {
    const payload = 1;

    before(() => {
      sinon.stub(ProductModel,'deleteProduct')
        .resolves(true)
      sinon.stub(ProductModel,'findById')
        .resolves({ id: 1 })
    });

    after(() => {
      ProductModel.deleteProduct.restore();
      ProductModel.findById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.deleteProduct(payload);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do produto deletado', async () => {
      const response = await ProductService.deleteProduct(payload);
      expect(response).to.have.a.property('id');
    });

  });

  describe('quando não é removido com sucesso', () => {
    const payload = 1;

    before(() => {
      sinon.stub(ProductModel,'deleteProduct')
        .resolves(null)
      sinon.stub(ProductModel,'findById')
        .resolves()
    });

    after(() => {
      ProductModel.deleteProduct.restore();
      ProductModel.findById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.deleteProduct(payload);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui a chave message e code', async () => {
      const response = await ProductService.deleteProduct(payload);
      const { message } = response.message;
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');
      expect(response.message).to.be.a('object');
      expect(message).to.be.equal('Product not found');
    });

  });

});

describe('Remove uma venda no BD', () => {
  describe('quando a venda é removida com sucesso', () => {
    const payload = 1;

    before(() => {
      sinon.stub(SaleModel,'deleteSale')
        .resolves(true)
      sinon.stub(SaleModel,'getById')
        .resolves([{ 
          date:"2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        }])
      sinon.stub(ProductModel,'increaseQuant')
        .resolves(1)
    });

    after(() => {
      SaleModel.deleteSale.restore();
      SaleModel.getById.restore();
      ProductModel.increaseQuant.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleService.deleteSale(payload);
      expect(response).to.be.a('array');
    });

    it('tal objeto possui as chaves corretas do produto deletado', async () => {
      const response = await SaleService.deleteSale(payload);
      expect(response).to.have.length.greaterThan(0);
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('product_id');
      expect(response[0]).to.have.a.property('quantity');
    });

  });

  describe('quando não é removido com sucesso', () => {
    const payload = 1;

    before(() => {
      sinon.stub(SaleModel,'deleteSale')
        .resolves(null)
      sinon.stub(SaleModel,'getById')
        .resolves()
      sinon.stub(ProductModel,'increaseQuant')
        .resolves(1)
    });

    after(() => {
      SaleModel.deleteSale.restore();
      SaleModel.getById.restore();
      ProductModel.increaseQuant.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleService.deleteSale(payload);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui a chave message e code', async () => {
      const response = await SaleService.deleteSale(payload);
      const { message } = response.message;
      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('message');
      expect(response.message).to.be.a('object');
      expect(message).to.be.equal('Sale not found');
    });

  });

});