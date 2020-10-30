/// <reference types = "Cypress" />

import { Login } from "../../page-objects/login/login.po";

context("Auth login", () => {
  beforeEach(() => {
    cy.fixture("users/zkMember.json").as("zkMember");
    cy.fixture("users/zkAdmin.json").as("zkAdmin");
    cy.fixture("users/admin.json").as("superAdmin");
  });

  beforeEach(() => {
    cy.visit("https://sok.grid.cyfronet.pl/login");
  });

  it("should login as zkMember", function () {
      Login.loginAs(this.zkMember);
      
  });

  it("should login as zkAdmin", function () {
    Login.loginAs(this.zkAdmin);
  });

  it("should login as admin", function () {
    Login.loginAs(this.superAdmin);
  });
});
