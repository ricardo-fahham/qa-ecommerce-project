describe('CT-API-003 - Listar Produtos e Localizar um Produto', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  let token;

  const produto = {
    nome: `Mouse Gamer QA ${Date.now()}`,
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

      // Cadastra um produto
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/produtos`,
        headers: {
          Authorization: token
        },
        body: produto
      }).its('status').should('eq', 201);

    });

  });

  it('1 - Deve listar todos os produtos', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('produtos');

      expect(response.body.produtos).to.be.an('array');

    });

  });

  it('2 - Deve localizar o produto pelo nome', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {

      const produtoEncontrado = response.body.produtos.find(
        p => p.nome === produto.nome
      );

      expect(produtoEncontrado).to.exist;

      expect(produtoEncontrado.nome).to.eq(produto.nome);
      expect(produtoEncontrado.preco).to.eq(produto.preco);
      expect(produtoEncontrado.descricao).to.eq(produto.descricao);
      expect(produtoEncontrado.quantidade).to.eq(produto.quantidade);

    });

  });

  it('3 - Deve localizar um produto com _id válido', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {

      const produtoEncontrado = response.body.produtos.find(
        p => p.nome === produto.nome
      );

      expect(produtoEncontrado).to.have.property('_id');
      expect(produtoEncontrado._id).to.be.a('string');
      expect(produtoEncontrado._id).to.have.length(16);

    });

  });

  it('4 - Os dados do produto localizado devem corresponder ao cadastro', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {

      const produtoEncontrado = response.body.produtos.find(
        p => p.nome === produto.nome
      );

      expect(produtoEncontrado).to.deep.include(produto);

    });

  });

});