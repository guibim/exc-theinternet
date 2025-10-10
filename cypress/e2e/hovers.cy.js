import 'cypress-real-events/support';

describe('Hovers', () => {
  const URL = 'https://the-internet.herokuapp.com/hovers';

  it('carrega a página e mostra os avatares', () => {
    cy.visit(URL);
    cy.contains('h3', 'Hovers').should('be.visible');
    cy.get('.figure').should('have.length', 3);     // 3 avatares
    cy.get('.figcaption').should('not.be.visible'); // legenda oculta
  });

 
  it('mostra a legenda e o link ao passar o mouse', () => {
    cy.visit(URL);

    cy.get('.figure').each(($card, idx) => {
      cy.wrap($card).realHover(); // plugin para hover

      cy.wrap($card)
        .find('.figcaption')
        .should('be.visible')
        .and('contain.text', `user${idx + 1}`)
        .find('a')
        .should('have.text', 'View profile')
        .and('have.attr', 'href', `/users/${idx + 1}`);
    });
  });
   it('verifica se os links "View profile" respondem', () => {
     cy.visit(URL);

    cy.get('.figure').each(($card, idx) => {
      cy.wrap($card).realHover();

      const userNumber = idx + 1;
      const fullUrl = `https://the-internet.herokuapp.com/users/${userNumber}`;

      cy.request({ url: fullUrl, failOnStatusCode: false })
        .its('status')
        .should('be.oneOf', [200, 404]);
        });
    });
});
