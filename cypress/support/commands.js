
// Comando adicionado para simular Drag and Drop com DataTransfer (draganddrop.cy.js)
Cypress.Commands.add('dnd', { prevSubject: 'element' }, (subject, targetSelector) => { 
  const dataTransfer = new DataTransfer();
  cy.wrap(subject).trigger('dragstart', { dataTransfer });
  cy.get(targetSelector)
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer });
  cy.wrap(subject).trigger('dragend');
});
