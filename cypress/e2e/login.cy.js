const URL = 'https://the-internet.herokuapp.com/login'

// função auxiliar para login
const enviarLogin = (usuario, senha) => {
  cy.get('#username').clear().type(usuario)
  cy.get('#password').clear().type(senha)
  cy.get('button[type="submit"]').click()
}

describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit(URL)
  })

  it('Teste smoke: deve exibir campos e botão de login', () => {
    cy.get('h2').should('contain', 'Login Page')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login')
  })

it('Deve logar com informações corretas', () => {
    enviarLogin('tomsmith', 'SuperSecretPassword!')
    cy.get('#flash')
        .should('be.visible')
        .and('include.text', 'You logged into a secure area!')
    cy.url().should('include', '/secure')
})

  it('Login incorreto (usuário errado, senha correta)', () => {
    enviarLogin('usuarioErrado', 'SuperSecretPassword!')
    cy.get('#flash')
      .should('be.visible')
      .and('include.text', 'Your username is invalid!')
    cy.url().should('include', '/login')
  })

  it('Senha incorreta (usuário correto, senha errada)', () => {
    enviarLogin('tomsmith', 'SenhaErrada!')
    cy.get('#flash')
      .should('be.visible')
      .and('include.text', 'Your password is invalid!')
    cy.url().should('include', '/login')
  })

  it('Login e senha incorretos', () => {
    enviarLogin('usuarioErrado', 'SenhaErrada!')
    cy.get('#flash')
      .should('be.visible')
      .and('include.text', 'Your username is invalid!')
    cy.url().should('include', '/login')
  })
})
