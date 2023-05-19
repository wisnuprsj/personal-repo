/// <reference types="Cypress" />

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.contains("Add Task").click();
    // by using click backdrop
    cy.get("button").contains("Add Task").click();
    cy.get(".backdrop").click({ force: true }); // configuration
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    // by using click cancel button
    cy.get("button").contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.contains("Add Task").click();

    // create task
    cy.get("#title").type("Finished Cypress Course");
    cy.get("#summary").type(
      "Finished Cypress Course by Max with the due date 05 March 2023"
    );
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("Finished Cypress Course");
  });

  it("should validate user input", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.contains("Add Task").click();

    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.contains("Add Task").click();

    // create task
    cy.get("#title").type("Finished Cypress Course");
    cy.get("#summary").type(
      "Finished Cypress Course by Max with the due date 05 March 2023"
    );
    cy.get("#category").select("urgent");

    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("Finished Cypress Course");
    cy.get(".task span").contains("🚨");

    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);

    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);

    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.contains("Add Task").click();

    // create task
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("First Task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.contains("Add Task").click();

    // create task
    cy.get("#title").type("Task 2");
    cy.get("#summary").type("Second Task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);

    cy.get(".task").eq(0).contains("First Task");
    cy.get(".task").eq(1).contains("Second Task");
  });
});
