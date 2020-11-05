export interface User {
  email: string;
  name: string;
  surname: string;
  password: string;
  repeatPassword: string;
}

export class Registration {
  static readonly pageObject = {
    getEmailInput: () => cy.get("#registration-login"),
    getNameInput: () => cy.get("#registration-name"),
    getSurnameInput: () => cy.get("#registration-surname"),
    getPasswordInput: () => cy.get("#registration-password"),
    getRepeatPasswordInput: () => cy.get("#registration-password-repeat"),
    getReCaptachaCheckbox: () => cy.get(".recaptcha-checkbox-border"),
    getSubmitBtn: () => cy.get('button[type="submit"]'),

    getErrorEmailAlert: () =>
      cy
        .get(":nth-child(1) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole jest wymagane"),
    getErrorNameAlert: () =>
      cy
        .get(":nth-child(2) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole jest wymagane"),
    getErrorSurnameAlert: () =>
      cy
        .get(":nth-child(3) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole jest wymagane"),
    getErrorPasswordAlert: () =>
      cy
        .get(":nth-child(4) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole jest wymagane"),
    getErrorRepetaPasswordAlert: () =>
      cy
        .get(":nth-child(5) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole jest wymagane"),

    getErrorUncorrectEmail: () =>
      cy
        .get(":nth-child(1) > .invalid-feedback > .ng-star-inserted")
        .contains("To pole musi być emailem"),

    getErrorPasswordCompatible: () =>
      cy
        .get(":nth-child(5) > .invalid-feedback > .ng-star-inserted")
        .contains("Hasła muszą być takie same"),
  };

  static fillForm(user: User) {
    Registration.pageObject.getEmailInput().type(user.email);
    Registration.pageObject.getNameInput().type(user.name);
    Registration.pageObject.getSurnameInput().type(user.surname);
    Registration.pageObject.getPasswordInput().type(user.password);
    Registration.pageObject.getRepeatPasswordInput().type(user.repeatPassword);

    return Registration;
  }

  static sendForm() {
    Registration.pageObject.getSubmitBtn().click();

    return Registration;
  }

  static unfillRegisterForm() {
    //Registration.pageObject.getReCaptachaCheckbox().check();
    Registration.sendForm();

    Registration.pageObject.getErrorEmailAlert().should("be.visible");
    Registration.pageObject.getErrorNameAlert().should("be.visible");
    Registration.pageObject.getErrorSurnameAlert().should("be.visible");
    Registration.pageObject.getErrorPasswordAlert().should("be.visible");
    Registration.pageObject.getRepeatPasswordInput().should("be.visible");

    return Registration;
  }

  static registrationUncorrectEmail(user: User) {
    Registration.fillForm(user);
    Registration.sendForm();
    Registration.pageObject.getErrorUncorrectEmail().should("be.visible");
  }

  static passwordCompatible(user: User) {
    Registration.fillForm(user);
    Registration.sendForm();
    Registration.pageObject.getErrorPasswordCompatible().should("be.visible");
  }
}
