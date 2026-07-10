describe('CT-UI-001 - Cadastro de usuário', () => {

  const selectors = {
    nome: '[data-testid="nome"]',
    email: '[data-testid="email"]',
    senha: '[data-testid="password"]',
    checkbox: '[data-testid="checkbox"]',
    cadastrar: '[data-testid="cadastrar"]',
  };

  function acessarTelaCadastro() {
    cy.visit('/cadastrarusuarios');
  }

  it('1 - Deve criar um novo usuário com sucesso', () => {

    const email = `ricardo.${Date.now()}@example.com`;

    acessarTelaCadastro();

    cy.get(selectors.nome).type('Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa');
    cy.get(selectors.email).type(email);
    cy.get(selectors.senha).type('1q2w3e4r');
    cy.get(selectors.checkbox).check();
    cy.get(selectors.cadastrar).click();

    cy.contains('Cadastro realizado com sucesso')
      .should('be.visible');

    cy.url().should('include', '/home');
  });

  it('2 - Não deve permitir email já cadastrado', () => {

    const email = `duplicado.${Date.now()}@example.com`;

    // Cria o usuário pela API
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Ricardo',
        email,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).its('status').should('eq', 201);

    // Tenta cadastrar novamente pela interface
    acessarTelaCadastro();

    cy.get(selectors.nome).type('Ricardo Fahham');
    cy.get(selectors.email).type(email);
    cy.get(selectors.senha).type('1q2w3e4r');
    cy.get(selectors.checkbox).check();
    cy.get(selectors.cadastrar).click();

    cy.contains('Este email já está sendo usado')
      .should('be.visible');
  });

  it('3 - Deve validar email inválido', () => {

    acessarTelaCadastro();

    cy.get(selectors.nome).type('Ricardo Fahham');
    cy.get(selectors.email).type('emailinvalido.com');
    cy.get(selectors.senha).type('1q2w3e4r');
    cy.get(selectors.checkbox).check();
    cy.get(selectors.cadastrar).click();

    cy.get(selectors.email)
      .then(($el) => {
        expect($el[0].validationMessage).to.not.be.empty;
      });
  });

 it('4 - Deve validar senha obrigatória', () => {

  acessarTelaCadastro();

  cy.get(selectors.nome).type('Ricardo Fahham');
  cy.get(selectors.email).type(`senha.${Date.now()}@example.com`);

  // Não preenche a senha
  cy.get(selectors.cadastrar).click();

  cy.contains('Password é obrigatório')
    .should('be.visible');
});
});