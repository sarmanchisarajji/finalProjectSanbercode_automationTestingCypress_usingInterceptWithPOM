/// <reference types="cypress" />
import directoryPage from "../../../pom/orangeHRM/adminDirectory";
import loginPage from "../../../pom/orangeHRM/login";

describe("Admin Directory Page", () => { 
    beforeEach(() => {
        // Mengakses halaman login sebelum setiap test case
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text', 'Login')
        loginPage.inputUsername().type('admin')
        loginPage.inputPassword().type('admin123')
    });

    it("TC_001: Search by using the employee name filter", () => {
        const startTime = new Date().getTime()

        cy.intercept("GET", "**/employees/action-summary").as("actionSummary")
        loginPage.buttonLogin().click()

        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            loginPage.verifyMyAction().should('have.text', '(1) Candidate to Interview')
        })
        loginPage.menuDashboard().should('have.text', 'Dashboard');

        cy.intercept("GET", "**/employees?limit=14&offset=0").as("employess")
        directoryPage.navigatetoDirectoryMenu().click()

        cy.wait("@employess").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            directoryPage.verifyDataDirectory().should('contain.text', 'Peter')
        })

        directoryPage.menuDirectory().should('have.text', 'Directory')

        directoryPage.inputEmployeeName().type('Peter')
        directoryPage.listEmployeeName().should('contain.text', 'Peter').click()
        directoryPage.buttonSearch().click()
        directoryPage.resultSerchByEmployeeName().should('have.text', '(1) Record Found')
        directoryPage.buttonReset().click()
        directoryPage.resultSerchByEmployeeName().should('contain.text', 'Records Found')
    });


    it("TC_002: Search by using the employee name and job title filter", () => {
        const startTime = new Date().getTime()

        cy.intercept("GET", "**/employees/action-summary").as("actionSummary")
        loginPage.buttonLogin().click()

        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            loginPage.verifyMyAction().should('have.text', '(1) Candidate to Interview')
        })
        loginPage.menuDashboard().should('have.text', 'Dashboard');

        cy.intercept("GET", "**/employees?limit=14&offset=0").as("employess")
        directoryPage.navigatetoDirectoryMenu().click()

        cy.wait("@employess").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            directoryPage.verifyDataDirectory().should('contain.text', 'Peter')
        })

        directoryPage.menuDirectory().should('have.text', 'Directory')

        directoryPage.inputEmployeeName().type('Peter')
        directoryPage.listEmployeeName().should('contain.text', 'Peter').click()
        directoryPage.dropdownJobTitle().click()
        directoryPage.listJobTitleLocation().should('be.visible')
        cy.contains('Chief Financial').should('be.visible').click()
        directoryPage.buttonSearch().click()
        directoryPage.resultSerchByEmployeeName().should('have.text', '(1) Record Found')
        directoryPage.buttonReset().click()
        directoryPage.resultSerchByEmployeeName().should('contain.text', 'Records Found')
    });
    

    it("TC_003: Search by using the employee name, job title, and location filter", () => {
        const startTime = new Date().getTime()

        cy.intercept("GET", "**/employees/action-summary").as("actionSummary")
        loginPage.buttonLogin().click()

        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            loginPage.verifyMyAction().should('have.text', '(1) Candidate to Interview')
        })
        loginPage.menuDashboard().should('have.text', 'Dashboard');

        cy.intercept("GET", "**/employees?limit=14&offset=0").as("employess")
        directoryPage.navigatetoDirectoryMenu().click()

        cy.wait("@employess").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            directoryPage.verifyDataDirectory().should('contain.text', 'Peter')
        })

        directoryPage.menuDirectory().should('have.text', 'Directory')

        directoryPage.inputEmployeeName().type('Peter')
        directoryPage.listEmployeeName().should('contain.text', 'Peter').click()
        directoryPage.dropdownJobTitle().click()
        directoryPage.listJobTitleLocation().should('be.visible')
        cy.contains('Chief Financial').should('be.visible').click()
        directoryPage.dropdownLocation().click()
        directoryPage.listJobTitleLocation().should('be.visible')
        cy.contains('New').should('be.visible').click()
        directoryPage.buttonSearch().click()
        directoryPage.resultSerchByEmployeeName().should('have.text', '(1) Record Found')
        directoryPage.buttonReset().click()
        directoryPage.resultSerchByEmployeeName().should('contain.text', 'Records Found')
    });

    it("TC_004: No record found", () => {
        const startTime = new Date().getTime()

        cy.intercept("GET", "**/employees/action-summary").as("actionSummary")
        loginPage.buttonLogin().click()

        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            loginPage.verifyMyAction().should('have.text', '(1) Candidate to Interview')
        })
        loginPage.menuDashboard().should('have.text', 'Dashboard');

        cy.intercept("GET", "**/employees?limit=14&offset=0").as("employess")
        directoryPage.navigatetoDirectoryMenu().click()

        cy.wait("@employess").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)

            const endTime = new Date().getTime()
            const duration = endTime - startTime

            expect(duration).to.be.lessThan(6000)
            expect(intercept.response.body).to.have.property('data').and.to.be.an('array')
            expect(intercept.response.body.data).to.have.length.greaterThan(0);

            directoryPage.verifyDataDirectory().should('contain.text', 'Peter')
        })

        directoryPage.menuDirectory().should('have.text', 'Directory')

        directoryPage.inputEmployeeName().type('Peter')
        directoryPage.listEmployeeName().should('contain.text', 'Peter').click()
        directoryPage.dropdownJobTitle().click()
        directoryPage.listJobTitleLocation().should('be.visible')
        cy.contains('Chief Financial').should('be.visible').click()
        directoryPage.dropdownLocation().click()
        directoryPage.listJobTitleLocation().should('be.visible')
        cy.contains('Texas').should('be.visible').click()
        directoryPage.buttonSearch().click()
        directoryPage.toastNotFound().should('be.visible')
        directoryPage.resultSerchByEmployeeName().should('have.text', 'No Records Found')
        directoryPage.buttonReset().click()
        directoryPage.resultSerchByEmployeeName().should('contain.text', 'Records Found')
    });
    
})
