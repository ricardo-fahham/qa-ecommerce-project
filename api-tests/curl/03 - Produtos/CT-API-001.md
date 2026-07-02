# CT-API-001 - Cadastrar Produto (CREATE)

Para cadastrar um produto, é necessário utilizar o token de autenticação obtido no endpoint de login.

Envie o token no cabeçalho `Authorization` utilizando o padrão:

```http
Authorization: Bearer <token>
```

### Exemplo de requisição

```bash
curl --location 'https://serverest.dev/produtos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
  "nome": "Mouse Gamer QA",
  "preco": 150,
  "descricao": "Mouse para testes de automação",
  "quantidade": 0
}'
```

---

## Resultado esperado

**Status Code:** `201 Created`

**Response Body:**

```json
{
  "message": "Cadastro realizado com sucesso",
  "_id": "luZ2p6CIt58ggE67"
}
```

### Validações

* O token de autenticação deve ser válido.
* O produto deve ser cadastrado com sucesso.
* A resposta deve retornar a mensagem de confirmação.
* O campo `_id` deve ser gerado automaticamente e retornado na resposta.


---

## 🧪 Cenários importantes para QA (recomendado)

### ✔ Sem passar o token

```bash
curl --location 'https://serverest.dev/produtos' \
--header 'Content-Type: application/json' \
--data-raw '{
  "nome": "Mouse Gamer QA",
  "preco": 150,
  "descricao": "Mouse para testes de automação",
  "quantidade": 10
}'
```

## Esperado:

```json
{
  "message": "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
}
```

---

### ✔ Produto com nome duplicado

```bash
curl --location 'https://serverest.dev/produtos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
  "nome": "Mouse Gamer QA",
  "preco": 150,
  "descricao": "Duplicado",
  "quantidade": 5
}'
```

---

## Esperado:

```json
{
    "message": "Já existe produto com esse nome"
}
```

---

### ✔ Produto com preço inválido

```bash
curl --location 'https://serverest.dev/produtos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
  "nome": "Produto inválido",
  "preco": -10,
  "descricao": "Teste negativo",
  "quantidade": 5
}'
```

---

## Esperado:

```json
{
    "preco": "preco deve ser um número positivo"
}
```

---

### ✔ Produto sem estoque

```bash
curl --location 'https://serverest.dev/produtos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '{
  "nome": "Sem estoque",
  "preco": 100,
  "descricao": "Produto sem estoque",
  "quantidade": 0
}'
```