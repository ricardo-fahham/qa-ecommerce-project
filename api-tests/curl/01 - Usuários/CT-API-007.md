# CT-API-007 - Excluir Usuário (DELETE)

Para remover um usuário do sistema, utilize o identificador (`_id`) retornado no momento do cadastro.

A operação de exclusão remove permanentemente o registro da base de dados.

### Exemplo de requisição

```bash
curl --location --request DELETE 'https://serverest.dev/usuarios/{_id}'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "message": "Registro excluído com sucesso"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O usuário informado pelo `_id` deve existir.
* A resposta deve conter a mensagem `Registro excluído com sucesso`.
* O usuário deve ser removido da base de dados após a execução da requisição.

---

## Pós-condição

Após a exclusão, recomenda-se realizar uma consulta pelo `_id` para validar se o registro foi removido corretamente.

### Exemplo de validação

```bash
curl --location 'https://serverest.dev/usuarios/{_id}'
```

### Resultado esperado

```json
{
  "message": "Usuário não encontrado"
}
```

---

## Critério de aprovação

O teste será considerado aprovado quando o usuário for removido com sucesso e não puder mais ser recuperado por meio da API.
