describe('Validar alteração do usuário', () => {
  it('Deve retornar os dados atualizados do usuário', () => {
    
    const userId = '4zmqTqzUxGGbehRo'; // Substitua pelo ID do usuário que deseja validar
    const email = 'ricardo.1782262633700@example.com'; // Substitua pelo email do usuário que deseja validar
    
    const usuarioAtualizado = {
      nome: 'Ricardo Fahham - https://youtube.com/@horadoqa Atualizado',
      email: email, 
      password: '123456',
      administrador: 'true'
    };

    cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`
    }).then((response) => {
      // Valida status code
      expect(response.status).to.eq(200);

      // Valida que o usuário foi localizado
      expect(response.body).to.have.property('_id');

      // Valida que o ID permaneceu inalterado
      expect(response.body._id).to.eq(userId);

      // Valida os dados atualizados
      expect(response.body.nome).to.eq(usuarioAtualizado.nome);
      expect(response.body.email).to.eq(usuarioAtualizado.email);
      expect(response.body.password).to.eq(usuarioAtualizado.password);
      expect(response.body.administrador).to.eq(
        usuarioAtualizado.administrador
      );

      // Validação completa do objeto retornado
      expect(response.body).to.deep.equal({
        ...usuarioAtualizado,
        _id: userId
      });
    });
  });
});