describe('Atualizar usuário com PATCH', () => {
  it('CT-API-005 - Deve atualizar apenas o e-mail de um usuário existente mantendo o mesmo _id', () => {
    const emailOriginal = `ricardo.${Date.now()}@example.com`;
    const emailAtualizado = `ricardo.atualizado.${Date.now()}@example.com`;

    // Cria o usuário
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email: emailOriginal,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const userId = createResponse.body._id;

      // Atualiza apenas o e-mail do usuário
      cy.request({
        method: 'PATCH',
        url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
        body: {
          email: emailAtualizado
        }
      }).then((updateResponse) => {
        expect([200, 201]).to.include(updateResponse.status);

        expect(updateResponse.body.message).to.eq(
          'Registro alterado com sucesso'
        );

        // Busca o usuário atualizado
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/usuarios/${userId}`
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(200);

          // Valida que o ID não mudou
          expect(getResponse.body._id).to.eq(userId);

          // Valida que apenas o e-mail foi alterado
          expect(getResponse.body.nome).to.eq(
            'Ricardo Fahham - https://youtube.com/@horadoqa'
          );
          expect(getResponse.body.email).to.eq(emailAtualizado);
          expect(getResponse.body.password).to.eq('1q2w3e4r');
          expect(getResponse.body.administrador).to.eq('true');
        });
      });
    });
  });
});