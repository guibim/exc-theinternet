describe('Forgot Password', () => {

  it('Deve exibir o formulário de recuperação de senha', () => {
    cy.visit('https://the-internet.herokuapp.com/forgot_password')

    cy.get('h2').should('contain', 'Forgot Password')
    cy.get('#email').should('be.visible')
    cy.get('#form_submit').should('be.visible').and('contain', 'Retrieve password')
  })

  it('Deve tentar enviar o formulário e exibir erro 500', () => {
    cy.intercept('POST', 'https://the-internet.herokuapp.com/forgot_password').as('postForgot')

    cy.visit('https://the-internet.herokuapp.com/forgot_password')
    cy.get('#email').type('teste@teste.com')
    cy.get('#form_submit').click()

    cy.wait('@postForgot').then((interception) => {
      expect(interception.response.statusCode).to.eq(500)
    })

    
    cy.contains('Internal Server Error', { timeout: 5000 }).should('exist')
  })

  it('API: Deve retornar erro 500 ao enviar o formulário', () => {
    cy.request({
      method: 'POST',
      url: 'https://the-internet.herokuapp.com/forgot_password',
      form: true,
      body: { email: 'teste@teste.com' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(500)

      const body =
        typeof response.body === 'string'
          ? response.body
          : new TextDecoder('utf-8').decode(response.body)

      expect(body).to.include('Internal Server Error')
    })
  })
})
