describe('Atualizar usuário existente', () => {
  it('Deve atualizar os dados do usuário', () => {
    const userId = '4zmqTqzUxGGbehRo'; // Substitua pelo ID do usuário que deseja atualizar
    const email = 'ricardo.1782262633700@example.com'; // Substitua pelo email do usuário que deseja atualizar

    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`,
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa Atualizado',
        email: `${email}`,
        password: '123456',
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