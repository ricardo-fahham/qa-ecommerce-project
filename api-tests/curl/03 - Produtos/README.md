# CTs de Produtos (API)

Este documento contém a suíte de testes dos endpoints relacionados a **Produtos** na API ServeRest.

## 📌 Objetivo

Validar o fluxo completo de CRUD de produtos, incluindo autenticação, criação, leitura, atualização, exclusão e validações.

---

## 🧪 Suíte de Testes - Produtos

### 🔹 Autenticação e Base

* CT-API-002 - Realizar Login com Sucesso

---

### 🔹 CRUD de Produtos

* CT-API-001 - Cadastrar Produto (CREATE)
* CT-API-002 - Buscar Produto por ID (READ ONE)
* CT-API-003 - Listar Produtos (READ ALL)
* CT-API-004 - Atualizar Produto (UPDATE)
* CT-API-005 - Validar Atualização do Produto
* CT-API-006 - Excluir Produto (DELETE)
* CT-API-007 - Validar Exclusão do Produto

---

## 🔹 Cenários Negativos e Validações

* CT-API-009 - Login com Credenciais Inválidas
* CT-API-010 - Cadastro de Usuário com E-mail Duplicado *(dependência indireta de produtos via autenticação)*
* CT-API-011 - Buscar Usuário Inexistente *(validação de comportamento da API em erro genérico)*

---

## 🔁 Fluxo sugerido de execução

1. Login com sucesso
2. Criar produto
3. Consultar produto por ID
4. Listar produtos
5. Atualizar produto
6. Validar atualização
7. Excluir produto
8. Validar exclusão

---

## 🎯 Critérios gerais

* Todos os endpoints devem retornar os status codes esperados
* Os dados devem ser consistentes entre operações
* Operações de DELETE devem impedir recuperação do recurso
* Atualizações devem persistir corretamente

---
