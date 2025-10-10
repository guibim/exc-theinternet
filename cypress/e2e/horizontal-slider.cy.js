describe("Horizontal Slider", () => {
  //Testando seletores como const
  const url = "https://the-internet.herokuapp.com/horizontal_slider";
  const slider = 'input[type="range"]';
  const valueLabel = "#range";

  it("Verifica se a página e os elementos principais carregaram", () => {
    cy.visit(url);
    cy.get("h3").should("contain.text", "Horizontal Slider");
    cy.get(slider).should("be.visible");
    cy.get(valueLabel).should("be.visible");
  });

  it("Move o slider e verifica se o valor exibido é atualizado", () => {
    cy.visit(url);

    cy.get(slider).then(($slider) => {
      cy.wrap($slider).invoke("val", 3).trigger("input").trigger("change");
      cy.get(valueLabel).should("have.text", "3");
    });
  });
});
