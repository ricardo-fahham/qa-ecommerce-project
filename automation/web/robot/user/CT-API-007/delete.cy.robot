*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}    https://serverest.dev
${USUARIOS}    /usuarios

*** Test Cases ***
CT-API-007 - Excluir Usuário
    # Gera um e-mail único
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

    # Dados do usuário
    ${usuario}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=${email}
    ...    password=1q2w3e4r
    ...    administrador=true

    # Cadastra o usuário
    ${cadastro}=    POST On Session
    ...    serverest
    ...    ${USUARIOS}
    ...    json=${usuario}

    Status Should Be    201    ${cadastro}

    ${cadastro_json}=    Set Variable    ${cadastro.json()}
    ${id}=    Set Variable    ${cadastro_json["_id"]}

    # Exclui o usuário
    ${response}=    DELETE On Session
    ...    serverest
    ...    ${USUARIOS}/${id}

    Status Should Be    200    ${response}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Strings
    ...    ${json["message"]}
    ...    Registro excluído com sucesso

    # Consulta o usuário após a exclusão
    ${consulta}=    GET On Session
    ...    serverest
    ...    ${USUARIOS}/${id}
    ...    expected_status=400

    Status Should Be    400    ${consulta}

    ${consulta_json}=    Set Variable    ${consulta.json()}

    Should Be Equal As Strings
    ...    ${consulta_json["message"]}
    ...    Usuário não encontrado

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}