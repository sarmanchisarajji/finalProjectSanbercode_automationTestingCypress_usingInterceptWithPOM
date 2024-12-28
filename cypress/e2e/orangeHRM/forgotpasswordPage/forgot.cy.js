/// <reference types="cypress"/>

import forgotpasswordPage from "../../../pom/orangeHRM/forgotPassword";
import loginPage from "../../../pom/orangeHRM/login";

describe("Forgot Password Page", () => {
    beforeEach(() => {
        // Mengakses halaman login sebelum setiap test case
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text', 'Login')
    });

    it("TC_001: User navigates to Forgot Password page", () => {

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesForgotPassword")
        forgotpasswordPage.linkToForgoPassword().click()

        cy.wait("@messagesForgotPassword").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        cy.url().should('include', '/requestPasswordResetCode')
        forgotpasswordPage.menuForgotPassword().should('have.text', 'Reset Password')
    })

    it('TC_002: Reset password link sent successfully', () => {
        forgotpasswordPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')
        forgotpasswordPage.menuForgotPassword().should('have.text', 'Reset Password')
        forgotpasswordPage.inputUsernameForgotPassword().type('admin')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesForgotSuccess")
        forgotpasswordPage.buttonResetPassword().click()

        cy.wait("@messagesForgotSuccess").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })
        forgotpasswordPage.successResetPassword().should('have.text','Reset Password link sent successfully')
    })

    it('TC_003: Reset password with empty username', () => {
        forgotpasswordPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')
        forgotpasswordPage.menuForgotPassword().should('have.text', 'Reset Password')
        forgotpasswordPage.buttonResetPassword().click()
        forgotpasswordPage.inputRequiredForgotPassword().should('have.text','Required').and('be.visible')
    })

    it('TC_004: Cancel reset password', () => {
        forgotpasswordPage.linkToForgoPassword().click()
        cy.url().should('include', '/requestPasswordResetCode')

        const startTime = new Date().getTime()

        cy.intercept("GET", "**/core/i18n/messages").as("messagesCancelReset")
        forgotpasswordPage.buttonCancelResetPassword().click()

        cy.wait("@messagesCancelReset").then((intercept) => {
            
            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(intercept.response.statusCode).to.equal(304)

            expect(duration).to.be.lessThan(5000)
        })

        cy.url().should('include', '/login')
        loginPage.textLogin().should('have.text', 'Login')
    })
})