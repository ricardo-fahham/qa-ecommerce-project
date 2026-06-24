# qa-ecommerce-project

Projeto de Quality Assurance desenvolvido para validar a aplicação de e-commerce disponibilizada pela [Serverest](https://serverest.dev/), simulando atividades executadas por um Analista de QA em um ambiente real de desenvolvimento.

O objetivo deste projeto é demonstrar conhecimentos em testes manuais e automatizados, qualidade de software, integração contínua e reporte de defeitos, utilizando ferramentas amplamente adotadas pelo mercado.

## **Principais atividades**

* Elaboração de Plano de Testes
* Criação e execução de Casos de Teste
* Testes funcionais e exploratórios
* Automação de testes Web
* Automação e validação de APIs REST
* Registro, documentação e acompanhamento de bugs
* Geração de relatórios e evidências de testes
* Integração dos testes em pipeline CI/CD

## **Tecnologias e Ferramentas**

### Automação Web

* Cypress
* Playwright
* Robot Framework

### Testes de API

* Postman
* Newman

### Qualidade e Gestão

* Jira
* TestRail
* Git e GitHub

### Integração Contínua

* GitHub Actions

## **Competências demonstradas**

* Planejamento e estratégia de testes
* Criação de cenários e casos de teste
* Automação de testes E2E
* Testes de APIs REST
* Reporte e rastreamento de defeitos
* Integração contínua e execução automatizada
* Boas práticas de QA e documentação técnica

## **Objetivo Profissional**

Este projeto faz parte do meu portfólio de QA e demonstra minha capacidade de atuar em diferentes etapas do ciclo de testes, desde a análise de requisitos até a automação, execução e monitoramento contínuo da qualidade do software.

## **Como Contribuir**

### 1. Fazer um Fork do projeto

Se você não tem permissão de escrita no repositório original:

- Acesse o repositório no GitHub.
- Clique em Fork.
- O GitHub criará uma cópia do projeto na sua conta.

### 2. Clonar seu Fork

```bash
git clone git@github.com:{seu-github}/qa-ecommerce-project.git
```

Acessar a pasta do projeto:

```bash
cd qa-ecommerce-project
```

### 3. Configurar o repositório original como upstream

Isso facilita sincronizar seu fork com o projeto principal.

Ver os remotes atuais:

```bash
git remote -v
```

Resposta:

```bash
origin  git@github.com:horadoqa/qa-ecommerce-project.git (fetch)
origin  git@github.com:horadoqa/qa-ecommerce-project.git (push)
```

Adicionar o upstream:

```bash
git remote add upstream https://github.com/ricardo-fahham/qa-ecommerce-project.git
```

Verificar a alteração:

```bash
git remote -v
```

Resposta:

```bash
origin  git@github.com:horadoqa/qa-ecommerce-project.git (fetch)
origin  git@github.com:horadoqa/qa-ecommerce-project.git (push)
upstream        https://github.com/ricardo-fahham/qa-ecommerce-project.git (fetch)
upstream        https://github.com/ricardo-fahham/qa-ecommerce-project.git (push)
```

### 4. Atualizar sua branch local

Antes de começar uma nova contribuição:

```bash
git checkout main
```

Buscar alterações:

```bash
git fetch upstream
```

Atualizar sua branch:

```bash
git merge upstream/main
```

### 5. Criar uma branch para a contribuição

```bash
git checkout -b feat/performance
```

### 6. Fazer as alterações

Edite os arquivos necessários.

Verifique as mudanças:

```bash
git status
```

7. Adicionar arquivos ao commit

Adicionar tudo:

```bash
git add .
```

8. Fazer o commit

Use uma mensagem clara.

Muitos projetos seguem o padrão Conventional Commits:

- feat:
- fix:
- docs:
- refactor:
- test:
- chore:

```bash
git commit -m 'Adicionando Teste de Performance' 
```

9. Enviar a branch para seu fork

```bash
git push --set-upstream origin feat/performance
```

10. Abrir o Pull Request

- Acesse seu fork no GitHub.
- O GitHub normalmente mostrará um botão Compare & Pull Request.
- Clique nele.

Verifique:

- Base repository → projeto original
- Base branch → main
- Compare branch → sua branch

[Create a pull request for 'feat/performance' on GitHub by visiting:](https://github.com/horadoqa/qa-ecommerce-project/pull/new/feat/performance)


11. Preencher a descrição do PR

Explique o que foi feito:

> Adicionada validação de CPF no cadastro de clientes.