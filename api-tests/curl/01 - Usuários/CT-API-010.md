# CT-API-010 - Cadastro de Usuário com E-mail Duplicado

Este caso de teste valida a regra de negócio que impede o cadastro de usuários com e-mail já existente na base de dados.
Executar novamente o cadastro utilizando o mesmo e-mail já registrado no cenário anterior.


## Exemplo de requisição

```bash
curl --location 'https://serverest.dev/usuarios' \
--header 'Content-Type: application/json' \
--data-raw '{
  "nome": "Ricardo Fahham",
  "email": "ricardo.qa.teste@example.com",
  "password": "123456",
  "administrador": "true"
}'
```

## Resultado esperado

**Status Code:** `400 Bad Request`

```json
{
  "message": "Este email já está sendo usado"
}
```

---

## Validações gerais

* O primeiro cadastro deve ser realizado com sucesso.
* O segundo cadastro deve ser rejeitado por duplicidade de e-mail.
* O sistema deve impedir a criação de usuários com e-mails repetidos.
* A mensagem de erro deve ser exibida corretamente.
* Nenhum novo usuário deve ser criado no segundo cenário.

---

## Critério de aprovação

O teste será considerado aprovado quando a API permitir o primeiro cadastro e rejeitar corretamente o segundo, garantindo a validação da unicidade do e-mail.
