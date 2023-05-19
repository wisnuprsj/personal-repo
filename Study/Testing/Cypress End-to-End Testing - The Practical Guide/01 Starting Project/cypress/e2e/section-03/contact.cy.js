/// <reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="contact-input-message"]').type(
      "Hi, just wanted to give feedback, can you call me? thanks!"
    );
    cy.get('[data-cy="contact-input-name"]').type("Wisnu");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      //   expect(el.attr("disabled")).equal(undefined);
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.equal("Send Message");
    });

    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type("test@gmail.com{enter}");

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains("Send Message")
    //   .should("not.have.attr", "disabled");

    // const btn = cy.get('[data-cy="contact-btn-submit"]'); // not recommended, not return the button but reference
    // btn.click();
    // btn.contains("Sending...");
    // btn.should("have.attr", "disabled");

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn"); // recommended
    // cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://127.0.0.1:5173/about");

    // cy.get('[data-cy="contact-input-message"]').as("messageInput");
    // cy.get('[data-cy="contact-input-name"]').as("nameInput");
    // cy.get('[data-cy="contact-input-email"]').as("emailInput");
    // cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");

    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });

    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    // .then((el) => {
    //   expect(el.attr("class")).to.contains("invalid");
    // });
    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
