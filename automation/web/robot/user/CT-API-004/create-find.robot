// Versão mais robusta (cria o usuário antes da consulta)
// Essa abordagem evita dependência de dados já existentes no ambiente:

describe('Listar usuários', () => {
  it('Deve listar o usuário recém-cadastrado', () => {
    const email = `ricardo.${Date.now()}@example.com`;

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: 'Ricardo Fahham - https://youtube.com/@horadoqa',
        email,
        password: '123456',
        administrador: 'true'
      }
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        expect(listResponse.body).to.have.property('quantidade');
        expect(listResponse.body.usuarios).to.be.an('array');

        const usuario = listResponse.body.usuarios.find(
          (user) => user.email === email
        );

        expect(usuario).to.exist;
        expect(usuario.nome).to.eq('Ricardo Fahham - https://youtube.com/@horadoqa');
        expect(usuario.email).to.eq(email);
        expect(usuario.password).to.eq('123456');
        expect(usuario.administrador).to.eq('true');
      });
    });
  });
});