export interface User {
  email: string;
  password: string;
}

export class Login {
  static readonly pageObject = {
    getLoginInput: () => cy.get('input[data-test="login-email-input"]'),
    getPasswordInput: () => cy.get('input[data-test="login-password-input"]'),
    getSubmitBtn: () => cy.get('button[data-test="login-submit-btn"]'),
    getGoToMapBtn: () => cy.get('a[data-test="go-to-map-btn"]'),

    getErrorLoginAlert: () => cy.get(".alert.alert-danger.special__error").contains("Niepoprawny login / hasło"),
    getErrorEmailAlert: () => cy.get(':nth-child(1) > .invalid-feedback').contains("To pole jest wymagane"),
    getErrorPasswordAlert: () => cy.get(':nth-child(2) > .invalid-feedback').contains("To pole jest wymagane"),
    getErrorUncorrectEmail: () => cy.get(':nth-child(1) > .invalid-feedback').contains("To pole musi być emailem")
  };

  static fillForm(user: User) {
    Login.pageObject.getLoginInput().type(user.email);
    Login.pageObject.getPasswordInput().type(user.password);

    return Login;
  }

  static unfillForm() {
    Login.pageObject.getLoginInput().trigger('mouseover').click();
    Login.pageObject.getPasswordInput().trigger("mouseover").click();
    Login.pageObject.getSubmitBtn().click({ force: true })
  
   Login.pageObject.getErrorEmailAlert().should("be.visible");
   Login.pageObject.getErrorPasswordAlert().should("be.visible")

    return Login;

  }

  static sendForm() {
    Login.pageObject.getSubmitBtn().click();

    return Login;
  }

  static loginAs(user: User) {
    cy.clearLocalStorage("s4e");
    Login.fillForm(user).sendForm();
    cy.location("pathname").should("eq", "/map/products");
  }

  static loginAsUnregisterUser(user: User) {
    cy.clearLocalStorage("s4e");
    Login.fillForm(user).sendForm();
    cy.location("pathname").should("eq", "/login");
    Login.pageObject.getErrorLoginAlert().should("be.visible");
    Login.pageObject.getSubmitBtn().should("not.be.disabled");

    return Login;
  }

  static loginUncorrectEmail(user:User) {
    cy.clearLocalStorage("s4e");
    Login.fillForm(user)
    cy.location("pathname").should("eq", "/login");
    Login.pageObject.getErrorUncorrectEmail().should("be.visible");
    Login.pageObject.getSubmitBtn().should("be.disabled");

    return Login;
    
  }
}
