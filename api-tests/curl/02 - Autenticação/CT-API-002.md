# CT-API-002 - Realizar Login com Sucesso

Para autenticar um usuário, envie as credenciais válidas (e-mail e senha) no corpo da requisição.

Quando a autenticação for realizada com sucesso, a API retornará um token de autorização que deverá ser utilizado nos endpoints protegidos.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "ricardo.qa.teste@example.com",
  "password": "123456"
}'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "message": "Login realizado com sucesso",
  "authorization": "Bearer eyJ..."
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* A resposta deve conter a mensagem `Login realizado com sucesso`.
* O campo `authorization` deve estar presente na resposta.
* O token retornado deve seguir o padrão `Bearer <token>`.
* O token deve ser válido para acesso aos endpoints protegidos da API.

---

## Pós-condição

Armazene o valor retornado no campo `authorization`, pois ele será utilizado nos cenários que exigem autenticação.

### Exemplo de utilização

```http
Authorization: Bearer <token>
```

### Critério de aprovação

O teste será considerado aprovado quando a API autenticar o usuário com sucesso e retornar um token de autorização válido para utilização nas demais operações autenticadas.
