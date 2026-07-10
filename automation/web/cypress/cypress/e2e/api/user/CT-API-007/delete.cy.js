describe('Excluir Usuário (DELETE)', () => {
  it('CT-API-007 - Deve excluir um usuário e validar que ele não existe mais', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    // Pré-condição: criar usuário
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

      // Exclusão do usuário
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      }).then((deleteResponse) => {
        // Validações do DELETE
        expect(deleteResponse.status).to.eq(200);

        expect(deleteResponse.body).to.deep.equal({
          message: 'Registro excluído com sucesso'
        });

        // Pós-condição: validar que o usuário foi removido
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(400);

          expect(getResponse.body).to.deep.equal({
            message: 'Usuário não encontrado'
          });
        });
      });
    });
  });
});