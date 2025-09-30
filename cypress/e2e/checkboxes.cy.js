describe('Checkboxes - the-internet.herokuapp.com', () => {
    const url = 'https://the-internet.herokuapp.com/checkboxes';

    beforeEach(() => {
        cy.visit(url);
    });

    it('deve exibir duas caixas de seleção', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2);
    });

    it('deve ter a primeira caixa de seleção desmarcada por padrão', () => {
        cy.get('input[type="checkbox"]').first().should('not.be.checked');
    });

    it('deve ter a segunda caixa de seleção marcada por padrão', () => {
        cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    });

    it('deve marcar a primeira caixa de seleção quando clicada', () => {
        cy.get('input[type="checkbox"]').first().check().should('be.checked');
    });

    it('deve desmarcar a segunda caixa de seleção quando clicada', () => {
        cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
    });

    it('deve permitir marcar e desmarcar ambas as caixas de seleção', () => {
        cy.get('input[type="checkbox"]').each(($el) => {
            cy.wrap($el).check().should('be.checked');
            cy.wrap($el).uncheck().should('not.be.checked');
        });
    });

    it('deve alternar o estado da caixa de seleção ao clicar', () => {
        cy.get('input[type="checkbox"]').each(($el) => {
            cy.wrap($el).click().should('have.prop', 'checked', !$el.prop('checked'));
            cy.wrap($el).click().should('have.prop', 'checked', $el.prop('checked'));
        });
    });
});
