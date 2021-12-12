/* eslint-disable no-undef */

describe("A user that visits the application", () => {
  before(() => {
    cy.intercept("GET", "**/api/products", {
      fixture: "productsIndexResponse.json",
    }).as("Products.index");
    cy.visit("/");
  });

  it("is expected to make a network call with a status 200", () => {
    cy.wait("@Products.index").its("response.statusCode").should("eq", 200);
  });

  it("is expected to see a collection of product", () => {
    cy.get("[data-cy=product-list]").children('[data-cy=product-item]').should("have.length", 3);
  });

  it("is expected to see products with a name ", () => {
    cy.get("[data-cy=product-list]").first().should("contain", "Pizza");
  });

  it("is expected can see products with a price ", () => {
    cy.get("[data-cy=product-list]").first().should("contain", 200);
  });

  it("is expected to have a button to add product to the order ", () => {
    cy.get("[data-cy=add-to-order-button]").first().should("contain", "Add to Order");
  });
});
