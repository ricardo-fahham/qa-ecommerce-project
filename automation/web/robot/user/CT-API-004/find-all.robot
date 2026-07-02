*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}    https://serverest.dev
${USUARIOS}    /usuarios

*** Test Cases ***
CT-API-004 - Listar Usuários
    # Gera um e-mail único
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

    # Dados do usuário
    ${usuario}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
    ...    email=${email}
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

    # Lista todos os usuários
    ${response}=    GET On Session
    ...    serverest
    ...    ${USUARIOS}

    Status Should Be    200    ${response}

    ${json}=    Set Variable    ${response.json()}

    # Valida existência dos campos obrigatórios
    Dictionary Should Contain Key    ${json}    quantidade
    Dictionary Should Contain Key    ${json}    usuarios

    ${usuarios}=    Set Variable    ${json["usuarios"]}

    ${usuario_encontrado}=    Set Variable    ${False}

    FOR    ${item}    IN    @{usuarios}
        IF    "${item['_id']}" == "${id}"
            Should Be Equal As Strings    ${item["nome"]}    Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa
            Should Be Equal As Strings    ${item["email"]}    ${email}
            Should Be Equal As Strings    ${item["password"]}    1q2w3e4r
            Should Be Equal As Strings    ${item["administrador"]}    true
            ${usuario_encontrado}=    Set Variable    ${True}
            Exit For Loop
        END
    END

    Should Be True
    ...    ${usuario_encontrado}
    ...    Usuário cadastrado não foi encontrado na listagem.

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}