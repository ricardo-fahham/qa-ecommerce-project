describe('Cadastro de usuário', () => {
  it('CT-API-001.1 - Cadastro com e-mail duplicado', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        nome: 'Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa',
        email: 'horadoqa@example.com',
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});