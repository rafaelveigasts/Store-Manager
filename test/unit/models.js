const {expect} = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection');
const ProductModel = require('../../models/Product');
const SaleModel = require('../../models/Sale');

describe('Insere produto no DB', () => {
  const payload = {
    id: 1,
    name: "produto",
    quantity: 10,
  }
  before(async() => {
    const execute = [{
      id: 1,
      name: "produto",
      quantity: 10,
    }]
    sinon.stub(connection,'execute').resolves(execute);
  })
  after(async() => {
    connection.execute.restore();
  })
  describe('Insere com sucesso no DB',async() => {
    it('retotna um objeto', async() => {
      const response = await ProductModel.create(payload);
      expect(response).to.be.a('object');
    });
    it('o objeto possui as propriedades correstas',async() => {
      const response = await ProductModel.create(payload);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  })
});

describe('Localiza um produto no DB', () => {

  before(async () => {
    const execute = {
      id: 1,
      name: 'produto A',
      quantity: 10,
    }
    sinon.stub(ProductModel,'findById').resolves(execute);
  })

  after(async () => {
    ProductModel.findById.restore();
  })

  describe('Quando localiza um produto', async() => {

    it('retorna um objeto', async() => {
      const response = await ProductModel.findById(1);
      expect(response).to.be.a('object');
    });

    it('o objeto possui as propriedades do produto', async() => {
      const response = await ProductModel.findById(1);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  })

});

describe('Quando não localiza um produto', async() => {

  before(async () => {
    const execute = [[]];

    sinon.stub(connection,'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('retorna null', async() => {
    const response = await ProductModel.findById();
    expect(response).to.be.equal(null);
  });

});

describe('Insere uma venda no DB', () => {
  const payload = [[1,1,2],[2,1,5]];
  before(async() => {
    const execute = [{ insertedId: 1 }];
    sinon.stub(connection,'query').resolves(execute);
  })
  after(async() => {
    connection.query.restore();
  })
  describe('Insere a venda com sucesso no DB',async() => {
    it('retotna um objeto', async() => {
      const response = await SaleModel.createSalesProducts(payload);
      expect(response).to.be.a('object');
    });
    it('o objeto possui as propriedades correstas',async() => {
      const response = await SaleModel.createSalesProducts(payload);
      expect(response).to.have.a.property('id');
    });
  })
});

describe('Localiza uma venda no DB', () => {

  before(async () => {
    sinon.stub(SaleModel,'getById').resolves([
      {
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:56:29.000Z",
        product_id: 2,
        quantity: 5
      }
    ]
    );
  })

  after(async () => {
    SaleModel.getById.restore();
  })

  describe('Quando localiza uma venda', async() => {

    it('retorna um array', async() => {
      const response = await SaleModel.getById(1);
      expect(response).to.be.a('array');
    });

    it('o array não esta vazio', async() => {
      const response = await SaleModel.getById(1);
      expect(response).length.greaterThan(0);
    });
  })

});

describe('Quando não localiza uma venda', async() => {

  before(async () => {
    const execute = [[]];
    sinon.stub(connection,'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('retorna null', async() => {
    const response = await SaleModel.getById(1);
    expect(response).to.be.equal(null);
  });

});

describe('Lista todas as vendas', () => {

  before(async () => {
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

  after(async () => {
    SaleModel.getAll.restore();
  })

  describe('Quando localiza uma venda', async() => {

    it('retorna um objeto', async() => {
      const response = await SaleModel.getAll();
      expect(response).to.be.a('array');
    });

    it('o array não esta vazio', async() => {
      const response = await SaleModel.getAll();
      expect(response).length.greaterThan(0);
    });
  })

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
      const response = await ProductModel.deleteProduct(payload);
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
      const response = await ProductModel.deleteProduct(payload);
      expect(response).to.be.equal(null);
    });
  })
});

describe('Remove uma venda no DB', () => {
  describe('Remove a venda com sucesso no DB',async() => {
    const payload = 1;

    before(async() => {
      const execute = [{ affectedRows: 1 },{}];
      sinon.stub(connection,'execute').resolves(execute);
    })
    after(async() => {
      connection.execute.restore();
    })
    it('retotna um boolean', async() => {
      const response = await SaleModel.deleteSale(payload);
      expect(response).to.be.a('boolean');
      expect(response).to.be.equal(true);
    });
  })
  describe('não remove a venda com sucesso no DB',async() => {
    const payload = 10;

    before(async() => {
      const execute = [{},{}];
      sinon.stub(connection,'execute').resolves(execute);
    })
    after(async() => {
      connection.execute.restore();
    })
    it('retotna um boolean', async() => {
      const response = await SaleModel.deleteSale(payload);
      expect(response).to.be.equal(null);
    });
  })
});