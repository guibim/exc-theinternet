describe('Digest Auth via cy.task', () => {
  it('autentica e valida o HTML', () => {
    cy.task('digestGet', {  // Task custom definida em cypress.config.js pra rodar Node e retorna o status+body  da requisição
      url: 'https://the-internet.herokuapp.com/digest_auth',
      username: 'admin',
      password: 'admin'
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.include('Congratulations');
    });
  });
});
