describe('Add/Remove Elements no The Internet', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/add_remove_elements/')
  })

  it('Adicionar elemento', () => {
    cy.contains('button', 'Add Element').click()
    
    cy.get('.added-manually').should('have.length', 1)
  })

  it('Adicionar e remover elemento', () => {
    cy.contains('button', 'Add Element').click()
    cy.get('.added-manually').should('exist').click()
    
    cy.get('.added-manually').should('not.exist')
  })
})
