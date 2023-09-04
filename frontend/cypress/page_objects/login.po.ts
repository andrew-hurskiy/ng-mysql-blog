class LoginPage {

    emailInput = () => cy.get('input[data-test="email"]')
    passwordInput = () => cy.get('input[data-test="password"]')
    loginButton = () => cy.get('button[data-test="loginButton"]')

    enterEmailAndPassword(email: string, password: string) {
        this.emailInput().type(email);
        this.passwordInput().type(password)
    }

    loginWith(email: string, password:string) {
        cy.visit('localhost:4200');
        this.enterEmailAndPassword(email, password);
        this.loginButton().click()
        cy.url().should('contain', 'home')
    }

}

export default new LoginPage();