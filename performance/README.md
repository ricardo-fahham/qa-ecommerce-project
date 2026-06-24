# Testes de Performance

Os **testes de performance em aplicações web** são um conjunto de técnicas utilizadas para avaliar como um sistema se comporta em termos de velocidade, estabilidade, escalabilidade e consumo de recursos sob diferentes condições de uso.

O objetivo principal é garantir que a aplicação ofereça uma boa experiência ao usuário, mesmo quando submetida a cargas elevadas de acesso.

## Principais objetivos

Os testes de performance ajudam a responder perguntas como:

* Quantos usuários simultâneos a aplicação suporta?
* Qual é o tempo médio de resposta das páginas e APIs?
* O sistema mantém a estabilidade durante picos de acesso?
* Existem gargalos no banco de dados, servidores ou rede?
* Como a aplicação se comporta após longos períodos de operação?

## Tipos de testes de performance

### 1. Teste de Carga (Load Testing)

Avalia o comportamento da aplicação sob uma carga esperada de usuários.

**Exemplo:**
Uma loja virtual que normalmente recebe 2.000 usuários simultâneos é testada com essa quantidade de acessos para verificar se o desempenho permanece aceitável.

**Métricas observadas:**

* Tempo de resposta
* Taxa de erros
* Uso de CPU e memória
* Throughput (requisições por segundo)

---

### 2. Teste de Estresse (Stress Testing)

Determina o limite operacional do sistema ao aumentar gradualmente a carga além da capacidade planejada.

**Exemplo:**
Aumentar os usuários simultâneos de 2.000 para 10.000 até identificar o ponto de falha.

**Objetivos:**

* Identificar gargalos
* Verificar mecanismos de recuperação
* Avaliar comportamento em situações extremas

---

### 3. Teste de Pico (Spike Testing)

Avalia a capacidade da aplicação de lidar com aumentos repentinos de tráfego.

**Exemplo:**
Uma plataforma de ingressos recebe um aumento de 500 para 20.000 usuários em poucos minutos após a abertura das vendas.

**Avalia:**

* Elasticidade da infraestrutura
* Tempo de recuperação após o pico

---

### 4. Teste de Volume (Volume Testing)

Analisa o desempenho quando grandes volumes de dados são processados.

**Exemplo:**
Consultar tabelas contendo milhões de registros no banco de dados.

**Avalia:**

* Performance de consultas
* Eficiência de índices
* Processamento de grandes datasets

---

### 5. Teste de Resistência (Endurance ou Soak Testing)

Verifica o comportamento do sistema durante longos períodos de operação contínua.

**Exemplo:**
Manter 3.000 usuários ativos durante 24 horas.

**Objetivos:**

* Detectar vazamentos de memória (memory leaks)
* Identificar degradação gradual de desempenho
* Validar estabilidade de longo prazo

---

## Métricas importantes

### Tempo de Resposta

Tempo entre a solicitação do usuário e a resposta da aplicação.

Exemplos:

* Excelente: < 1 segundo
* Bom: 1–3 segundos
* Acima de 5 segundos geralmente impacta a experiência do usuário

### Throughput

Quantidade de transações ou requisições processadas por unidade de tempo.

Exemplo:

* 5.000 requisições por segundo (RPS)

### Taxa de Erros

Percentual de requisições que retornam erro.

Exemplo:

* HTTP 500
* Timeout
* Falhas de conexão

### Utilização de Recursos

Monitoramento de:

* CPU
* Memória
* Disco
* Rede
* Banco de dados

### Concorrência

Número de usuários simultâneos ativos no sistema.

---

## Processo de execução

### 1. Planejamento

Definição de:

* Objetivos do teste
* Cenários de uso
* Critérios de aceitação

### 2. Modelagem da Carga

Simulação do comportamento real dos usuários:

Exemplos:

* Login
* Busca de produtos
* Cadastro
* Finalização de compra

### 3. Execução

Execução dos cenários com diferentes volumes de usuários.

### 4. Monitoramento

Coleta de métricas da aplicação e infraestrutura.

### 5. Análise dos Resultados

Identificação de:

* Gargalos
* Limites operacionais
* Oportunidades de otimização

---

## Ferramentas populares

### Apache JMeter

* Open source
* Amplamente utilizada
* Suporte a HTTP, APIs REST, SOAP, bancos de dados e protocolos diversos

### k6

* Scripts em JavaScript
* Integração com DevOps e CI/CD
* Fácil automação

### Gatling

* Alta performance
* Scripts em Scala
* Relatórios detalhados

### LoadRunner

* Solução corporativa
* Grande variedade de protocolos suportados

### Locust

* Baseado em Python
* Fácil customização de cenários

---

## Exemplos de cenários para aplicações web

### E-commerce

* Login
* Pesquisa de produtos
* Adição ao carrinho
* Checkout
* Pagamento

### Sistema Bancário

* Consulta de saldo
* Transferências
* Emissão de extratos

### API REST

* Autenticação
* Consultas
* Operações CRUD
* Upload de arquivos

### Portal Corporativo

* Acesso simultâneo de funcionários
* Upload e download de documentos
* Geração de relatórios

---

## Boas práticas

* Utilizar dados de teste próximos da realidade.
* Executar testes em ambientes semelhantes à produção.
* Monitorar aplicação, banco de dados e infraestrutura simultaneamente.
* Definir SLAs claros (tempo de resposta, disponibilidade e taxa de erros).
* Automatizar testes de performance no pipeline de CI/CD.
* Realizar testes periódicos após mudanças significativas na aplicação.

## Benefícios

A realização de testes de performance permite:

* Melhor experiência do usuário.
* Redução de indisponibilidades.
* Identificação precoce de gargalos.
* Planejamento adequado de capacidade.
* Maior confiabilidade em lançamentos.
* Redução de custos operacionais.

Em ambientes modernos de desenvolvimento, os testes de performance são tão importantes quanto os testes funcionais, pois garantem não apenas que a aplicação funcione corretamente, mas também que ela continue rápida e estável sob condições reais de uso.
