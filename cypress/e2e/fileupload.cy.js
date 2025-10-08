describe("Upload de arquivo - UI", () => {
  it("Upload de 1 arquivo", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    const caminhoArquivo = "E:/Downloads - E/Teste/LambdaTest.txt";
    cy.get("#file-upload").should("have.length", 1).selectFile(caminhoArquivo);

    cy.get("#file-submit").click();

    cy.get("h3").should("contain", "File Uploaded!");
    cy.get("#uploaded-files").should("contain", "LambdaTest.txt");
  });
});

describe("Upload de múltiplos arquivos - UI", () => {
  it("Upload de 2 arquivos", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    const arquivos = [
      "E:/Downloads - E/Teste/LambdaTest.txt",
      "E:/Downloads - E/Teste/text2.txt",
    ];

    cy.get("#file-upload").selectFile(arquivos);
    cy.get("#file-submit").click();

    cy.get("h3").should("contain", "File Uploaded!");
    cy.get("#uploaded-files")
      .invoke("text")
      .then((texto) => {
        expect(texto).to.match(/LambdaTest\.txt|text2\.txt/);
      });
  });
});

describe("Upload via API ", () => {
  const url = "https://the-internet.herokuapp.com/upload";

  // Helper para decodificar ArrayBuffer -> string
  const decodeBody = (body) => {
    if (typeof body === "string") return body;
    try {
      return new TextDecoder("utf-8").decode(body); // body é ArrayBuffer
    } catch {
      return Buffer.from(body).toString("utf8");
    }
  };

  it(" Envia LambdaTest.txt e valida retorno", () => {
    const caminho = "E:/Downloads - E/Teste/LambdaTest.txt";

    cy.readFile(caminho, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const fd = new FormData();
        fd.append("file", blob, "LambdaTest.txt");

        return cy.request({
          method: "POST",
          url,
          body: fd,
          headers: { "Content-Type": "multipart/form-data" },
          encoding: "binary",
          failOnStatusCode: false,
        });
      })
      .then((resp) => {
        const html = decodeBody(resp.body);
        expect(resp.status).to.eq(200);
        expect(html).to.include("File Uploaded");
      });
  });
});
