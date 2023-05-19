/// <reference types="Cypress" />

describe("task page", () => {
  it("should render the main image", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get(".main-header img"); // css selector
    cy.get(".main-header").find("img");
  });

  it("should display the page title", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").contains("My Cypress Course Tasks");
    // cy.contains("My Cypress Course Tasks")
  });
});
