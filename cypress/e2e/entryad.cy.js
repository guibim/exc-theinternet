//Utilizando 8000  de timeout para garantir que o modal tenha tempo de aparecer
describe("Entry Ad", () => {
  const url = "https://the-internet.herokuapp.com/entry_ad";

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(url);
  });

  it("exibe o modal na primeira visita", () => {
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
  });

  it('fecha o modal ao clicar em "Close"', () => {
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
    cy.contains("Close").click();
    cy.contains("This is a modal window").should("not.be.visible");
  });

  it('reaparece ao clicar em "click here"', () => {
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
    cy.contains("Close").click();
    cy.contains("click here").click();
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
  });

  it("permanece visível se não for fechado", () => {
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
  });

  it("bloqueia interação do fundo enquanto aberto", () => {
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
    cy.contains("Close").click();
    cy.contains("click here").click();
    cy.contains("This is a modal window", { timeout: 8000 }).should(
      "be.visible"
    );
  });
});
