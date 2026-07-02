# CT-API-002 - Buscar Produto por ID (READ ONE)

Para consultar um produto específico, utilize o identificador (`_id`) retornado durante o cadastro do produto.

Substitua `{_id}` pelo valor correspondente ao produto que deseja consultar.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/produtos/{_id}'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "nome": "Mouse Gamer QA",
  "preco": 150,
  "descricao": "Mouse para testes de automação",
  "quantidade": 0,
  "_id": "zlC4WQzJL2FCGki1"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O produto deve ser localizado com sucesso utilizando o `_id` informado.
* Os dados retornados devem corresponder aos dados cadastrados anteriormente.
* O campo `_id` retornado deve ser igual ao ID utilizado na requisição.
* A resposta deve conter os campos:

  * `nome`
  * `preco`
  * `descricao`
  * `quantidade`
  * `_id`
