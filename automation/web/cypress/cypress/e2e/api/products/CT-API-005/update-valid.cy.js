describe('CT-API-005 - Validar Atualização do Produto', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  let token;
  let produtoId;

  const produtoOriginal = {
    nome: `Mouse Gamer QA ${Date.now()}`,
    preco: 150,
    descricao: 'Mouse para testes de automação',
    quantidade: 10
  };

  const produtoAtualizado = {
    nome: `Mouse Gamer QA Updated ${Date.now()}`,
    preco: 200,
    descricao: 'Produto atualizado para testes',
    quantidade: 20
  };

  before(() => {

    // Cria usuário administrador
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
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
        body: produtoOriginal
      }).then((response) => {

        expect(response.status).to.eq(201);

        produtoId = response.body._id;

        // Atualiza o produto
        cy.request({
          method: 'PUT',
          url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`,
          headers: {
            Authorization: token
          },
          body: produtoAtualizado
        }).then((response) => {

          expect([200, 201]).to.include(response.status);
          expect(response.body.message).to.eq('Registro alterado com sucesso');

        });

      });

    });

  });

  it('1 - Deve consultar o produto atualizado', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body._id).to.eq(produtoId);

      expect(response.body.nome).to.eq(produtoAtualizado.nome);
      expect(response.body.preco).to.eq(produtoAtualizado.preco);
      expect(response.body.descricao).to.eq(produtoAtualizado.descricao);
      expect(response.body.quantidade).to.eq(produtoAtualizado.quantidade);

    });

  });

  it('2 - Deve manter o mesmo ID após a atualização', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(produtoId);

    });

  });

  it('3 - Nenhum valor antigo deve permanecer após a atualização', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${produtoId}`
    }).then((response) => {

      expect(response.body.nome).not.to.eq(produtoOriginal.nome);
      expect(response.body.preco).not.to.eq(produtoOriginal.preco);
      expect(response.body.descricao).not.to.eq(produtoOriginal.descricao);
      expect(response.body.quantidade).not.to.eq(produtoOriginal.quantidade);

    });

  });

});