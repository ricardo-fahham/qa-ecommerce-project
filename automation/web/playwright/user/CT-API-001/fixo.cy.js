describe('Cadastro de usuário', () => {
  it('Deve criar um novo usuário', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email: 'ricardo.qa.teste@example.com',
        password: '123456',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });
});