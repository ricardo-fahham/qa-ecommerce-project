describe('CT-API-002 - Buscar Produto por ID', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  let token;
  let produtoId;

  const produto = {
    nome: `Mouse Gamer ${Date.now()}`,
    preco: 150,
    descricao: 'Mouse para testes de automação',
    quantidade: 0
  };

  before(() => {

    // Cria usuário administrador
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa',
        email,
        password,
        administrador: 'true'
      }
    }).its('status').should('eq', 201);

    // Login
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: {
        email,
        password
      }
    }).then((response) => {

      expect(response.status).to.eq(200);
      token = response.body.authorization;

      // Cadastra produto
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/produtos`,
        headers: {
          Authorization: token
        },
        body: produto
      }).then((response) => {

        expect(response.status).to.eq(201);
        produtoId = response.body._id;

      });

    });

  });

  it('1 - Deve buscar um produto pelo ID com sucesso', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body.nome).to.eq(produto.nome);
      expect(response.body.preco).to.eq(produto.preco);
      expect(response.body.descricao).to.eq(produto.descricao);
      expect(response.body.quantidade).to.eq(produto.quantidade);

      expect(response.body._id).to.eq(produtoId);

    });

  });

  it('2 - Deve retornar todos os campos do produto', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.all.keys(
        'nome',
        'preco',
        'descricao',
        'quantidade',
        '_id'
      );

    });

  });

  it('3 - O ID retornado deve ser o mesmo informado na requisição', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(produtoId);

    });

  });

});