/// <reference types = "Cypress" />

import { Login } from "../../page-objects/login/login.po";

context("Auth login", () => {
  beforeEach(() => {
    cy.fixture("users/login/zkMember.json").as("zkMember");
    cy.fixture("users/login/zkAdmin.json").as("zkAdmin");
    cy.fixture("users/login/admin.json").as("superAdmin");
    cy.fixture("users/login/unregisterUser.json").as("unregisterUser")
    cy.fixture("users/login/uncorrectEmail.json").as("uncorrectEmail")
  });

  beforeEach(() => {
    cy.visit("https://sok.grid.cyfronet.pl/login");
  });

  // it("should login as zkMember", function () {
  //     Login.loginAs(this.zkMember);
      
  // });

  // it("should login as zkAdmin", function () {
  //   Login.loginAs(this.zkAdmin);
  // });

  // it("should login as admin", function () {
  //   Login.loginAs(this.superAdmin);
  // });

  // it("should not login as unregisterUser", function () {
  //   Login.loginAsUnregisterUser(this.unregisterUser)
  // })

  // it("should not will allow login in, field email not fill in correctly", function () {
  //   Login.loginUncorrectEmail(this.uncorrectEmail);
  //})

  it("should not login in f no fields are filled in", function () {
    Login.unfillForm();
  })
});
