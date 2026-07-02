describe('Cadastro de usuário', () => {
  it('CT-API-001.2 - Cadastro com campos vazios', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        nome: '',
        email: '',
        password: '',
        administrador: ''
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });
});