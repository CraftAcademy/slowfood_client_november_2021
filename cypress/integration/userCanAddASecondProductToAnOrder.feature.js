describe('A user clicking on "Add to Order" button for a second product', () => {
  before(() => {
    cy.intercept("GET", "**/api/products", {
      fixture: "productsIndexResponse.json",
    });
    cy.intercept("POST", "**/api/orders", {
      fixture: "orderCreateResponse.json",
    });
    cy.intercept("PUT", "**/api/orders/**", {
      fixture: "orderUpdateResponse.json",
    }).as("Orders.update");
    cy.visit('/');

    cy.get("[data-cy=product-list]").children('[data-cy=product-item]').first().within(() => {
      cy.get("[data-cy=add-to-order-button]").click();
    });
    cy.get("[data-cy=product-list]").children('[data-cy=product-item]').last().within(() => {
      cy.get("[data-cy=add-to-order-button]").click();
    });
  });

  it('is expected to make a PUT request to the API', () => {
    cy.wait('@Orders.update').its('request.method').should('eq', 'PUT');
  });

  it('is expected to render message', () => {
    cy.get('[data-cy=message-box]').should('contain.text', 'Risotto was added to your order!')
  });
});
