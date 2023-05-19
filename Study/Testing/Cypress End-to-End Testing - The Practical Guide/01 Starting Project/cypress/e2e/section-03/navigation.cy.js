/// <reference types="Cypress" />

describe("page navigation", () => {
  it("should navigate to about page", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.location("pathname").should("equal", "/about"); // /about /home etc
    cy.go("back");
    cy.location("pathname").should("eq", "/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/");
  });
});
