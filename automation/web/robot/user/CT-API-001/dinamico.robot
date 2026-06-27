describe('Cadastro de usuário com e-mail dinâmico', () => {
  it('Deve criar um novo usuário', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email,
        password: '123456',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.not.be.empty;
    });
  });
});