describe('Disappearing Elements (simples)', () => {
  const url = 'https://the-internet.herokuapp.com/disappearing_elements'
  const FIXOS = ['Home', 'About', 'Contact Us', 'Portfolio']
  const OPCIONAL = 'Gallery' 

  beforeEach(() => {
    cy.visit(url)
  })

  it('renderiza 4 ou 5 links e contém os 4 fixos', () => {
    cy.get('ul li a')
      .should('have.length.within', 4, 5)
      .then(($as) => {
        const textos = $as.toArray().map((a) => a.innerText.trim())
        FIXOS.forEach((t) => expect(textos).to.include(t))
      })
  })

  it('Contagem varia entre recarregamentos', () => {
    const contagens = []
    Cypress._.times(6, () => {
      cy.visit(url)
      cy.get('ul li a')
        .its('length')
        .then((n) => contagens.push(n))
    })
    cy.then(() => {
      const distintos = Array.from(new Set(contagens))
      expect(
        distintos.length,
        `contagens: ${contagens.join(', ')}`
      ).to.be.greaterThan(1)
    })
  })

it('os 4 links fixos são clicáveis e mudam a URL', () => {
  const FIXOS = ['Home', 'About', 'Contact Us', 'Portfolio']

  FIXOS.forEach((texto) => {
    cy.contains('ul li a', texto)   
      .should('have.attr', 'href') 
      .then((href) => {
        cy.contains('ul li a', texto).click()   // clica
        cy.url().should('include', href)       // valida 
        cy.go('back')                          // volta
        cy.url().should('include', '/disappearing_elements')
      })
  })
})
it('valida o link opcional "Gallery" quando aparecer', () => {
  cy.get('ul li a').then(($as) => {
    const textos = $as.toArray().map((a) => a.innerText.trim())
    if (textos.includes('Gallery')) {
      cy.contains('ul li a', 'Gallery')
        .should('have.attr', 'href')
        .then((href) => {
          cy.contains('ul li a', 'Gallery').click()
          cy.url().should('include', href)
          cy.go('back')
          cy.url().should('include', '/disappearing_elements')
        })
    } else {
      cy.log('Gallery não apareceu nesta run')
    }
  })
})})