describe('Login de usuário', () => {
  it('Deve realizar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: 'ricardo.qa.teste@example.com',
        password: '123456'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
    });
  });
});