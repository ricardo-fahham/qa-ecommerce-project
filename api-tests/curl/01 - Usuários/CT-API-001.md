# CT-API-001 - Cadastrar Usuário Administrador (CREATE)

Para cadastrar um usuário administrador, envie os dados obrigatórios no corpo da requisição, informando o campo `administrador` com o valor `true`.

## CT-API-001.1 - Cadastro com sucesso

```bash
curl --location 'https://serverest.dev/usuarios' \
--header 'Content-Type: application/json' \
--data-raw '{
  "nome": "Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa",
  "email": "horadoqa@example.com",
  "password": "1q2w3e4r",
  "administrador": "true"
}'
```

---

## Resultado esperado

**Status Code:** `201 Created`

**Response Body:**

```json
{
  "message": "Cadastro realizado com sucesso",
  "_id": "DOQOugWPYpvN3OaS"
}
```

### Validações

* O endpoint deve retornar o status `201 Created`.
* O usuário deve ser cadastrado com sucesso.
* A resposta deve conter a mensagem `Cadastro realizado com sucesso`.
* O campo `_id` deve ser gerado automaticamente.
* O usuário deve ser criado com perfil de administrador.
* O e-mail informado deve ser único na base de dados.

---

# Cenários Alternativos

## CT-API-001.2 - Cadastro com e-mail duplicado

Execute novamente a requisição utilizando um e-mail já cadastrado.

### Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "message": "Este email já está sendo usado"
}
```

### Validações

* O endpoint deve retornar `400 Bad Request`.
* O cadastro não deve ser realizado.
* A resposta deve conter a mensagem `Este email já está sendo usado`.
* Nenhum novo usuário deve ser criado.

---

## CT-API-001.3 - Cadastro com campos obrigatórios vazios

Enviar um ou mais campos obrigatórios vazios.

### Exemplos

```json
{
  "nome": "",
  "email": "",
  "password": "",
  "administrador": ""
}
```

ou

```json
{
  "nome": "Hora do QA",
  "email": "",
  "password": "123456",
  "administrador": "true"
}
```

### Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "nome": "nome não pode ficar em branco",
  "email": "email não pode ficar em branco",
  "password": "password não pode ficar em branco",
  "administrador": "administrador deve ser 'true' ou 'false'"
}
```

### Validações

* O cadastro não deve ser realizado.
* A API deve informar quais campos são obrigatórios ou inválidos.
* Nenhum usuário deve ser criado.

---

## CT-API-001.4 - Cadastro com tipos de dados inválidos

Enviar valores diferentes de `string` para os campos da requisição.

### Exemplos

```json
{
  "nome": 12345,
  "email": true,
  "password": 987654,
  "administrador": false
}
```

ou

```json
{
  "nome": ["horadoqa"],
  "email": {
    "email": "teste@email.com"
  },
  "password": null,
  "administrador": 1
}
```

### Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "nome": "nome deve ser uma string",
  "email": "email deve ser uma string",
  "password": "password deve ser uma string",
  "administrador": "administrador deve ser 'true' ou 'false'"
}
```

### Validações

* O endpoint deve validar o tipo dos dados recebidos.
* O cadastro não deve ser realizado.
* A resposta deve informar que os campos possuem formato inválido.

---

## CT-API-001.5 - Cadastro com formato de e-mail inválido

Validar diferentes formatos incorretos para o campo `email`.

### Casos de teste

| Cenário              | Exemplo                  |
| -------------------- | ------------------------ |
| Sem `@`              | `horadoqa.example.com`   |
| Sem domínio          | `horadoqa@`              |
| Sem usuário          | `@gmail.com`             |
| Sem TLD              | `horadoqa@gmail`         |
| Com espaços          | `horadoqa @gmail.com`    |
| Espaço no início/fim | `" horadoqa@gmail.com "` |
| Dois `@`             | `horadoqa@@gmail.com`    |
| Caracteres inválidos | `horadoqa#gmail.com`     |
| Domínio inválido     | `horadoqa@gmail.`        |
| Apenas texto         | `emailinvalido`          |

### Resultado esperado

**Status Code:** `400 Bad Request`

### Validações

* O endpoint deve validar o formato do e-mail.
* O cadastro não deve ser realizado.
* A API deve retornar mensagem informando e-mail inválido.

> **Observação:** Conforme o padrão RFC para endereços de e-mail, letras maiúsculas são válidas. Caso a API aceite esse formato (por exemplo, `horadoqa@GMAIL.COM`), o teste deve esperar `201 Created`. Se existir uma regra de negócio que exija apenas letras minúsculas, o teste deverá validar essa restrição.

---

## CT-API-001.6 - Cadastro com campos ausentes

Enviar a requisição omitindo um ou mais campos obrigatórios.

### Exemplo

```json
{
  "nome": "Hora do QA",
  "password": "123456"
}
```

### Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "nome": "nome é obrigatório",
  "email": "email é obrigatório",
  "password": "password é obrigatório",
  "message": "Adicione aspas em todos os valores. Para mais informações acesse a issue https://github.com/ServeRest/ServeRest/issues/225"
}
```

### Validações

* A API deve identificar os campos obrigatórios ausentes.
* O cadastro não deve ser realizado.
* Nenhum usuário deve ser criado.

---

## CT-API-001.7 - Cadastro com valor inválido para o campo administrador

Enviar valores diferentes de `"true"` ou `"false"`.

### Exemplos

```json
{
  "nome": "Hora do QA",
  "email": "horadoqa@example.com",
  "password": "123456",
  "administrador": "admin"
}
```

ou

```json
{
  "administrador": "123"
}
```

### Resultado esperado

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
  "administrador": "administrador deve ser 'true' ou 'false'"
}
```

### Validações

* A API deve validar o conteúdo do campo `administrador`.
* O cadastro não deve ser realizado.
* Deve ser retornada mensagem de erro apropriada.

---

## CT-API-001.8 - Cadastro com campos contendo apenas espaços

Enviar os campos preenchidos apenas com espaços em branco.

### Exemplo

```json
{
  "nome": "     ",
  "email": "     ",
  "password": "     ",
  "administrador": "true"
}
```

### Resultado esperado

**Status Code:** `400 Bad Request`

### Validações

* A API não deve aceitar campos contendo apenas espaços.
* O cadastro não deve ser realizado.
* Nenhum usuário deve ser criado.

---

## CT-API-001.9 - Cadastro com valores nos limites permitidos

Validar o comportamento da API utilizando valores nos limites mínimo e máximo aceitos.

### Exemplos

* Nome com o número máximo de caracteres permitido.
* Nome excedendo o limite máximo.
* Senha com o número mínimo de caracteres permitido.
* Senha abaixo do número mínimo de caracteres permitido.

### Resultado esperado

**Status Code:** Conforme as regras de validação da API.

### Validações

* A API deve aceitar valores dentro dos limites definidos.
* A API deve rejeitar valores que ultrapassem os limites estabelecidos.
* As mensagens de erro devem ser claras e consistentes.

---

# Critério de Aprovação

O teste será considerado aprovado quando:

* O cadastro de um usuário administrador for realizado com sucesso utilizando dados válidos.
* A API impedir cadastros com e-mails duplicados.
* A API validar corretamente campos obrigatórios.
* A API validar o tipo dos dados enviados.
* A API validar formatos inválidos de e-mail.
* A API impedir requisições com campos ausentes.
* A API validar corretamente o campo `administrador`.
* Em todos os cenários inválidos, a API não deve persistir nenhum registro na base de dados.
