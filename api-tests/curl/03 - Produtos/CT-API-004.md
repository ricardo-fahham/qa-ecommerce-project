# CT-API-004 - Atualizar Produto (UPDATE)

Para atualizar os dados de um produto, é necessário informar o identificador (`_id`) do produto e um token de autenticação válido.

A operação substituirá os dados atuais pelos valores enviados no corpo da requisição.

### Exemplo de requisição

```bash
curl --location --request PUT 'https://serverest.dev/produtos/{_id}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
  "nome": "Mouse Gamer QA Updated",
  "preco": 200,
  "descricao": "Produto atualizado para testes",
  "quantidade": 20
}'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "message": "Registro alterado com sucesso"
}
```

### Validações

* O token de autenticação deve ser válido.
* O produto informado pelo `_id` deve existir.
* O endpoint deve retornar o status `200 OK`.
* A resposta deve conter a mensagem `Registro alterado com sucesso`.
* Os dados do produto devem ser atualizados conforme os valores enviados na requisição.

---

## Pós-condição

Após a atualização, recomenda-se realizar uma consulta do produto utilizando o endpoint de busca por ID para validar a persistência das alterações.

### Exemplo de validação

```bash
curl --location 'https://serverest.dev/produtos/{_id}'
```

### Dados esperados

```json
{
  "nome": "Mouse Gamer QA Updated",
  "preco": 200,
  "descricao": "Produto atualizado para testes",
  "quantidade": 20,
  "_id": "{_id}"
}
```
