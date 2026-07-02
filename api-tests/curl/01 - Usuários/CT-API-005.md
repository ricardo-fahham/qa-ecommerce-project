# CT-API-005 - Atualizar Usuário (UPDATE)

Para atualizar os dados de um usuário, é necessário informar o identificador (`_id`) retornado no cadastro e enviar os novos dados no corpo da requisição.

### Exemplo de requisição

```bash
curl --location --request PUT 'https://serverest.dev/usuarios/{_id}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "nome": "Ricardo Fahham Atualizado",
  "email": "ricardo.qa@example.com",
  "password": "123456",
  "administrador": "true"
}'
```

---

## Resultado esperado

**Status Code:** `200 OK` ou `201`

**Response Body:**

```json
{
  "message": "Registro alterado com sucesso"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O usuário informado pelo `_id` deve existir.
* A resposta deve conter a mensagem `Registro alterado com sucesso`.
* Os dados do usuário devem ser atualizados conforme o payload enviado.
* O campo `_id` não deve ser alterado durante a atualização.

---

## Pós-condição

Após a atualização, recomenda-se realizar uma consulta do usuário por ID para validar se as alterações foram persistidas corretamente.

### Exemplo de validação

```bash
curl --location 'https://serverest.dev/usuarios/{_id}'
```

### Critério de aprovação

O teste será considerado aprovado quando o usuário for atualizado com sucesso e os dados retornados refletirem as alterações realizadas.
