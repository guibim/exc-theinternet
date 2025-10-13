describe ('Infinite Scroll', () => {
    const URL = 'https://the-internet.herokuapp.com/infinite_scroll';

    it ('carrega a página e verifica o título', () => {
        cy.visit(URL);
        cy.contains('h3', 'Infinite Scroll').should('be.visible');

 })

    it ('rola a página e carrega mais conteúdo', () => {
        cy.visit(URL);
        cy.get('.jscroll-added').should('have.length', 2); // 2 parágrafos iniciais
        cy.scrollTo('bottom');
        cy.get('.jscroll-added').should('have.length.greaterThan', 2); // mais parágrafos carregados
    }
    )
    it ('rola várias vezes e verifica o carregamento contínuo', () => {
        cy.visit(URL);
        cy.get('.jscroll-added').should('have.length', 2);
        for (let i = 0; i < 5; i++) {
            cy.scrollTo('bottom');
            cy.wait(500); // espera o carregamento
            cy.get('.jscroll-added').should('have.length.greaterThan', 2 + i);
        }
    }
)   
 })