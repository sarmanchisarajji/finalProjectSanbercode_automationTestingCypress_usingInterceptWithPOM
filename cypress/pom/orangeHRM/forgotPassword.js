export default class forgotpasswordPage {
    
    static linkToForgoPassword(){
        return cy.get('p').contains('Forgot your password?')
    }

    static menuForgotPassword(){
        return cy.get('h6').contains('Reset Password')
    }

    static inputUsernameForgotPassword(){
        return cy.get('[name="username"]')
    }

    static buttonResetPassword(){
        return cy.get('[type="submit"]')
    }

    static successResetPassword(){
        return cy.get('h6').contains('Reset Password link sent successfully')
    }

    static inputRequiredForgotPassword(){
        return cy.get('span').contains('Required')
    }

    static buttonCancelResetPassword(){
        return cy.get('[type="button"]')
    }
}