*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}    https://serverest.dev
${USUARIOS}    /usuarios
${LOGIN}       /login

*** Test Cases ***
CT-API-002 - Realizar Login com Sucesso
    # Gera um e-mail único
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

    # Cadastra um usuário administrador
    ${usuario}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=horadoqa-${email}
    ...    password=1q2w3e4r
    ...    administrador=true

    ${cadastro}=    POST On Session
    ...    serverest
    ...    ${USUARIOS}
    ...    json=${usuario}

    Status Should Be    201    ${cadastro}

    # Realiza login
    ${body_login}=    Create Dictionary
    ...    email=horadoqa-${email}
    ...    password=1q2w3e4r

    ${response}=    POST On Session
    ...    serverest
    ...    ${LOGIN}
    ...    json=${body_login}

    Status Should Be    200    ${response}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Strings
    ...    ${json["message"]}
    ...    Login realizado com sucesso

    Dictionary Should Contain Key
    ...    ${json}
    ...    authorization

    ${token}=    Set Variable    ${json["authorization"]}

    Should Start With
    ...    ${token}
    ...    Bearer

    Should Not Be Empty    ${token}

    Log    Token: ${token}

    # Disponibiliza o token para outros testes
    Set Suite Variable    ${AUTH_TOKEN}    ${token}

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}