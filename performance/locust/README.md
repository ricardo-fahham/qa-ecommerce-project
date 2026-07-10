# Locust

## Sobre o Locust

O **Locust** é uma ferramenta de teste de carga e performance desenvolvida em Python.

Com ele é possível simular milhares de usuários virtuais acessando uma aplicação simultaneamente, permitindo validar:

- Capacidade de atendimento da aplicação;
- Tempo de resposta das APIs;
- Comportamento sob alta carga;
- Pontos de gargalo;
- Estabilidade do sistema durante testes de estresse.

Diferente de ferramentas baseadas em arquivos de configuração, o Locust permite escrever os cenários de teste utilizando Python, dando mais flexibilidade para criar fluxos reais de usuários, como:

- Cadastro de usuários;
- Login e autenticação;
- Consulta de dados;
- Compra de produtos;
- Navegação entre páginas;
- Execução de fluxos completos de negócio.

Durante a execução, o Locust disponibiliza uma interface web onde é possível configurar a quantidade de usuários virtuais, acompanhar métricas em tempo real e analisar os resultados do teste.

---

# Criando o Ambiente Virtual

É recomendado utilizar um ambiente virtual Python para evitar conflitos com outras bibliotecas instaladas no sistema.

Criar o ambiente:

```bash
python3 -m venv .venv
````

Ativar o ambiente:

### Linux / Mac

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Atualizar o gerenciador de pacotes:

```bash
python -m pip install --upgrade pip
```

---

# Instalação

Instale o Locust:

```bash
pip install locust
```

Validar a instalação:

```bash
locust --version
```

Exemplo de retorno:

```
locust 2.44.4
```

---

# Executando um teste

Exemplo executando um cenário de cadastro:

```bash
locust -f cadastro.py --host=https://serverest.dev
```

Onde:

* `-f cadastro.py` indica o arquivo contendo o cenário de teste;
* `--host` define a URL base da aplicação que será testada.

Exemplo de inicialização:

```
[2026-07-08 20:32:26,375] DESKTOP-059018K/INFO/locust.main:
Starting Locust 2.44.4

[2026-07-08 20:32:26,376] DESKTOP-059018K/INFO/locust.main:
Starting web interface at http://0.0.0.0:8089
```

---

# Interface Web

Após iniciar o Locust, acesse:

```
http://localhost:8089
```

ou:

```
http://0.0.0.0:8089
```

Na interface web é possível configurar:

* **Number of users**: quantidade de usuários virtuais;
* **Spawn rate**: quantidade de usuários criados por segundo;
* **Host**: endereço da aplicação alvo.

Exemplo:

```
Number of users: 100
Spawn rate: 10
Host: https://serverest.dev
```

Isso significa que o Locust irá criar 100 usuários virtuais aumentando a carga em uma taxa de 10 usuários por segundo.

---

# Estrutura de um teste Locust

Um cenário básico possui:

* Uma classe herdando de `HttpUser`;
* Tarefas utilizando o decorator `@task`;
* Tempo de espera entre ações utilizando `between()`.

Exemplo:

```python
from locust import HttpUser, task, between


class Usuario(HttpUser):

    wait_time = between(1, 3)

    @task
    def listar_usuarios(self):
        self.client.get("/usuarios")
```

Neste exemplo:

* Cada usuário virtual acessa o endpoint `/usuarios`;
* O intervalo entre chamadas varia entre 1 e 3 segundos.

---

# Exemplos de cenários

## Cadastro de usuário

Arquivo:

```
cadastro.py
```

Executa:

```
POST /usuarios
```

Criando usuários dinamicamente durante o teste.

---

## Login

Arquivo:

```
login.py
```

Executa:

```
POST /login
```

Realiza autenticação utilizando um usuário previamente criado.

---

# Execução via linha de comando

Também é possível executar testes sem a interface web:

```bash
locust \
  -f cadastro.py \
  --host=https://serverest.dev \
  --users 100 \
  --spawn-rate 10 \
  --run-time 5m
```

Parâmetros:

| Parâmetro      | Descrição                       |
| -------------- | ------------------------------- |
| `--users`      | Quantidade de usuários virtuais |
| `--spawn-rate` | Taxa de criação dos usuários    |
| `--run-time`   | Tempo de execução do teste      |

---

# Boas práticas

* Utilize ambientes isolados com `venv`;
* Não crie dados duplicados durante testes de carga;
* Utilize usuários de teste específicos;
* Monitore CPU, memória e banco de dados durante os testes;
* Comece com pouca carga e aumente gradativamente;
* Separe cenários por fluxo de negócio.

---

# Tecnologias utilizadas

* Python
* Locust
* API ServeRest
* HTTP/REST

