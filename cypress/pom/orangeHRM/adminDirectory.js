export default class directoryPage {
    static navigatetoDirectoryMenu(){
        return cy.get('[href="/web/index.php/directory/viewDirectory"]').contains('Directory')
    }

    static menuDirectory(){
        return cy.get('h6').contains('Directory')
    }

    static verifyDataDirectory(){
        return cy.get('p').contains('Peter')
    }

    static inputEmployeeName(){
        return cy.get('[class="oxd-autocomplete-text-input oxd-autocomplete-text-input--active"]')
    }

    static listEmployeeName(){
        return cy.get('[class="oxd-autocomplete-dropdown --positon-bottom"]').should('be.visible')
    }

    static buttonSearch(){
        return cy.get('[type="submit"]')
    }

    static resultSerchByEmployeeName(){
        return cy.get('[class="oxd-text oxd-text--span"]')
    }

    static buttonReset(){
        return cy.get('[type="reset"]')
    }

    static dropdownJobTitle(){
        return cy.get('[class="oxd-select-wrapper"]').eq(0)
    }

    static dropdownLocation(){
        return cy.get('[class="oxd-select-wrapper"]').eq(1)
    }

    static listJobTitleLocation(){
        return cy.get('[class="oxd-select-dropdown --positon-bottom"]').should('be.visible')
    }

    static toastNotFound(){
        return cy.get('[class="oxd-toast-container oxd-toast-container--bottom"]')
    }

    
}