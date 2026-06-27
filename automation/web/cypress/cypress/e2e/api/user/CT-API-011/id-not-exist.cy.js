describe('Buscar usuário inexistente', () => {
  it('CT-API-011 - Deve retornar 400 quando o usuário não existir', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/F63ryKtT8H56dTdj`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Usuário não encontrado');
    });
  });
});