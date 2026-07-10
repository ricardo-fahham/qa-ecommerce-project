describe('Cadastro de usuário', () => {
  it('CT-FE-001 - Deve criar um novo usuário com sucesso', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    cy.visit('/cadastrarusuarios');

    const selectors = {
      nome: '[data-testid="nome"]',
      email: '[data-testid="email"]',
      senha: '[data-testid="password"]',
      checkbox: '[data-testid="checkbox"]',
      cadastrar: '[data-testid="cadastrar"]',
    };

    cy.get(selectors.nome).type('Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa');
    cy.get(selectors.email).type(email);
    cy.get(selectors.senha).type('1q2w3e4r');
    cy.get(selectors.checkbox).check();
    cy.get(selectors.cadastrar).click();

    cy.contains('Cadastro realizado com sucesso')
      .should('be.visible');

    cy.url().should('include', '/home');
  });
});