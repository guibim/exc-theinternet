describe('Funcionalidade Dropdown', () => {
    it('Deve selecionar uma opção no dropdown', () => {
        cy.visit('https://the-internet.herokuapp.com/dropdown')
        cy.get('#dropdown').select('Option 1').should('have.value', '1')
    })

    it('Deve selecionar outra opção no dropdown', () => {
        cy.visit('https://the-internet.herokuapp.com/dropdown')
        cy.get('#dropdown').select('Option 2').should('have.value', '2')
    })
})