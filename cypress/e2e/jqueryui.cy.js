import "cypress-real-events";

describe("Menu JQueryUI - The Internet", () => {
  const baseUrl = "https://the-internet.herokuapp.com/jqueryui/menu";
  const abrirDownloads = () => {
    cy.contains('a[href="#"]', "Enabled").realHover();
    cy.contains("li a", "Downloads").should("be.visible").realHover();
    cy.contains("li a", "PDF").should("be.visible");
    cy.contains("li a", "CSV").should("be.visible");
    cy.contains("li a", "Excel").should("be.visible");
  };

  const retornarStatus200 = (texto) => {
    cy.contains("li a", texto)
      .should("be.visible")
      .then(($el) =>
        cy.request($el.attr("href")).its("status").should("eq", 200)
      );
  };

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("deve exibir o menu e todos os itens principais", () => {
    cy.get("#menu").should("be.visible");
    cy.get('a[href="#"]').contains("Enabled").should("be.visible");
    cy.get('a[href="#"]').contains("Disabled").should("be.visible");
  });

  it("deve mostrar o submenu ao passar o mouse sobre Enabled", () => {
    cy.contains('a[href="#"]', "Enabled").trigger("mouseover");
    cy.contains("li a", "Downloads").should("be.visible");
    cy.contains("li a", "Back to JQuery UI").should("be.visible");
  });

  it("deve mostrar as opções de download ao passar o mouse sobre Downloads", () => {
    cy.contains('a[href="#"]', "Enabled").realHover();
    cy.contains("li a", "Downloads").should("be.visible").realHover();

    cy.contains("li a", "PDF").should("be.visible");
    cy.contains("li a", "CSV").should("be.visible");
    cy.contains("li a", "Excel").should("be.visible");
  });

  it("deve retornar status 200 para o link de download de PDF", () => {
    abrirDownloads();
    retornarStatus200("PDF");
  });

  it("deve retornar status 200 para o link de download de CSV", () => {
    abrirDownloads();
    retornarStatus200("CSV");
  });

  it("deve retornar status 200 para o link de download de Excel", () => {
    abrirDownloads();
    retornarStatus200("Excel");
  });

  it("deve navegar para a página do JQuery UI ao clicar em Back to JQuery UI", () => {
    cy.contains('a[href="#"]', "Enabled").trigger("mouseover");
    cy.get("#ui-id-8").should("be.visible").click();
    cy.url().should("include", "jqueryui");
  });

 it('não deve abrir submenu nem ser clicável para o item Disabled', () => {
  cy.contains('a[href="#"]', 'Disabled')
    .should('be.visible')
    .parent('li')
    .should('have.class', 'ui-state-disabled')
    .and('not.have.class', 'ui-state-active');
  });
});
