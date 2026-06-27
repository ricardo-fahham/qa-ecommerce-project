describe('Buscar usuário com ID inválido', () => {
  it('Deve retornar mensagem de validação para ID inválido', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios/id_invalido',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);

      expect(response.body).to.deep.equal({
        id: 'id deve ter exatamente 16 caracteres alfanuméricos'
      });
    });
  });
});