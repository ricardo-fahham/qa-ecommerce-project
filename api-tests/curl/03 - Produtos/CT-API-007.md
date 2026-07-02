# CT-API-007 - Validar Exclusão do Produto

Após a execução da operação de exclusão, consulte o produto utilizando o identificador (`_id`) para confirmar que o registro foi removido com sucesso.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/produtos/{_id}'
```

---

## Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "message": "Produto não encontrado"
}
```

### Validações

* O endpoint deve retornar o status `400 Bad Request`.
* A resposta deve conter a mensagem `Produto não encontrado`.
* O produto removido não deve mais estar disponível para consulta.
* O `_id` utilizado na requisição não deve retornar nenhum registro válido.

### Critério de aprovação

O teste será considerado aprovado quando a API informar que o produto não foi encontrado, confirmando que a exclusão foi realizada com sucesso e que o registro não está mais disponível na base de dados.
