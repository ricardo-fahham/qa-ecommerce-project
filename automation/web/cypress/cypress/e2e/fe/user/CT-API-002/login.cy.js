describe('CT-UI-002 - Login de usuário', () => {

  const email = `ricardo.${Date.now()}@example.com`;
  const password = '1q2w3e4r';

  const selectors = {
    email: '[data-testid="email"]',
    senha: '[data-testid="senha"]',
    entrar: '[data-testid="entrar"]',
  };

  before(() => {
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
  });

  it('1 - Deve realizar login com sucesso', () => {

    cy.visit('/login');

    cy.get(selectors.email).type(email);
    cy.get(selectors.senha).type(password);
    cy.get(selectors.entrar).click();

    cy.url().should('include', '/admin/home');

    cy.get('p.lead')
      .should('be.visible')
      .and('contain.text', 'Este é seu sistema para administrar seu ecommerce.');
  });

  it('2 - Deve informar que o usuário não foi encontrado', () => {

    cy.visit('/login');

    cy.get(selectors.email).type(`naoexiste.${Date.now()}@example.com`);
    cy.get(selectors.senha).type(password);
    cy.get(selectors.entrar).click();

    cy.contains('Email e/ou senha inválidos')
      .should('be.visible');
  });

  it('3 - Deve informar senha incorreta', () => {

    cy.visit('/login');

    cy.get(selectors.email).type(email);
    cy.get(selectors.senha).type('senhaErrada');
    cy.get(selectors.entrar).click();

    cy.contains('Email e/ou senha inválidos')
      .should('be.visible');
  });

  it('4 - Deve validar email inválido', () => {

    cy.visit('/login');

    cy.get(selectors.email).type('emailinvalido.com');
    cy.get(selectors.senha).type(password);
    cy.get(selectors.entrar).click();

    cy.get(selectors.email)
      .then(($el) => {
        expect($el[0].validationMessage).to.not.be.empty;
      });
  });

  it('5 - Deve validar email obrigatório', () => {

    cy.visit('/login');

    cy.get(selectors.senha).type(password);
    cy.get(selectors.entrar).click();

    cy.contains('Email é obrigatório')
      .should('be.visible');
  });

  it('6 - Deve validar senha obrigatória', () => {

    cy.visit('/login');

    cy.get(selectors.email).type(email);
    cy.get(selectors.entrar).click();

    cy.contains('Password é obrigatório')
      .should('be.visible');
  });

});