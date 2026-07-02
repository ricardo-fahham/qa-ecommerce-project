# CT-API-008 - Validar Exclusão do Usuário

Após a execução da exclusão do usuário, consulte o registro utilizando o identificador (`_id`) para confirmar que o usuário foi removido corretamente da base de dados.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/usuarios/{_id}'
```

---

## Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "message": "Usuário não encontrado"
}
```

### Validações

* O endpoint deve retornar o status `400 Bad Request`.
* A resposta deve conter a mensagem `Usuário não encontrado`.
* O usuário não deve mais existir na base de dados.
* O `_id` utilizado na requisição não deve retornar nenhum registro válido.

---

## Critério de aprovação

O teste será considerado aprovado quando a API confirmar que o usuário não foi encontrado após a exclusão, garantindo que o registro foi removido com sucesso.
