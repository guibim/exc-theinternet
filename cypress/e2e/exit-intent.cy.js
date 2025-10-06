// Utilizei o plugin cypress-real-events para resolver o movimento do mouse
describe("Exit Intent - com cypress-real-events", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/exit_intent");
  });

  it("exibe o modal ao simular saída do mouse da página", () => {
    cy.get("body").realMouseMove(300, 300);
    cy.wait(500);
    cy.get("body").realMouseMove(300, -10);
    cy.contains("This is a modal window", { timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("fecha o modal e não reexibe após reload", () => {
    cy.get("body").realMouseMove(300, 300);
    cy.wait(300);
    cy.get("body").realMouseMove(300, -10);
    cy.contains("This is a modal window", { timeout: 5000 }).should(
      "be.visible"
    );
    cy.contains("Close").click({ force: true });
    cy.contains("This is a modal window").should("not.be.visible");
    cy.reload();
    cy.contains("This is a modal window").should("not.be.visible");
  });
});
