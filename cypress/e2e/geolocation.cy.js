describe('Geolocation - The Internet', () => {
    it('Deve acionar a função Geolocation', () => {
        cy.visit('https://the-internet.herokuapp.com/geolocation');

       
        cy.window().then((win) => {  //injetando coordenada
            cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                .callsFake((cb) => {
                    cb({ coords: { latitude: 51.1, longitude: 45.3 } });
                });
        });

        cy.contains('button', 'Where am I?').click();

        
        cy.get('#lat-value').should('contain', '51.1');
        cy.get('#long-value').should('contain', '45.3');
    });
});