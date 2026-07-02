# CT-API-006 - Validar Alteração do Usuário (READ ONE)

Após a execução da atualização do usuário, consulte o registro utilizando o identificador (`_id`) para validar se as alterações foram aplicadas corretamente.

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
  "nome": "Ricardo Fahham Atualizado",
  "email": "ricardo.qa@example.com",
  "password": "123456",
  "administrador": "true",
  "_id": "DOQOugWPYpvN3OaS"
}
```

### Validações

* O endpoint deve retornar o status `200 OK`.
* O usuário deve ser localizado pelo `_id` informado.
* Os dados retornados devem refletir as alterações realizadas na atualização.
* O campo `_id` deve permanecer inalterado.
* Todos os campos modificados devem conter os novos valores.

---

## Critério de aprovação

O teste será considerado aprovado quando os dados do usuário retornados pela API corresponderem exatamente às informações enviadas no processo de atualização.
