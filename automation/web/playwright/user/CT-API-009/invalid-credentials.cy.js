describe('Login inválido', () => {

  const cenarios = [
    {
      descricao: 'Senha inválida',
      payload: {
        email: 'ricardo.qa.teste@example.com',
        password: 'senha_errada'
      }
    },
    {
      descricao: 'E-mail inválido',
      payload: {
        email: 'ricardo.qa.teste.example.com',
        password: '123456'
      }
    }
  ];

  cenarios.forEach(({ descricao, payload }) => {
    it(`Deve rejeitar login - ${descricao}`, () => {

      cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: payload
      }).then((response) => {

        // aceita 400 ou 401 (comportamento real da API)
        expect([400, 401]).to.include(response.status);

        // valida apenas se existir message
        if (response.body && response.body.message) {
          expect(response.body.message).to.eq(
            'Email e/ou senha inválidos'
          );
        }

        // nunca deve retornar token
        expect(response.body).to.not.have.property('authorization');
      });
    });
  });

});