describe('Floating Menu - Testes funcionais e visuais', () => {
  
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/floating_menu')
  })

  it('Deve exibir o menu flutuante na página', () => {
    cy.get('#menu').should('be.visible')
  })

  it('Deve conter os 4 links corretos no menu', () => {
    cy.get('#menu').should('be.visible')

    cy.get('#menu a[href="#home"]').should('contain', 'Home')
    cy.get('#menu a[href="#news"]').should('contain', 'News')
    cy.get('#menu a[href="#contact"]').should('contain', 'Contact')
    cy.get('#menu a[href="#about"]').should('contain', 'About')
    })
 

  it('Cada link deve ter um href válido', () => {
    cy.get('#menu a').each(($a) => {
      const href = $a.prop('href')
      expect(href).to.match(/#(home|news|contact|about)$/)
    })
  })

  it('O menu deve permanecer visível ao rolar a página', () => {
    cy.scrollTo('bottom')
    cy.wait(300)
    cy.get('#menu').should('be.visible')
  })

it('Menu permanece visível ao rolar a página (comportamento de fixo)', () => {
    cy.get('#menu').should('be.visible')
    cy.scrollTo('bottom')
    cy.get('#menu').should('be.visible')
  })
})