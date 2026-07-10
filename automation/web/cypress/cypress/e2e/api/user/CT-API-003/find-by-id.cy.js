describe('CRUD Usuário - Buscar por ID', () => {
  it('CT-API-003 - Deve criar e buscar um usuário pelo ID', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa',
        email,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const userId = createResponse.body._id;

      cy.request({
        method: 'GET',
        url: `https://serverest.dev/usuarios/${userId}`
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body._id).to.eq(userId);
        expect(getResponse.body.nome).to.eq('Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa');
        expect(getResponse.body.email).to.eq(email);
      });
    });
  });
});