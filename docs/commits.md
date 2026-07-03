# Commit Semântico

## Estrutura básica

Uma mensagem de commit semântico segue o seguinte formato estrutural:

<tipo>(<escopo opcional>): <descrição>
[corpo opcional]
[rodapé opcional]

## Tipos mais comuns

Os prefixos definem a natureza da alteração:

- `feat`: Uma nova funcionalidade adicionada ao projeto.
- `fix`: Correção de um bug ou erro no código.
- `docs`: Alterações apenas na documentação do projeto.
- `refactor`: Refatoração de código que não adiciona novas funcionalidades nem corrige bugs.
- `test`: Adição ou correção de testes automatizados.
- `chore`: Tarefas de manutenção do sistema, sem alterar o código de produção ou testes.
- `perf`: Alteração que melhora o desempenho da aplicação.

## Exemplos práticos

- feat(login): adicionar autenticação via Google OAuth
- fix(api): corrigir erro 500 ao enviar formulário vazio
- docs(readme): atualizar instruções de instalação