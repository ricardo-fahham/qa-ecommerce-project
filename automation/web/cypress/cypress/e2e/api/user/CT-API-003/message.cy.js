describe('Validação de formato do ID', () => {
  it('CT-API-003 - Deve informar que o ID precisa ter 16 caracteres alfanuméricos', () => {
    const idInvalido = '1234567891011'; // ID tem que ter de 16 caracteres
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${idInvalido}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.id).to.eq(
        'id deve ter exatamente 16 caracteres alfanuméricos'
      );
    });
  });
});