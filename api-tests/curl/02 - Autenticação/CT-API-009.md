# CT-API-009 - Realizar Login com Credenciais Inválidas

Este caso de teste contempla cenários negativos de autenticação, validando o comportamento da API quando são informadas credenciais incorretas ou inválidas.

---

## Cenário 1 - Login com senha inválida

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "ricardo.qa.teste@example.com",
  "password": "senha_errada"
}'
```

### Resultado esperado

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Email e/ou senha inválidos"
}
```

---

## Cenário 2 - Login com e-mail inválido

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "ricardo.qa.teste.example.com",
  "password": "123456"
}'
```

### Resultado esperado

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Email e/ou senha inválidos"
}
```

---

### Validações gerais

* O endpoint deve retornar erro de autenticação (`401 Unauthorized`).
* A autenticação não deve ser realizada em nenhum dos cenários.
* A mensagem de erro deve ser consistente para credenciais inválidas.
* Nenhum token de autorização deve ser retornado.

---

### Critério de aprovação

O teste será considerado aprovado quando a API rejeitar corretamente o login em ambos os cenários de credenciais inválidas, retornando a mensagem apropriada e sem gerar token de autenticação.
