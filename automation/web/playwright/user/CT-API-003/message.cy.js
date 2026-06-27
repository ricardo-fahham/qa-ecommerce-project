describe('Validação de formato do ID', () => {
  it('Deve informar que o ID precisa ter 16 caracteres alfanuméricos', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios/id_invalido',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.id).to.eq(
        'id deve ter exatamente 16 caracteres alfanuméricos'
      );
    });
  });
});