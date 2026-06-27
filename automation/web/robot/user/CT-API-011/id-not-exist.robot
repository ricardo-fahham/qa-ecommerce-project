describe('Buscar usuário inexistente', () => {
  it('Deve retornar 400 quando o usuário não existir', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios/F63ryKtT8H56dTdj',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Usuário não encontrado');
    });
  });
});