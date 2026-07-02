# CT-API-003 - Listar Produtos e Localizar um Produto sem Conhecer o ID (READ ALL)

Quando o identificador (`_id`) do produto não é conhecido, é possível consultar a lista completa de produtos e localizar o registro desejado por meio de seus atributos, como o nome.

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/produtos'
```

---

## Resultado esperado

**Status Code:** `200 OK`

**Response Body:**

```json
{
  "quantidade": 15,
  "produtos": [
    {
      "nome": "Mouse Gamer QA",
      "preco": 150,
      "descricao": "Mouse para testes de automação",
      "quantidade": 0,
      "_id": "zlC4WQzJL2FCGki1"
    }
  ]
}
```

> Observação: a quantidade de produtos e os dados retornados podem variar de acordo com o ambiente e os registros existentes no momento da execução.

### Validações

* O endpoint deve retornar o status `200 OK`.
* A resposta deve conter o campo `quantidade`.
* A resposta deve conter o array `produtos`.
* O produto cadastrado anteriormente deve estar presente na lista.
* O registro localizado deve conter um `_id` válido.
* Os dados do produto retornado devem corresponder aos dados cadastrados.

---

## Filtrar pelo nome do produto

Após obter a lista de produtos, é possível localizar o produto desejado utilizando o campo `nome`.

### Exemplo de filtro

```json
{
  "nome": "Mouse Gamer QA 2"
}
```

### Validação

* Deve existir um produto com o nome informado.
* O `_id` retornado poderá ser utilizado nos cenários de consulta, atualização e exclusão do produto.
