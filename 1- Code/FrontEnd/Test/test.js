/*
============================================================================
Name        : test.js
Description : This file contains Selenium test cases for the User login and navigation,
              Admin event creation & deletion and RSVP functionality of a web application.
              Tests cover login validations, error handling, event creation, deletion, and RSVP functionality.
Author      : Bassam Ashraf
============================================================================
*/

const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect, assert } = require('chai');
const { Admin_credentials, User1_credentials, User2_credentials, User3_credentials } = require('./config');


const url = 'http://localhost:3000'; //url of the web application

/*============================================================================================================================================== *
 *                                                   Test suite for the Login Tests                                                              *
 *===============================================================================================================================================*/
describe('Login Tests', function () {
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    this.timeout(30000);

    /*****************************************************************************************************
    •⁠ ⁠Test ID : 1
    •⁠ ⁠Test Case : Login Test as admin
    
    •⁠ ⁠Description:  Test for login as admin and check if the user is logged in successfully.
    •⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
    *                   2. Verify that the admin is redirected to the login page.
    *                   3. Enter the admin credentials (email: admin@gmail.com, password: admin123). 
    *                   4. Click on the login button.
    *                   5. Verify that the admin is logged in successfully.
    *
    * Expected Result : The admin should be logged in successfully.
    *******************************************************************************************************/
    it('Test admin login and check if the user logged in successfully.', async function () {
        /* Navigate to the url (login page) */
        await driver.get(url);
        

        /* Locate all the elements in the login page that we need to interact with it */
        const emailField = await driver.wait ( until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by xpath
        const passwordField = await driver.findElement(By.css('input[type="password"]'));                                      // Find the password field by id selector //*[@id="«r5»"]
        const loginButton = await driver.wait ( until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector
        

        /* Send the admin credentials to the email and password fields */
        await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button


        /* Locate the logout button in the home page to check if the user logged in successfully */
        const logoutButton = await driver.wait ( until.elementLocated(By.xpath('//*[@id="root"]/header/div/button')) , 5000);  // Find the logout button by xpath
        
        assert.equal(await logoutButton.isDisplayed(), true,  'Logout button should be visible after successful login'); // Check if the logout button is displayed

        try
        {
            const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
            assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
        }
        catch(error)
        {
            const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
            const paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
            assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
        }
    });


/*****************************************************************************************************
•⁠ ⁠Test ID : 2
•⁠ Test Case : Test for incorrect login credentials.

•⁠ ⁠Description:  Test for incorrect login credentials.
•⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
*                   2. Enter the wrong credentials (email: Wrongusername, password: Wrongpassword). 
*                   3. Click on the login button.
*                   4. Verify that the error message is displayed.
*
* Expected Result : The error message should be displayed "Invalid login credentials" and the user should not be logged in.
*******************************************************************************************************/    
it('Test for incorrect login credentials.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);
   
    /* Locate all the elements in the login page that we need to interact with it */
    const emailField = await driver.wait ( until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by xpath
    const passwordField = await driver.findElement(By.css('input[type="password"]'));                                      // Find the password field by id selector //*[@id="«r5»"]
    const loginButton = await driver.wait ( until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

    /* Send the admin credentials to the email and password fields */
    await emailField.sendKeys('Wrongusername');          // Send the wrong username to the email field
    await passwordField.sendKeys('Wrongpassword');       // Send the wrong password to the password field
    await loginButton.click();                           // Click on the login button
    
    
    /* Wait for and verify error message */
    await driver.wait(until.alertIsPresent(), 5000);     // Wait for the alert to be present 5 seconds
    const alert = await driver.switchTo().alert();       // Switch to the alert
    
    
    /* Verify exact text content */
    const alertText = await alert.getText();                //Store the alert text in a variable and verify it
    assert.equal(alertText, "Invalid login credentials");
    await alert.accept();                                  // Accept the alert

});


/*****************************************************************************************************
•⁠ ⁠Test ID : 3
•⁠ ⁠Test Case : Test for blank email field.

•⁠ ⁠Description:  Test for blank email field.
•⁠ ⁠Test Procedure :  1. Navigate to  URL (http://localhost:3000).
*                   2. Enter the credentials with blank email (email: , password: admin123). 
*                   3. Click on the login button.
*                   4. Verify that user can't login.

* Expected Result : The user should not be logged in successfully.
*******************************************************************************************************/
it('Test for blank email field.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);


    /* Locate all the elements in the login page that we need to interact with it */
    const emailField = await driver.wait ( until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by xpath
    const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by id selector //*[@id="«r5»"]
    const loginButton = await driver.wait ( until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector


    /* Send the admin credentials to the email and password fields */
    await emailField.sendKeys('');          // Send the blank email to the email field
    await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
    await loginButton.click();                                      // Click on the login button

    
    /* Try to find the Logout button (should not be present) */
    let logoutButton = true;

    try
    {
        await driver.wait ( until.elementLocated(By.xpath('//*[@id="root"]/header/div/button')) , 5000);  // Find the logout button by xpath
    }
    catch(error) 
    {
        logoutButton = false;
    }
    assert.equal(logoutButton, false,  'Logout button should not be visible after blank email field'); // Check if the logout button is displayed

});

/*****************************************************************************************************
•⁠ ⁠Test ID : 4
•⁠ ⁠Test Case : Test for blank password field.

•⁠ ⁠Description:  Test for blank password field.
•⁠ ⁠Test Procedure :  1. Navigate to  URL (http://localhost:3000).
*                   2. Enter the credentials with blank password (email: admin@gmail.com, password: ). 
*                   3. Click on the login button.
*                   4. Verify that user can't login.

* Expected Result : The user should not be logged in successfully.
*******************************************************************************************************/
it('Test for blank password field.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);


    /* Locate all the elements in the login page that we need to interact with it */
    const emailField = await driver.wait ( until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by xpath
    const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by id selector //*[@id="«r5»"]
    const loginButton = await driver.wait ( until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector


    /* Send the admin credentials to the email and password fields */
    await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field   
    await passwordField.sendKeys('');       // Send the blank password to the password field
    await loginButton.click();                                      // Click on the login button


    /* Try to find the Logout button (should not be present) */
    let logoutButton = true;

    try
    {
        await driver.wait ( until.elementLocated(By.xpath('//*[@id="root"]/header/div/button')) , 5000);  // Find the logout button by xpath
    }
    catch(error) 
    {
        logoutButton = false;
    }
    assert.equal(logoutButton, false,  'Logout button should not be visible after blank password field'); // Check if the logout button is displayed
});


/*****************************************************************************************************
•⁠ ⁠Test ID : 5
•⁠ ⁠Test Case : Test for both fields are blank.

•⁠ ⁠Description:  Test for both fields are blank.
•⁠ ⁠Test Procedure :  1. Navigate to  URL (http://localhost:3000).
*                   2. Enter the credentials with blank email and password (email: , password: ).   
*                   3. Click on the login button.
*                   4. Verify that user can't login.

* Expected Result : The user should not be logged in successfully.
*******************************************************************************************************/
it('Test for both fields are blank.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);


    /* Locate all the elements in the login page that we need to interact with it */
    const emailField = await driver.wait ( until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by xpath
    const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by id selector //*[@id="«r5»"]
    const loginButton = await driver.wait ( until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector


    /* Send the admin credentials to the email and password fields */
    await emailField.sendKeys('');          // Send the blank email to the email field
    await passwordField.sendKeys('');       // Send the blank password to the password field
    await loginButton.click();                                      // Click on the login button    


    /* Try to find the Logout button (should not be present) */
    let logoutButton = true;

    try
    {
        await driver.wait ( until.elementLocated(By.xpath('//*[@id="root"]/header/div/button')) , 5000);  // Find the logout button by xpath
    }
    catch(error) 
    {
        logoutButton = false;
    }
    assert.equal(logoutButton, false,  'Logout button should not be visible after both fields are blank'); // Check if the logout button is displayed

});
});


/*============================================================================================================================================== *
 *                                                   Test suite for the Navigation Tests                                                         *
 *===============================================================================================================================================*/
describe('Navigation Tests', function () {
    let driver;
    this.timeout(30000);
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    this.timeout(30000);

/*****************************************************************************************************
•⁠ ⁠Test ID : 6
•⁠ ⁠Test Case : Test navigation from the home page to Dashboard.

•⁠ ⁠Description:  Test navigation from the home page to Dashboard page and back to home page.
•⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
*                   2. Enter the credentials (email: admin@gmail.com, password: admin123).
*                   3. Click on the login button.
*                   4. Verify that the user is redirected to the Home page.
*                   5. Click on the Dashboard button.
*                   6. Verify that the user is redirected to the Dashboard page.
*                   7. Click on the Home button.
*                   8. Verify that the user is redirected to the Home page.

* Expected Result : The user should be redirected to the Dashboard page and then back to the Home page.
*******************************************************************************************************/
    it('Test navigation from the home page to Dashboard page and back to home page', async function () {
        /* Navigate to the url (login page) */
        await driver.get(url);

        /* Locate all the elements in the login page that we need to interact with it */
        const emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by css selector
        const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by css selector
        const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

        /* Send the admin credentials to the email and password fields */
        await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button


        let paragraphText;
        try
        {
            const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
            assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
        }
        catch(error)
        {
            const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
            paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
            assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
        }

        /* Click on the Dashboard button and verify that the user is redirected to the Dashboard page */
        const dashboardButton = await driver.wait(until.elementLocated(By.css('a[href="/dashboard"]')), 5000);                      // Find the dashboard button by css selector
        await dashboardButton.click();                                                                                              // Click on the dashboard button

        const headerDashboardPage = await driver.wait(until.elementLocated(By.css('h4.MuiTypography-root.MuiTypography-h4')), 5000);  // Find the header element by css selector
        const headerText = await headerDashboardPage.getText(); // Get the text of the header element
        assert.equal(headerText, "Create New Event", 'Dashboard page should be visible after clicking on the dashboard button');       // Check if the header text is "Create New Event"

        /* Click on the Home button and verify that the user is redirected to the Home page */
        const homePage = await driver.wait(until.elementLocated(By.css('a[href="/"]')), 5000);              // Find the home page button by css selector
        await homePage.click();                                                                                                 // Click on the home page button
        try
        {
            const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
            assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
        }
        catch(error)
        {
            const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
            paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
            assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
        }
    });


/*****************************************************************************************************
•⁠ ⁠Test ID : 7
•⁠ ⁠Test Case : Test navigation from the home page (after login) to login page (after logout).

•⁠ ⁠Description:  Test navigation from the home page (after login) to login page (after logout).
•⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
*                   2. Enter the credentials (email: admin@gmail.com, password: admin123).
*                   3. Click on the login button.
*                   4. Verify that the user is redirected to the Home page.
*                   5. Click on the Logout button.
*                   6. Verify that the user is redirected to the Login page.

* Expected Result : The user should be redirected to the Home page after login and then back to the Login page after logout.
*******************************************************************************************************/
it('Test navigation from the home page (after login) to login page.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);

    /* Locate all the elements in the login page that we need to interact with it */
    const emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by css selector
    const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by css selector
    const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

    /* Send the admin credentials to the email and password fields */
    await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
    await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
    await loginButton.click();                                      // Click on the login button


    /* Verify that the user is redirected to the Home page (Log in successfully) */
    const homePage = await driver.wait(until.elementLocated(By.css('a[href="/"]')), 5000);              // Find the home page button by css selector
    assert.equal(await homePage.isDisplayed(), true, 'Home page should be visible after login');        // Check if the home page is visible


    try
    {
        const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
        assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
    }
    catch(error)
    {
        const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
        const paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
        assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
    }


    /* Click on the Logout button and verify that the user is logged out */
    const logoutButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Logout']")), 5000);  // Find the logout button by css selector
    await logoutButton.click();                                                                                              // Click on the logout button

    
    /* Verify that we're back on the login page */
    const heading = await driver.wait(until.elementLocated(By.css('h5.MuiTypography-h5')), 5000);                      // Find the heading element by css selector
    assert.strictEqual(await heading.getText(), 'Login', 'Should be back on login page after logout');                 // Check if we're on the login page

});


/*****************************************************************************************************
•⁠ ⁠Test ID : 8
•⁠ ⁠Test Case : Test navigation from the login page to the register page and back to the login page.

•⁠ ⁠Description:  Test navigation from the login page to the register page and back to the login page.
•⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
*                   2. Click on the Register button.
*                   3. Verify that the user is redirected to the Register page.
*                   4. Click on the Login button.
*                   5. Verify that the user is redirected to the Login page.    

* Expected Result : The user should be redirected to the Register page and then back to the Login page.
*******************************************************************************************************/
it('Test navigation from the login page to the register page and back to the login page.', async function () {
    /* Navigate to the url (login page) */
    await driver.get(url);

    /* Verify that we're on the login page */
    const loginHeading = await driver.wait(until.elementLocated(By.css('h5.MuiTypography-h5')), 5000);  // Find the heading element by css selector
    assert.strictEqual(await loginHeading.getText(), 'Login', 'Should be on login page');  // Check if we're on the login page

    
    /* Click on the Register button and verify that the user is redirected to the Register page */
    const registerButton = await driver.wait(until.elementLocated(By.css('a[href="/register"]')), 5000);  // Find the register button by css selector
    await registerButton.click();  // Click on the register button


    /* Verify that we're on the register page */
    const registerHeading = await driver.wait(until.elementLocated(By.css('h5.MuiTypography-h5')), 5000);  // Find the heading element by css selector
    assert.strictEqual(await registerHeading.getText(), 'Register', 'Should be on register page');  // Check if we're on the register page


    /* Click on the Login button and verify that the user is redirected to the Login page */
    const loginButton = await driver.wait(until.elementLocated(By.css('a[href="/login"]')), 5000);  // Find the login button by css selector
    await loginButton.click();  // Click on the login button


    /* Verify that we're back on the login page */
    const finalLoginHeading = await driver.wait(until.elementLocated(By.css('h5.MuiTypography-h5')), 5000);  // Find the heading element by css selector
    assert.strictEqual(await finalLoginHeading.getText(), 'Login', 'Should be back on login page');  // Check if we're on the login page
});




});


/*============================================================================================================================================== *
 *                                            Test suite for the event creation and deletion                                                     *
 *===============================================================================================================================================*/
describe('Event Creation and Deletion', function () {
    let driver;
    this.timeout(30000);
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    this.timeout(30000);

    /*****************************************************************************************************
    •⁠ ⁠Test ID : 9
    •⁠ ⁠Test Case : Test for creating a new event.

    •⁠ ⁠Description:  Test for creating a new event and check if it is created successfully.
    •⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
    *                   2. Enter the credentials (email: admin@gmail.com, password: admin123).
    *                   3. Click on the login button.
    *                   4. Verify that the user is redirected to the Home page.
    *                   5. Click on the Dashboard button.
    *                   6. Verify that the user is redirected to the Dashboard page.
    *                   7. Enter the event details (Event Name, Event Description, Event Date, Event Time, Event Location).
    *                   8. Click on the Create Event button.
    *                   9. Verify that the event is created successfully.
    *
    * Expected Result : The event should be created successfully and displayed in the Home page.
    *******************************************************************************************************/
    it('Create a new event', async function () {
        /* Navigate to the url (login page) */
        await driver.get(url);


        /* Locate all the elements in the login page that we need to interact with it */
        const emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by css selector
        const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by css selector
        const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

        /* Send the admin credentials to the email and password fields */
        await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button


        /* Verify that the user is redirected to the Home page (Log in successfully) */
        const homePage = await driver.wait(until.elementLocated(By.css('a[href="/"]')), 5000);              // Find the home page button by css selector
        assert.equal(await homePage.isDisplayed(), true, 'Home page should be visible after login');        // Check if the home page is visible

        try
        {
            const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
            assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
        }
        catch(error)
        {
            const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
            const paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
            assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
        }

        /* Click on the Dashboard button and verify that the user is redirected to the Dashboard page */
        const dashboardButton = await driver.wait(until.elementLocated(By.css('a[href="/dashboard"]')), 5000);                       // Find the dashboard button by css selector
        await dashboardButton.click();                                                                                               // Click on the dashboard button

        const headerDashboardPage = await driver.wait(until.elementLocated(By.css('h4.MuiTypography-root.MuiTypography-h4')), 5000);  // Find the header element by css selector
        const headerText = await headerDashboardPage.getText(); // Get the text of the header element
        assert.equal(headerText, "Create New Event", 'Dashboard page should be visible after clicking on the dashboard button');       // Check if the header text is "Create New Event"


        /* Locate the elements in the Dashboard page that we need to interact with it */
        const eventName = await driver.wait(until.elementLocated(By.css('input[name="name"]')), 5000);                   // Find the event name field by css selector
        const eventDescription = await driver.wait(until.elementLocated(By.css('textarea[name="description"]')), 5000);     // Find the event description field by css selector
        const eventDate = await driver.wait(until.elementLocated(By.css('input[name="date"]')), 5000);                   // Find the event date field by css selector
        const eventTime = await driver.wait(until.elementLocated(By.css('input[name="time"]')), 5000);                   // Find the event time field by css selector
        const eventLocation = await driver.wait(until.elementLocated(By.css('input[name="location"]')), 5000);           // Find the event location field by css selector
        
        /* Send the event details to the event fields */
        await eventName.sendKeys("Test Event");                          // Send the event name to the event name field
        await eventDescription.sendKeys("Test Description");             // Send the event description to the event description field
        await eventDate.sendKeys("01-01-2025");                          // Send the event date to the event date field
        await eventTime.click();
        await eventTime.sendKeys("10:00");                               // Send the event time to the event time field
        await eventTime.sendKeys("AM");
        await eventLocation.sendKeys("Test Location");                   // Send the event location to the event location field
        
        /* Locate the Create Event button and click on it */
        const createEventButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);   // Find the create event button by css selector
        await createEventButton.click();                                                                            // Click on the create event button
        

        /* Verify that the event is created successfully */
        const eventTitle = await driver.wait(until.elementLocated(By.css('h6.MuiTypography-root.MuiTypography-h6')), 5000);  // Find the event title by css selector
        const eventTitleText = await eventTitle.getText(); // Get the text of the event title
        assert.equal(eventTitleText, "Test Event", 'Event should be created successfully'); // Check if the event title is "Test Event"
        
    });


    /*****************************************************************************************************
    •⁠ ⁠Test ID : 10
    •⁠ ⁠Test Case : Test for deleting an event.

    •⁠ ⁠Description:  Test for deleting an event and check if it is deleted successfully.
    •⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
    *                   2. Enter the credentials (email: admin@gmail.com, password: admin123).
    *                   3. Click on the login button.
    *                   4. Verify that the user is redirected to the Home page.
    *                   5. Click on the Delete button.
    *                   6. Verify that the event is deleted successfully.

    * Expected Result : The event should be deleted successfully.
    *******************************************************************************************************/
    it('Delete an event', async function () {
        /* Navigate to the url (login page) */
        await driver.get(url);

        /* Locate all the elements in the login page that we need to interact with it */
        const emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by css selector
        const passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by css selector
        const loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

        /* Send the admin credentials to the email and password fields */
        await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button

        /* Verify that the user is redirected to the Home page (Log in successfully) */
        const homePage = await driver.wait(until.elementLocated(By.css('a[href="/"]')), 5000);              // Find the home page button by css selector
        assert.equal(await homePage.isDisplayed(), true, 'Home page should be visible after login');        // Check if the home page is visible
        await driver.sleep(5000);
        try
        {
            const deleteButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the paragraph element by css selector
            assert.equal(await deleteButton.isDisplayed(), true, 'Delete button should be visible after login');                        // check if the delete button is visible
        }
        catch(error)
        {
            const paragraphHomePage = await driver.wait(until.elementLocated(By.css('p.MuiTypography-root.MuiTypography-body1')), 5000);  // Find the paragraph element by css selector
            const paragraphText = await paragraphHomePage.getText();                                                                      // Get the text of the paragraph element
            assert.equal(paragraphText, "No Events Found", 'Home page should be visible after clicking on the home button');              // Check if the paragraph text is "No Events Found"
        }

        /* Delete the event */
        const deleteEventButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Delete"]')), 5000);  // Find the delete event button by css selector
        await deleteEventButton.click();                                                                            // Click on the delete event button

        });

});


/*============================================================================================================================================== *
 *                                            Test suite for the RSVP functionality                                                              *
 *===============================================================================================================================================*/
describe('RSVP Functionality', function () {
    let driver;
    this.timeout(30000);

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    this.timeout(30000);


    /*****************************************************************************************************
    •⁠ ⁠Test ID : 11
    •⁠ ⁠Test Case : Test for RSVPing to an event.

    •⁠ ⁠Description:  Test for RSVPing to an event and check if it is RSVPed successfully.
    •⁠ ⁠Test Procedure :  1. Navigate to login page (http://localhost:3000) .
    *                   2. Enter the admin credentials (email: admin@gmail.com, password: admin123) to create an event.
    *                   3. Click on the login button.
    *                   4. Click on the Dashboard button.
    *                   6. Enter the event details (Event Name, Event Description, Event Date, Event Time, Event Location).
    *                   7. Click on the Create Event button.
    *                   9. click on the logout button.
    *                   10. Enter the user credentials (email: bassam@gmail.com, password: bassam123).
    *                   11. Click on the login button.
    *                   12. Verify that the user is redirected to the Home page (Log in successfully).
    *                   13. Click on the RSVP button.
    *                   14. Verify that the event is RSVPed successfully.
    * 
    * Expected Result : The event should be RSVPed successfully.
    *******************************************************************************************************/
    it('RSVP to an event', async function () {
        /* Navigate to the url (login page) */
        await driver.get(url);

        /* Locate all the elements in the login page that we need to interact with it */
        let emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')) , 5000);  // Find the email field by css selector
        let passwordField = await driver.findElement(By.css('input[type="password"]'));                     // Find the password field by css selector
        let loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')) , 5000);  // Find the login button by css selector

        /* Send the admin credentials to the email and password fields */
        await emailField.sendKeys(Admin_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(Admin_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button

        /* Click on the Dashboard button and locate all the elements in the Dashboard page */
        const dashboardButton = await driver.wait(until.elementLocated(By.css('a[href="/dashboard"]')), 5000);                       // Find the dashboard button by css selector
        await dashboardButton.click();
        
        /* Locate the elements in the Dashboard page that we need to interact with it */
        const eventName = await driver.wait(until.elementLocated(By.css('input[name="name"]')), 5000);                   // Find the event name field by css selector
        const eventDescription = await driver.wait(until.elementLocated(By.css('textarea[name="description"]')), 5000);     // Find the event description field by css selector
        const eventDate = await driver.wait(until.elementLocated(By.css('input[name="date"]')), 5000);                   // Find the event date field by css selector
        const eventTime = await driver.wait(until.elementLocated(By.css('input[name="time"]')), 5000);                   // Find the event time field by css selector
        const eventLocation = await driver.wait(until.elementLocated(By.css('input[name="location"]')), 5000);           // Find the event location field by css selector
                
        /* Send the event details to the event fields */
        await eventName.sendKeys("Test Final Project");                          // Send the event name to the event name field
        await eventDescription.sendKeys("Testing Event Management System");             // Send the event description to the event description field
        await eventDate.sendKeys("05-25-2025");                          // Send the event date to the event date field
        await eventTime.click();
        await eventTime.sendKeys("10:00");                               // Send the event time to the event time field
        await eventTime.sendKeys("AM");
        await eventLocation.sendKeys("Test Location online meeting");                   // Send the event location to the event location field
                
        /* Locate the Create Event button and click on it */
        const createEventButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);   // Find the create event button by css selector
        await createEventButton.click();

        /* Wait for event creation to complete */
        await driver.wait(until.elementLocated(By.css('h6.MuiTypography-root.MuiTypography-h6')), 5000);
        
        /* Logout from the admin account */
        const logoutButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Logout']")), 5000);  // Find the logout button by css selector
        await logoutButton.click();

        /* Wait for login page to load and re-find login elements */
        await driver.wait(until.elementLocated(By.css('h5.MuiTypography-h5')), 5000);
        
        // Re-find login elements after logout
        emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 5000);
        passwordField = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
        loginButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

        /* Send the user credentials to the email and password fields */
        await emailField.sendKeys(User3_credentials.username);          // Send the admin username to the email field
        await passwordField.sendKeys(User3_credentials.password);       // Send the admin password to the password field
        await loginButton.click();                                      // Click on the login button
        
        
        /* Verify that the user is redirected to the Home page (Log in successfully) */
        const rsvpButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/button')), 5000);                                  // Find the RSVP button
        assert.equal(await rsvpButton.isDisplayed(), true, 'RSVP button should be visible after login if the event is created');               // check if the RSVP button is visible
        await rsvpButton.click();
        
       /* Wait for and verify RSVP confirmation first */
       const rsvpConfirmation = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "MuiAlert-message") and contains(., "RSVP Confirmed!")]')),5000);
       const rsvpConfirmationText = await rsvpConfirmation.getText();                                                                      // Get the text of the rsvp confirmation element
       assert.equal(rsvpConfirmationText, "RSVP Confirmed!", 'RSVP confirmation should be visible after RSVPing to the event');             // Check if the rsvp confirmation text is "RSVP Confirmed!"


        /* Then verify RSVP status with a more specific selector */
        const rsvpStatus = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[1]/div/div/p[2]')), 5000); // Find the rsvp status element by css selector
        const rsvpStatusText = await rsvpStatus.getText();                                                                      // Get the text of the rsvp status element
        assert.equal(rsvpStatusText, "You have RSVPed to this event.", 'RSVP status should be updated after RSVPing');             // Check if the rsvp status text is "You have RSVPed to this event."
    });


});
