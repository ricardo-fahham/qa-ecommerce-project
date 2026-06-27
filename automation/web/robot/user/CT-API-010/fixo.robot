describe('Cadastro de Usuário com E-mail Duplicado', () => {

  const email = `ricardo.${Date.now()}@example.com`;

  it('Deve criar usuário e rejeitar segundo cadastro com e-mail duplicado', () => {

    // 1 - Primeiro cadastro (deve ser sucesso)
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email,
        password: '123456',
        administrador: 'true'
      }
    }).then((createResponse) => {

      expect(createResponse.status).to.eq(201);
      expect(createResponse.body).to.have.property('_id');

      const userId = createResponse.body._id;

      // 2 - Segundo cadastro (deve falhar por e-mail duplicado)
      cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
          nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
          email,
          password: '123456',
          administrador: 'true'
        }
      }).then((duplicateResponse) => {

        // Status esperado
        expect(duplicateResponse.status).to.eq(400);

        // Mensagem de regra de negócio
        expect(duplicateResponse.body).to.deep.equal({
          message: 'Este email já está sendo usado'
        });

        // Garantia: não deve criar novo usuário
        expect(duplicateResponse.body).to.not.have.property('_id');
      });

    });
  });

});