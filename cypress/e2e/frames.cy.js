describe('Frames - the-internet', () => {
   it('Deve acessar os Nested Frames e verificar LEFT, MIDDLE, RIGHT e BOTTOM', () => {
    cy.visit('https://the-internet.herokuapp.com/frames')
    cy.contains('a', 'Nested Frames').click()

    cy.get('frame[name="frame-top"]').then(($frameTop) => {
      const docTop = $frameTop[0].contentDocument
      const frameLeft = docTop.querySelector('frame[name="frame-left"]')
      cy.wrap(frameLeft.contentDocument.body)
        .should('contain.text', 'LEFT')
    })

    
    cy.get('frame[name="frame-top"]').then(($frameTop) => {
      const docTop = $frameTop[0].contentDocument
      const frameMiddle = docTop.querySelector('frame[name="frame-middle"]')
      cy.wrap(frameMiddle.contentDocument.body)
        .should('contain.text', 'MIDDLE')
    })

    
    cy.get('frame[name="frame-top"]').then(($frameTop) => {
      const docTop = $frameTop[0].contentDocument
      const frameRight = docTop.querySelector('frame[name="frame-right"]')
      cy.wrap(frameRight.contentDocument.body)
        .should('contain.text', 'RIGHT')
    })

    
    cy.get('frame[name="frame-bottom"]')
      .its('0.contentDocument.body')
      .should('contain.text', 'BOTTOM')
  })
  
    it('Deve acessar o iFrame e verificar existência do editor', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');
        cy.get('iframe[id="mce_0_ifr"]').then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).should('exist');
        });
    });
})
