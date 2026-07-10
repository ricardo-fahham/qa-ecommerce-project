// Validar a listagem de usuários e verificar se o usuário esperado está presente no array retornado.

describe('Listar usuários', () => {
  it('CT-API-004 - Deve listar o usuário recém-cadastrado', () => {
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

      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/usuarios`
      }).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        expect(listResponse.body).to.have.property('quantidade');
        expect(listResponse.body.usuarios).to.be.an('array');

        const usuario = listResponse.body.usuarios.find(
          (user) => user.email === email
        );

        expect(usuario).to.exist;
        expect(usuario.nome).to.eq('Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa');
        expect(usuario.email).to.eq(email);
        expect(usuario.password).to.eq('1q2w3e4r');
        expect(usuario.administrador).to.eq('true');
      });
    });
  });
});