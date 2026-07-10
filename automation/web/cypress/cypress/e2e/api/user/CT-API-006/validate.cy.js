describe('Validar alteração do usuário', () => {
  it('CT-API-006 - Deve retornar os dados atualizados do usuário', () => {
    
    // Pegaar as informações do usuário atualizado no teste anterior CT-API-005/update.cy.js e validar se o usuário foi atualizado corretamente
    const userId = '3UX2PVXW5miTc5gL'; // Substitua pelo ID do usuário que deseja validar
    const email = 'ricardo.atualizado.1782563134025@example.com'; // Substitua pelo email do usuário que deseja validar
    
    const usuarioAtualizado = {
      nome: 'Hora do QA - Aprenda sobre Qualidade de Software em: https://youtube.com/@horadoqa',
      email: email, 
      password: '1q2w3e4r',
      administrador: 'true'
    };

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`
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