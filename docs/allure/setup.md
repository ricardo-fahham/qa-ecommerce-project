# **Allure Report** 

O Allure Report deixa seu projeto de Cypress com cara de framework profissional mesmo.

Vou te mostrar o setup completo e direto ao ponto.

---

# 🚀 1. Instalar dependências

No seu projeto Cypress:

```bash
npm install --save-dev @shelex/cypress-allure-plugin allure-commandline
```

---

# ⚙️ 2. Configurar o Cypress

No seu `cypress.config.js`, adicione o plugin:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev",

    setupNodeEvents(on, config) {

      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;
    },
  },
});
```

---

# 📦 3. Configurar o support/e2e.js

No arquivo:

```bash
cypress/support/e2e.js
```

adicione:

```javascript
import '@shelex/cypress-allure-plugin';
```

---

# 🧪 4. Adicionar comandos opcionais (melhor prática)

Você pode enriquecer seus testes com steps:

```javascript
import allure from '@shelex/cypress-allure-plugin';

it('CT-API-001', () => {

  allure.step('Criar usuário', () => {
    cy.request('POST', '/usuarios', {...});
  });

});
```

---

# ▶️ 5. Rodar testes gerando resultados

Execute o Cypress assim:

```bash
npx cypress run
```

Isso vai gerar uma pasta:

```
allure-results/
```

---

# 📊 6. Gerar o relatório Allure

Depois rode:

```bash
npx allure generate allure-results --clean -o allure-report
```

---

# 🌐 7. Abrir o relatório

```bash
npx allure open allure-report
```

---

# 🔥 8. (Opcional PRO) adicionar script no package.json

```json
"scripts": {
  "test": "cypress run",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report"
}
```

---

# 🧠 Boas práticas para seu projeto (importante)

## ✔ Use Allure para:

* steps (ex: criar usuário, login, criar produto)
* evidência de requests
* separar cenários por feature

---

## ✔ Exemplo aplicado no seu estilo de API

```javascript
it('CT-API-001 - Criar produto', () => {

  allure.step('Criar usuário', () => {
    cy.request('POST', '/usuarios', {...});
  });

  allure.step('Fazer login', () => {
    cy.request('POST', '/login', {...});
  });

  allure.step('Criar produto', () => {
    cy.request('POST', '/produtos', {...});
  });

});
```

---

# ⚠️ Erros comuns

### ❌ Não aparece relatório

→ faltou rodar:

```bash
npx cypress run
```

---

### ❌ allure-results vazio

→ plugin não foi importado no `support/e2e.js`

---

### ❌ erro de compatibilidade

Se acontecer:

```bash
npm i -D allure-commandline@latest
```

---

# 🎯 Resultado final

Depois disso você terá:

* relatório visual completo
* steps detalhados
* status por teste
* histórico de execução
* comportamento profissional de pipeline

---

# 🚀 Se quiser evoluir ainda mais

Posso te ajudar a montar:

* Allure + CI (GitHub Actions)
* screenshots automáticos em falha
* logs de request/response dentro do relatório
* organização por suites (API / UI / E2E)
* integração com Cypress Custom Commands

Isso leva seu projeto para nível **portfólio de QA sênior**.
