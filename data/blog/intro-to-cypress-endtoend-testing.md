---
title: Intro to Cypress End-to-End Testing
date: '2021-05-19'
tags: ['cypress', 'testing', 'automation']
draft: false
summary: 'Getting started with end-to-end testing using Cypress'
images: []
---

I had been hearing a lot of good reviews of [Cypress](https://www.cypress.io/) lately and was looking to develop some tests for a [new fullstack web app](https://vigilant-wing-933e71.netlify.app/) I had built so I decided to give it a go. I quicky realized why there have been so many positive reviews - after a few minutes, I was up and running with a few basics tests. I found setup / configuration intuative and the documentation is fantastic. I am looking foward to developing more complex tests but before doing so, let's step back a recap the first few steps. 

First, what is Cypress? It is a testing framework / library that enables the execution of UI tests, interacting with elements in the browser just as a real user would. In this regard, it is pretty similiar to Selenium.

## Installation

There are a few ways to get Cypress added to your project. I opted for: 

`$ yarn add cypress --dev` 

This should generate a `cypress` directory within your project root. 

## Writing Tests

To get started with writing tests, a spec file is needed. Within `cypress/integration` add a `sample_spec.js` file. I decided to begin writing tests around the login flow since many other tests will require a logged in user. So my spec file looked like: 

```javascript
describe("Login Tests", () => {
  it("Login Button Directs to Login Page", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get(".form > h1").should("have.text", "Login");
  });
  it("Invalid Credentials Prompts Error", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("Not User");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should("have.text", "User not found");
  });
  it("Blank Password Field Promts Error", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("Not User");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should(
      "have.text",
      "password cannot be blank"
    );
  });
  it("Blank Username Field Promts Error", () => {
    cy.visit("/login");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should(
      "have.text",
      "username cannot be blank"
    );
  });
  it("Login Works with Valid Credentials", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(Cypress.env("VALID_USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("VALID_PASSWORD"));
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="logout-btn"]').should("be.visible");
    cy.get(".page-title").should("have.text", "Recent Posts");
    cy.get(".form > h2").should("have.text", "Create New Post");
    cy.get('[id="username"]').should("have.text", "Demo User");
  });
  it("User Can Logout", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(Cypress.env("VALID_USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("VALID_PASSWORD"));
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="username"]').should("have.text", "Demo User");
    cy.get('[id="logout-btn"]').click();
    cy.get('[id="home-btn"]').should("be.visible");
  });
});
```

A couple of points about the code to note is that the `cy.visit()` methods are missing complete URLs and also the use of `Cypress.env()`. Both of these are leveraging data within a configuration file - specifically, `cypress.json` at project root (this file should be inclided in your gitignore). We can define some data in this file in order to have a bit cleaner spec file. The configuration looks something like: 

```json
{
  "env": {
    "VALID_USERNAME": "Demo User",
    "VALID_EMAIL": "demo@email.com",
    "VALID_PASSWORD": "password"
  },
  "baseUrl": "http://localhost:3000"
}
```
## Running Tests

Now we've got a spec file with a handful of tests written. In order to run the tests, we've got to open/start cypress. To do so, add a script to `package.json`:
```json
  "scripts": {
    "cypress:open": "cypress open"
  },
```
 Then run it: `$ yarn cypress:open`. A new window should appear with a list of your spec files. Clicking on the spec file will launch a browser and start the tests. From here you can see the test steps being executed and track the status of each test (pass / fail) as they finish. 

 This should provide a solid overview of what Cypress does and how it is incorporated into a project. From here, I recommend building out more spec files / tests and to dig into the [documentation](https://docs.cypress.io/guides/overview/why-cypress) to find out about all the tricks, tips, and features. Overall, I found setup straightforward and developing tests to be a pleasant experience. 
