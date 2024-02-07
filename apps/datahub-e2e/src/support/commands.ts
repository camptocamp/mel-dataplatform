/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(username?: string, password?: string, redirect?: boolean): void
    signOut(): void
    clearFavorites(): void
  }
}

Cypress.Commands.add(
  'login',
  (username = 'admin', password = 'admin', redirect = false) => {
    // first request to get the XSRF cookie
    cy.request({
      method: 'GET',
      url: '/geonetwork/srv/api/me',
      headers: {
        Accept: 'application/json',
      },
    })
    cy.getCookie('XSRF-TOKEN').then((xsrfTokenCookie) => {
      cy.request({
        method: 'POST',
        url: '/geonetwork/signin',
        body: `username=${username}&password=${password}&_csrf=${xsrfTokenCookie.value}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        followRedirect: false,
      })
    })
    if (redirect) return cy.visit('/')
    else return cy.window()
  }
)

Cypress.Commands.add('signOut', () => {
  cy.visit('/geonetwork/srv/eng/catalog.search#/home')
  cy.get('a[title="User details"]').click()
  cy.get('a[title="Sign out"]').click()
})

/**
 * This will most likely fail if the user is not logged in!
 */
Cypress.Commands.add('clearFavorites', () => {
  cy.request({
    url: '/geonetwork/srv/api/me',
    headers: { accept: 'application/json' },
  })
    .its('body')
    .its('id')
    .as('myId')

  cy.window().then(function () {
    cy.request({
      url: `/geonetwork/srv/api/userselections/0/${this.myId}`,
      headers: { accept: 'application/json' },
    })
      .its('body')
      .as('favoritesId')
  })

  return cy
    .getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      const favoritesId = this.favoritesId || []
      cy.request({
        url: `/geonetwork/srv/api/userselections/0/${
          this.myId
        }?uuid=${favoritesId.join('&uuid=')}`,
        method: 'DELETE',
        headers: { accept: 'application/json', 'X-XSRF-TOKEN': token },
      })
    })
})
