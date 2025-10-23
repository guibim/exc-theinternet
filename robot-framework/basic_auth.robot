*** Settings ***
Library    SeleniumLibrary
Test Setup       Open Page
Test Teardown    Close Browser

*** Variables ***
${URL}           https://the-internet.herokuapp.com/basic_auth
${USERNAME}      admin
${PASSWORD}      admin
${SUCCESS_MSG}   Congratulations! You must have the proper credentials.

*** Test Cases ***
Login básico com credenciais válidas
    Go To Authenticated Page
    Wait Until Page Contains    ${SUCCESS_MSG}    timeout=5s

*** Keywords ***
Open Page
    Open Browser    about:blank    chrome
    Maximize Browser Window

Go To Authenticated Page
    ${auth_url}=    Set Variable    https://${USERNAME}:${PASSWORD}@the-internet.herokuapp.com/basic_auth
    Go To    ${auth_url}
