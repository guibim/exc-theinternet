describe('Broken Images - Elementos Fixos', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/broken_images');
  });

  it('verifica imagens', () => {
    cy.get('[src="asdf.jpg"]').should(($img) => {
      expect($img[0].naturalWidth).to.eq(0);
    });

    cy.get('[src="hjkl.jpg"]').should(($img) => {
      expect($img[0].naturalWidth).to.eq(0);
    });

    cy.get('[src="img/avatar-blank.jpg"]').should(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it('identifica imagens quebradas pelo naturalWidth', () => {
    cy.get('img').each(($img) => {
      if ($img[0].naturalWidth === 0) {
        cy.log(`Imagem quebrada encontrada: ${$img.attr('src')} (naturalWidth = 0)`);
      }
    });
  });
});
