// Teste de Drag and Drop usando comando customizado (dnd) 
// que dispara eventos HTML5 com DataTransfer.
describe('Drag and Drop - The Internet', () => {
  const url = 'https://the-internet.herokuapp.com/drag_and_drop';

  beforeEach(() => {
    cy.visit(url);
  });

  it('A → B', () => {
    cy.get('#column-a').should('contain', 'A');
    cy.get('#column-b').should('contain', 'B');
    cy.get('#column-a').dnd('#column-b');
    cy.get('#column-a').should('contain', 'B');
    cy.get('#column-b').should('contain', 'A');
  });

  it('B → A', () => {
    cy.get('#column-b').dnd('#column-a');
    cy.get('#column-a').should('contain', 'B');
    cy.get('#column-b').should('contain', 'A');
  });

  it('drag em si mesmo não altera', () => {
    cy.get('#column-a').dnd('#column-a');
    cy.get('#column-a').should('contain', 'A');
    cy.get('#column-b').should('contain', 'B');
  });

  it('múltiplas trocas', () => {
    cy.get('#column-a').dnd('#column-b');
    cy.get('#column-b').dnd('#column-a');
    cy.get('#column-a').should('contain', 'A');
    cy.get('#column-b').should('contain', 'B');
  });
});
