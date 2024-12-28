export default class loginPage {
    static textLogin(){
        return cy.get('h5').contains('Login')
    }

    static inputUsername(){
        return cy.get('[name="username"]')
    }

    static inputPassword(){
        return cy.get('[name="password"]')
    }

    static buttonLogin(){
        return cy.get('[type="submit"]')
    }

    static menuDashboard(){
        return cy.get('h6').contains('Dashboard')
    }

    static verifyMyAction(){
        // return cy.get('p').contains('(1) Pending Self Review')
        return cy.get('p').contains('(1) Candidate to Interview')
    }

    static invalidCredentials(){
        return cy.get('p').contains('Invalid credentials')
    }

    static invalidAccountDisable(){
        return cy.get('p').contains('Account disabled')
    }

    static inputRequired(){
        return cy.get('span').contains('Required')
    }
}