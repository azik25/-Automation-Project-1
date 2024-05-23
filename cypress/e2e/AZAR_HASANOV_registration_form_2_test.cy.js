beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests.
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

        cy.get('#username').type('azik1990')
        cy.get('#email').type('azik1990@gmail.com')
        cy.get('[name="name"]').type('garry')
        cy.get('#lastName').type('long')
        cy.get('[data-testid="phoneNumberTestId"]').type('58031150')
        cy.get('#password').type('nicecar123')
        cy.get('#confirm').type('nicecar1234')
        cy.get('p').contains('NB! Passwords should match').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#password_error_message').should('be.visible')

        //Changing password inputs so they match
        cy.get('#confirm').scrollIntoView().clear().type('nicecar123')
        cy.get('p').contains('NB! Passwords should match').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')

    })

    it('User can submit form with all fields added', () => {

        cy.get('#username').type('maldini25')
        cy.get('#email').type('maldini.p@gmail.com')
        cy.get('[name="name"]').type('paolo')
        cy.get('#lastName').type('maldini')
        cy.get('[data-testid="phoneNumberTestId"]').type('58031150')
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle1').click()
        cy.get('#cars').select('volvo')
        cy.get('#animal').select('hippo')
        cy.get('#password').type('brave12345')
        cy.get('#confirm').type('brave12345')

        // Veryfing that correctly filled out form can be successfuly submited
        cy.get('h2').contains('Select your favourite animal').click()
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('have.css', 'display', 'block')

    })

    it('User can submit form with valid data and only mandatory fields added', () => {

        inputValidData('KDBmc777')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')

    })

    it('User is unable to submit form if the last name field is missing data', () => {

        inputValidData('Brave777')
        inputUnmandatory()
        cy.get('#lastName').scrollIntoView().clear()
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('have.css', 'display', 'block')

    })
})

/*
Assignement 5: CREATE NEW VISUAL TESTS FOR REGISTRATION FORM 2
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#cars').select(2)
    cy.get('#animal').select(3)
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}

function inputUnmandatory() {
    cy.get('#vehicle1').click()
    cy.get('#vehicle2').click()
    cy.get('#vehicle3').click()
    cy.get('#javascriptFavLanguage').click()
}