describe('Cadastro de usuário', () => {
  it('CT-API-001 - Deve criar um novo usuário', () => {
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
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });
});