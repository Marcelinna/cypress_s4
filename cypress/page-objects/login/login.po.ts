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
  };

  static fillForm(user: User) {
    Login.pageObject.getLoginInput().type(user.email);
    Login.pageObject.getPasswordInput().type(user.password);

    return Login;
    }
    
    static sendForm() {
        Login.pageObject.getSubmitBtn().click();

        cy.location("pathname").should('eq', '/map/products');
        return Login
    }

    static loginAs(user: User) {
        cy.clearLocalStorage('s4e')
        Login.fillForm(user).sendForm();

    }


}
