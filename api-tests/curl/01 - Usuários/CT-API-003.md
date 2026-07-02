# CT-API-003 - Buscar Usuário por ID (READ ONE)

Para consultar um usuário específico, utilize o identificador (`_id`) retornado no momento do cadastro.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/usuarios/{_id}'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "nome": "Ricardo Fahham",
  "email": "ricardo.qa.teste@example.com",
  "password": "123456",
  "administrador": "true",
  "_id": "DOQOugWPYpvN3OaS"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O usuário deve ser localizado com base no `_id` informado.
* Os dados retornados devem corresponder ao usuário cadastrado.
* O campo `_id` deve ser igual ao informado na requisição.

---

