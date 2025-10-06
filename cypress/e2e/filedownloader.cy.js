describe("Validação dos links do File Downloader", () => {
  it("Deve verificar se todos os links de download estão válidos", () => {
    cy.visit("https://the-internet.herokuapp.com/download");
    cy.get(".example a").each(($el) => {
      // para cada link encontrado
      const url = $el.prop("href");
      cy.request({
        url,
        method: "HEAD",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 206]); //sucess e partial content
      });
    });
  });
  it("Deve confirmar que não há nenhum link com erro (status >= 400)", () => {
    cy.visit("https://the-internet.herokuapp.com/download");
    const statusCodes = [];

    cy.get(".example a")
      .each(($el) => {
        const url = $el.prop("href");
        cy.request({
          url,
          method: "HEAD",
          failOnStatusCode: false,
        }).then((response) => {
          statusCodes.push(response.status);
        });
      })
      .then(() => {
        const erros = statusCodes.filter((code) => code >= 400);
        expect(erros, `Links com erro: ${erros.join(", ")}`).to.have.length(0);
      });
  });
});
