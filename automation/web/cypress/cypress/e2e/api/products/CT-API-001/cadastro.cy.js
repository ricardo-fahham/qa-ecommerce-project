describe('CT-API-001 - Cadastro de Produtos', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  let token;

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
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    // Realiza login
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: {
        email,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');

      token = response.body.authorization;
    });

  });

  it('1 - Deve cadastrar um produto com sucesso', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: token
      },
      body: {
        nome: `Mouse Gamer ${Date.now()}`,
        preco: 150,
        descricao: 'Mouse para testes de automação',
        quantidade: 10
      }
    }).then((response) => {

      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');

    });

  });

  it('2 - Não deve permitir cadastro sem token', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      failOnStatusCode: false,
      body: {
        nome: `Produto ${Date.now()}`,
        preco: 100,
        descricao: 'Teste sem token',
        quantidade: 5
      }
    }).then((response) => {

      expect(response.status).to.eq(401);
      expect(response.body.message)
        .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');

    });

  });

  it('3 - Não deve permitir cadastrar produto com nome duplicado', () => {

    const nomeProduto = `Mouse Gamer ${Date.now()}`;

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: token
      },
      body: {
        nome: nomeProduto,
        preco: 150,
        descricao: 'Primeiro cadastro',
        quantidade: 5
      }
    }).its('status').should('eq', 201);

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: token
      },
      failOnStatusCode: false,
      body: {
        nome: nomeProduto,
        preco: 200,
        descricao: 'Cadastro duplicado',
        quantidade: 10
      }
    }).then((response) => {

      expect(response.status).to.eq(400);
      expect(response.body.message)
        .to.eq('Já existe produto com esse nome');

    });

  });

  it('4 - Não deve permitir preço negativo', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: token
      },
      failOnStatusCode: false,
      body: {
        nome: `Produto Inválido ${Date.now()}`,
        preco: -10,
        descricao: 'Teste negativo',
        quantidade: 5
      }
    }).then((response) => {

      expect(response.status).to.eq(400);
      expect(response.body.preco)
        .to.eq('preco deve ser um número positivo');

    });

  });

  it('5 - Deve permitir cadastrar produto sem estoque', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: token
      },
      body: {
        nome: `Sem Estoque ${Date.now()}`,
        preco: 100,
        descricao: 'Produto sem estoque',
        quantidade: 0
      }
    }).then((response) => {

      expect(response.status).to.eq(201);
      expect(response.body.message)
        .to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');

    });

  });

});