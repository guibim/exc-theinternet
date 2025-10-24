*** Settings ***
Library    SeleniumLibrary
Test Setup       Abrir Página
Test Teardown    Fechar Navegador

*** Variables ***
${URL}     https://the-internet.herokuapp.com/checkboxes
${CBX1}    xpath=(//input[@type='checkbox'])[1]
${CBX2}    xpath=(//input[@type='checkbox'])[2]

*** Test Cases ***
Deve alternar o estado da primeira caixa de seleção ao clicar
    Unselect Checkbox    ${CBX1}
    Checkbox Should Not Be Selected    ${CBX1}
    Click Element    ${CBX1}
    Checkbox Should Be Selected    ${CBX1}
    Click Element    ${CBX1}
    Checkbox Should Not Be Selected    ${CBX1}

Deve alternar o estado da segunda caixa de seleção ao clicar
    Select Checkbox    ${CBX2}
    Checkbox Should Be Selected    ${CBX2}
    Click Element    ${CBX2}
    Checkbox Should Not Be Selected    ${CBX2}
    Click Element    ${CBX2}
    Checkbox Should Be Selected    ${CBX2}

*** Keywords ***
Abrir Página
    Open Browser    ${URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    xpath=//input[@type='checkbox']

Fechar Navegador
    Close Browser
