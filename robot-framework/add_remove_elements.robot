*** Settings ***
Library    SeleniumLibrary
Test Setup       Open Page
Test Teardown    Close Browser

*** Variables ***
${URL}                     https://the-internet.herokuapp.com/add_remove_elements/
${BTN_ADD}                 xpath=//button[normalize-space(.)='Add Element']
${BTN_DELETE}              css=.added-manually

*** Test Cases ***
Adicionar elemento
    Click Button    ${BTN_ADD}
    Wait Until Element Is Visible    ${BTN_DELETE}    timeout=5s
    ${count}=    Get Element Count   ${BTN_DELETE}
    Should Be Equal As Integers      ${count}    1

Adicionar e remover elemento
    Click Button    ${BTN_ADD}
    Wait Until Element Is Visible    ${BTN_DELETE}    timeout=5s
    Click Element   ${BTN_DELETE}
    Wait Until Page Does Not Contain Element    ${BTN_DELETE}    timeout=5s

*** Keywords ***
Open Page
    Open Browser    ${URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${BTN_ADD}    timeout=5s
