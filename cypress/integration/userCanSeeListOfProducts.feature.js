
describe ('A user that visits the application', () => {

    before(() => {
        cy.intercept(
            "GET", 
            "**/api/products",
            {fixtures: "products.json"}
            ).as("getProducts")
        cy.visit("/");
    });

    it('is expected to make a network call with a status 200', () => {
        cy.wait("@getProducts").its('response.statusCode').should('eq', 200);
    })

    it('is expected to see a collection of product', () => {
        cy.get('[data-cy=product-list]').children().should('have.length', 2)
    })

    it('is expected to see products with a name ', () => {
        cy.get('[data-cy=product-list]').first().should("contain", "pizza")
    })

    // it('is expected can see products with a price ', () => {
    //     cy.get('[data-cy=product-list]').price. should eq 100
    // })
    // it('is expected can see products with name, category and a price ', () => {
    //     cy.get('[data-cy=product-list]').should("contain", "maincourse")
    // })

    //  it('is expected to have a button to add product to the order ', () => {
    //      cy.get('[data-cy=button_select]').should("exist")

    //  })

})