*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}    https://serverest.dev
${ENDPOINT}    /usuarios

*** Test Cases ***
CT-API-001 - Cadastrar Usuário Administrador
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

    ${body}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=horadoqa@horadoqa.com.br
    ...    password=1q2w3e4r
    ...    administrador=true

    ${response}=    POST On Session
    ...    serverest
    ...    ${ENDPOINT}
    ...    json=${body}

    Status Should Be    201    ${response}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Strings
    ...    ${json["message"]}
    ...    Cadastro realizado com sucesso

    Dictionary Should Contain Key    ${json}    _id
    Should Not Be Empty    ${json["_id"]}

CT-API-002 - Não Permitir Cadastro com E-mail Duplicado
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

    ${body}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=horadoqa3@horadoqa.com.br
    ...    password=1q2w3e4r
    ...    administrador=true

    # Primeiro cadastro
    ${response}=    POST On Session
    ...    serverest
    ...    ${ENDPOINT}
    ...    json=${body}

    Status Should Be    201    ${response}

    # Segunda tentativa com o mesmo e-mail
    ${response}=    POST On Session
    ...    serverest
    ...    ${ENDPOINT}
    ...    json=${body}
    ...    expected_status=400

    Status Should Be    400    ${response}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Strings
    ...    ${json["message"]}
    ...    Este email já está sendo usado

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}