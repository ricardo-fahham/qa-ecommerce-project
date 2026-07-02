# CT-API-004 - Listar Usuários (READ ALL)

Para consultar todos os usuários cadastrados na base, utilize o endpoint de listagem.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/usuarios'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "quantidade": 2,
  "usuarios": [
    {
      "nome": "Ricardo Fahham",
      "email": "ricardo.qa.teste@example.com",
      "password": "123456",
      "administrador": "true",
      "_id": "DOQOugWPYpvN3OaS"
    }
  ]
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* A resposta deve conter o campo `quantidade`.
* A resposta deve conter o array `usuarios`.
* O usuário cadastrado deve estar presente na lista retornada.
* Os dados retornados devem ser consistentes com o cadastro.
