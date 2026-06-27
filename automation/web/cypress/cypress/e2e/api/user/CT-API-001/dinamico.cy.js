describe('Cadastro de usuário com e-mail dinâmico', () => {
  it('CT-API-001 - Deve criar um novo usuário', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.not.be.empty;
    });
  });
});