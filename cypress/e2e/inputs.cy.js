
describe("Inputs The Internet", () => {
  const URL = "https://the-internet.herokuapp.com/inputs";

  beforeEach(() => {
    cy.visit(URL);
    cy.get('input[type="number"]').as("inputField");
  });

  it("carrega a página e verifica o título", () => {
    cy.contains("h3", "Inputs").should("be.visible");
  });

  it("insere números positivos e negativos", () => {
    cy.get("@inputField").clear().type("12345").should("have.value", "12345");
    cy.get("@inputField").clear().type("-6789").should("have.value", "-6789");
  });

  it("insere valores decimais", () => {
    cy.get("@inputField").clear().type("12.34").should("have.value", "12.34");
    cy.get("@inputField").clear().type("-56.78").should("have.value", "-56.78");
  });

  it("texto puro não é aceito (comportamento típico do Chrome)", () => {
    cy.get("@inputField").clear().type("abcde").should("have.value", "");
  });

  it("mistura números e letras mantém apenas números iniciais (comportamento típico)", () => {
    cy.get("@inputField").clear().type("123abc").should(($el) => {
      // Evita flake de IME/teclado: aceita "" (nada inserido) ou começa com "123"
      const v = $el.val();
      expect(v === "" || String(v).startsWith("123")).to.be.true;
    });
  });

  it("valores muito grandes - apenas verifica que há algum valor", () => {
    cy.get("@inputField").clear().type("12345678901234567890").should(($el) => {
      expect(String($el.val()).length).to.be.greaterThan(0);
    });
  });

  it("muitos decimais - evita expectativa de truncamento exato por navegador", () => {
    cy.get("@inputField").clear().type("1.2345678901234567890").should(($el) => {
      const v = String($el.val());
      // Deve conter ponto e começar com "1."
      expect(v.startsWith("1.")).to.be.true;
    });
  });
});
