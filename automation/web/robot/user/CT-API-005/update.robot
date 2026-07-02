*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

Suite Setup    Criar Sessao

*** Variables ***
${BASE_URL}    https://serverest.dev
${USUARIOS}    /usuarios

*** Test Cases ***
CT-API-005 - Atualizar Usuário
    # Gera um e-mail único para o cadastro
    ${email}=    Generate Random String    10    [LOWER]
    ${email}=    Set Variable    ${email}@example.com

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

    # Gera um novo e-mail para atualização
    ${novo_email}=    Generate Random String    10    [LOWER]
    ${novo_email}=    Set Variable    ${novo_email}@example.com

    ${usuario_atualizado}=    Create Dictionary
    ...    nome=Hora do QA - Aprenda sobre Testes de API em: https://youtube.com/@horadoqa - Atualizado
    ...    email=${novo_email}
    ...    password=4r3e2w1q
    ...    administrador=true

    # Atualiza o usuário
    ${response}=    PUT On Session
    ...    serverest
    ...    ${USUARIOS}/${id}
    ...    json=${usuario_atualizado}

    Status Should Be    200    ${response}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Strings
    ...    ${json["message"]}
    ...    Registro alterado com sucesso

    # Consulta o usuário atualizado
    ${consulta}=    GET On Session
    ...    serverest
    ...    ${USUARIOS}/${id}

    Status Should Be    200    ${consulta}

    ${usuario_consulta}=    Set Variable    ${consulta.json()}

    # Valida que os dados foram atualizados
    Should Be Equal As Strings
    ...    ${usuario_consulta["nome"]}
    ...    ${usuario_atualizado["nome"]}

    Should Be Equal As Strings
    ...    ${usuario_consulta["email"]}
    ...    ${usuario_atualizado["email"]}

    Should Be Equal As Strings
    ...    ${usuario_consulta["password"]}
    ...    ${usuario_atualizado["password"]}

    Should Be Equal As Strings
    ...    ${usuario_consulta["administrador"]}
    ...    ${usuario_atualizado["administrador"]}

    # Valida que o ID permaneceu o mesmo
    Should Be Equal As Strings
    ...    ${usuario_consulta["_id"]}
    ...    ${id}

*** Keywords ***
Criar Sessao
    Create Session
    ...    serverest
    ...    ${BASE_URL}
    ...    headers={"Content-Type":"application/json"}