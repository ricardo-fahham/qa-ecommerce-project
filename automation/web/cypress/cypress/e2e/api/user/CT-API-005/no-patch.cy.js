describe('Atualizar usuário com PATCH', () => {
  it('CT-API-005 - Deve retornar 405 Method Not Allowed ao tentar atualizar um usuário com PATCH', () => {
    const emailOriginal = `ricardo.${Date.now()}@example.com`;
    const emailAtualizado = `ricardo.atualizado.${Date.now()}@example.com`;

    // Cria o usuário
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa',
        email: emailOriginal,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const userId = createResponse.body._id;

      // Tenta atualizar o usuário com PATCH
      cy.request({
        method: 'PATCH',
        url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
        failOnStatusCode: false,
        body: {
          email: emailAtualizado
        }
      }).then((patchResponse) => {
        // Valida o status HTTP
        expect(patchResponse.status).to.eq(405);
        expect(patchResponse.statusText).to.eq('Method Not Allowed');

        // Valida a mensagem retornada pela API
        expect(patchResponse.body.message).to.eq(
          `Não é possível realizar PATCH em /usuarios/${userId}. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las.`
        );
      });
    });
  });
});