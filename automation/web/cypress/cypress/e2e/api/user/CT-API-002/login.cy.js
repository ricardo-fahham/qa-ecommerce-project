describe('Login de usuário', () => {
  it('CT-API-002 - Deve realizar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: 'horadoqa@horadoqa.com.br',
        password: '1q2w3e4r'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
    });
  });
});