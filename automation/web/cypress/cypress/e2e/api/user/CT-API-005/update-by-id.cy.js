describe('Atualizar usuário existente', () => {
  it('CT-API-005 - Deve atualizar os dados do usuário', () => {
    const userId = '4zmqTqzUxGGbehRo'; // Substitua pelo ID do usuário que deseja atualizar
    const email = 'ricardo.1782262633700@example.com'; // Substitua pelo email do usuário que deseja atualizar

    cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      body: {
        nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa Atualizado',
        email: `${email}`,
        password: '1q2w3e4r',
        administrador: 'true'
      }
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body.message).to.eq(
        'Registro alterado com sucesso'
      );
    });
  });
});