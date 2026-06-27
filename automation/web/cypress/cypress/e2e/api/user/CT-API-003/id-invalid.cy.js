describe('Buscar usuário com ID inválido', () => {
  it('CT-API-003 - Deve retornar mensagem de validação para ID inválido', () => {
    const idInvalido = '1234567891011'; // ID com menos de 16 caracteres
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${idInvalido}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);

      expect(response.body).to.deep.equal({
        id: 'id deve ter exatamente 16 caracteres alfanuméricos'
      });
    });
  });
});