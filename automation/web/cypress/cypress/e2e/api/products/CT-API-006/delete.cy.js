describe('CT-API-006 - Excluir Produto', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  let token;
  let produtoId;

  const produto = {
    nome: `Mouse Gamer QA ${Date.now()}`,
    preco: 150,
    descricao: 'Mouse para testes de automação',
    quantidade: 10
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

  it('1 - Deve excluir um produto com sucesso', () => {

    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`,
      headers: {
        Authorization: token
      }
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.message)
        .to.eq('Registro excluído com sucesso');

    });

  });

  it('2 - O produto não deve mais existir após a exclusão', () => {

    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`,
      headers: {
        Authorization: token
      }
    });

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(400);
      expect(response.body.message)
        .to.eq('Produto não encontrado');

    });

  });

});