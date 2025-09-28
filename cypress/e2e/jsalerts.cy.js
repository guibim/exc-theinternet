describe('JavaScript Alerts no The Internet', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
  })

  it('JS Alert - simples OK', () => {
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('I am a JS Alert')
    })
    cy.contains('Click for JS Alert').click()
    cy.get('#result').should('have.text', 'You successfully clicked an alert')
  })

  it('JS Confirm - aceitar (OK)', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('I am a JS Confirm')
      return true // "OK"
    })
    cy.contains('Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Ok')
  })

  it('JS Confirm - cancelar', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('I am a JS Confirm')
      return false // "Cancel"
    })
    cy.contains('Click for JS Confirm').click()
    cy.get('#result').should('have.text', 'You clicked: Cancel')
  })

 it('JS Prompt - digitar valor', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Teste') // simula input e o stub injeta o valor
    })
    cy.contains('Click for JS Prompt').click()
    cy.get('#result').should('have.text', 'You entered: Teste')
  })

  it('JS Prompt - cancelar', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(null)
    })
    cy.contains('Click for JS Prompt').click()
    cy.get('#result').should('have.text', 'You entered: null')
  })
})
