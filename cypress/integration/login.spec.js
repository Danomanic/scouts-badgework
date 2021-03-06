context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should login as a Beaver', () => {
    cy.get('#beavers').click();
    cy.get('#inputSection').should('have.value', '1');
    cy.get('#inputName').type('Beaver').should('have.value', 'Beaver');
    cy.get('#loginSubmit').click();
    cy.get('body').should('contain', 'Here is a list of Beaver Badges you can work towards online...');
  });

  it('Should login as a Cub', () => {
    cy.get('#cubs').click();
    cy.get('#inputSection').should('have.value', '2');
    cy.get('#inputName').type('Cub').should('have.value', 'Cub');
    cy.get('#loginSubmit').click();
    cy.get('body').should('contain', 'Here is a list of Cub Badges you can work towards online...');
  });

  it('Should login as a Scout', () => {
    cy.get('#scouts').click();
    cy.get('#inputSection').should('have.value', '3');
    cy.get('#inputName').type('Scout').should('have.value', 'Scout');
    cy.get('#loginSubmit').click();
    cy.get('body').should('contain', 'Here is a list of Scout Badges you can work towards online...');
  });

  it('Should not allow names that are not letters or numbers', () => {
    cy.get('#scouts').click();
    cy.get('#inputName').type('Scout&&&&&').should('have.value', 'Scout&&&&&');
    cy.get('#loginSubmit').click();
    cy.get('#alerts').should('contain', 'Name can only contain letters and numbers.');
  });

  it('Should not allow names with spaces', () => {
    cy.get('#scouts').click();
    cy.get('#inputName').type('Scout One').should('have.value', 'ScoutOne');
    cy.get('#loginSubmit').click();
  });

  it('Should limit characters of name to 70', () => {
    cy.get('#scouts').click();
    cy.get('#inputName').type('x'.repeat(76)).should('have.value', 'x'.repeat(70));
  });
});
