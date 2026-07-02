# CT-API-011 - Buscar Usuário Inexistente

Este caso de teste valida o comportamento da API ao tentar consultar um usuário que não existe na base de dados.

---

## Cenário - Busca de usuário inexistente

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/usuarios/{_id}'
```

> Substitua `{_id}` por um identificador inválido ou inexistente.

---

## Resultado esperado

**Status Code:** `400 Bad Request`

```json
{
  "message": "Usuário não encontrado"
}
```

---

### Validações

* O endpoint deve retornar erro ao consultar um usuário inexistente.
* O status code deve indicar falha na requisição (`400 Bad Request`).
* A mensagem de erro deve ser `Usuário não encontrado`.
* Nenhum dado de usuário deve ser retornado.

---

### Critério de aprovação

O teste será considerado aprovado quando a API retornar corretamente o erro ao tentar buscar um usuário inexistente, sem expor qualquer dado válido.
