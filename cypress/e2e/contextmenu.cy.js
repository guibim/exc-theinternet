describe('Menu de Contexto', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/context_menu');
    });

    it('deve exibir o alerta ao clicar com o botão direito', () => {
        cy.get('#hot-spot').rightclick();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You selected a context menu');
        });
    });
});