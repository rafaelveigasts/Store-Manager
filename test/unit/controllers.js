const sinon = require('sinon');
const {expect} = require('chai');

const ProductService = require('../../services/Product');
const ProductController = require('../../controllers/Product');
const SaleService = require('../../services/Sale');
const SaleController = require('../../controllers/Sale');

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(ProductService, 'create')
        .resolves({ code: 400, 
          message: { message: 'Product not found' } 
      })
    })

    after(() => {
      ProductService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await ProductController.create(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'teste1',
        quantity: 2
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'create')
        .resolves({
          id: 1,
          name : 'teste1',
          quantity: 2,
        });
    })

    after(() => {
      ProductService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await ProductController.create(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de findById', () => {
  describe('quando não existe o produto', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 100
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(ProductService, 'findById')
        .resolves({ code: 404, 
          message: { message: 'Product not found' } })
    });

    after(() => {
      ProductService.findById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await ProductController.findById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });

  describe('quando é localizado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'findById')
        .resolves({
          id: 1,
          name: "produto A",
          quantity: 10
        });
    })

    after(() => {
      ProductService.findById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await ProductController.findById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de create sale', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(SaleService, 'createSalesProducts')
        .resolves({ code: 400, message: { message: '"product_id" is required' } });
    });

    after(() => {
      SaleService.createSalesProducts.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await SaleController.createSales(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [
        {
          product_id: 1,
          quantity: 5,
        }
      ];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SaleService, 'createSalesProducts')
        .resolves({
          id: 1,
          itemsSold: [
            {
              product_id: 1,
              quantity: 5
            }
          ]
        });
    })

    after(() => {
      SaleService.createSalesProducts.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await SaleController.createSales(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await ProductController.create(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de getById', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(SaleService, 'getById')
        .resolves({ code: 404, 
          message: { message: 'Sale not found' } });
    });

    after(() => {
      SaleService.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await SaleController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });

  describe('quando é localizada a venda com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SaleService, 'getById')
        .resolves([
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
        ]);
    })

    after(() => {
      SaleService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await SaleController.getById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de getAll', () => {

  describe('quando é listado todas as vendas com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SaleService, 'getAll')
        .resolves([
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            product_id: 1,
            quantity: 2
          },
          {
            saleId: 1,
            date: "2021-09-09T04:54:54.000Z",
            product_id: 2,
            quantity: 2
          }
        ]);
    })

    after(() => {
      SaleService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await SaleController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de deleteProduct', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(ProductService, 'deleteProduct')
        .resolves({ code: 404, 
          message: { message: 'Product not found' } 
      })
    })

    after(() => {
      ProductService.deleteProduct.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await ProductController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });

  describe('quando é removido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = 1;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'deleteProduct')
        .resolves({
          id: 1,
          name : 'teste1',
          quantity: 2,
        });
    })

    after(() => {
      ProductService.deleteProduct.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductController.deleteProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método json com o objeto',async() => {
      await ProductController.deleteProduct(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })

  });
});

describe('Ao chamar o controller de deleteSale', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

        sinon.stub(SaleService, 'deleteSale')
        .resolves({ code: 404, 
          message: { message: 'Sale not found' } 
      })
    })

    after(() => {
      SaleService.deleteSale.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await SaleController.deleteSale(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });

  describe('quando é removido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = 1;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SaleService, 'deleteSale')
        .resolves([{
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        }]);
    })

    after(() => {
      SaleService.deleteSale.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SaleController.deleteSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método json com o array',async() => {
      await SaleController.deleteSale(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

  });
});