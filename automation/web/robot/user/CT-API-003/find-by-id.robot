*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}     https://serverest.dev
${USUARIOS}     /usuarios

*** Test Cases ***
CT-API-003 - Buscar Usuário por ID
    # Gera um e-mail único
   ${email}=          Generate Random String    10    [LOWER]
   ${email}=          Set Variable    ${email}@example.com
   ${email_completo}=    Set Variable    horadoqa-${email}

    # Dados do usuário
    ${usuario}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=${email_completo}
    ...    password=1q2w3e4r
    ...    administrador=true

    # Cadastro do usuário
    ${cadastro}=    POST On Session
    ...    serverest
    ...    ${USUARIOS}
    ...    json=${usuario}

    Status Should Be    201    ${cadastro}

    ${cadastro_json}=    Set Variable    ${cadastro.json()}
    ${id}=    Set Variable    ${cadastro_json["_id"]}

    # Busca usuário pelo ID
    ${response}=    GET On Session
    ...    serverest
    ...    ${USUARIOS}/${id}

    Status Should Be    200    ${response}

    ${json}=    Set Variable    ${response.json()}

    # Validações
    Should Be Equal As Strings
    ...    ${json["nome"]}
    ...    ${usuario["nome"]}

    Should Be Equal As Strings
    ...    ${json["email"]}
    ...    ${email_completo}

    Should Be Equal As Strings
    ...    ${json["password"]}
    ...    ${usuario["password"]}

    Should Be Equal As Strings
    ...    ${json["administrador"]}
    ...    ${usuario["administrador"]}

    Should Be Equal As Strings
    ...    ${json["_id"]}
    ...    ${id}

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}