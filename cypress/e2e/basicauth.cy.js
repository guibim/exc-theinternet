describe('Basic Auth The-internet', () => {
    it('should login successfully with valid credentials', () => {
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        cy.contains('Congratulations! You must have the proper credentials.').should('be.visible');
    });
});