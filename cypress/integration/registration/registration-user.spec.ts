
/// <reference types = "Cypress" />

import { Registration } from '../../page-objects/registration/registration.po'

context("Register", () => {

    beforeEach(() => {
        cy.fixture("users/register/uncorrectEmail.json").as("uncorrectEmail")
        cy.fixture("users/register/incompatiblePassword.json").as("incompatiblePassword")
    })
    
    beforeEach(() => {
        cy.visit("https://sok.grid.cyfronet.pl/register");
    });
    

    it("should not register unfilled form", function () {
        Registration.unfillRegisterForm();
    });

    it("should not will allow register, field email not fill in correctly", function () {
        Registration.registrationUncorrectEmail(this.uncorrectEmail);
    });

    
    it("should not will allow register, incompatibility password", function () {
        Registration.passwordCompatible(this.incompatiblePassword)
    });
})