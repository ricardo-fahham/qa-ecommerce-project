# CT-API-005 - Validar Atualização do Produto

Após a execução da operação de atualização, consulte o produto utilizando o identificador (`_id`) para verificar se as alterações foram persistidas corretamente.

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
  "nome": "Mouse Gamer QA Updated",
  "preco": 200,
  "descricao": "Produto atualizado para testes",
  "quantidade": 20,
  "_id": "zlC4WQzJL2FCGki1"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O produto consultado deve possuir o mesmo `_id` utilizado na atualização.
* O campo `nome` deve conter o valor atualizado.
* O campo `preco` deve conter o valor atualizado.
* O campo `descricao` deve conter o valor atualizado.
* O campo `quantidade` deve conter o valor atualizado.
* Nenhuma informação anterior deve permanecer inalterada quando tiver sido modificada na operação de atualização.

### Critério de aprovação

O teste será considerado aprovado quando todos os campos alterados na operação de atualização forem retornados com os novos valores esperados.
