describe('A user clicking on "View Order"', () => {
  before(() => {
    cy.intercept("GET", "**/api/products", {
      fixture: "productsIndexResponse.json",
    });
    cy.intercept("POST", "**/api/orders", {
      fixture: "orderCreateResponse.json",
    });
    cy.intercept("PUT", "**/api/orders/**", {
      fixture: "orderUpdateResponse.json",
    });
    cy.visit("/");

    cy.get("[data-cy=product-list]")
      .children('[data-cy=product-item]')
      .first()
      .within(() => {
        cy.get("[data-cy=add-to-order-button]").click();
      });
    cy.get("[data-cy=product-list]")
      .children('[data-cy=product-item]')
      .last()
      .within(() => {
        cy.get("[data-cy=add-to-order-button]").click();
      });

    cy.get("[data-cy=view-order]").click();
  });

  it("is expected to display order details and hide product list", () => {
    cy.get("[data-cy=product-list]").should("not.exist");
    cy.get("[data-cy=order-details]").should("be.visible");
  });

  it("is expected to display product details", () => {
    cy.get("[data-cy=order-products]").children().should("have.length", 2);
  });
});
