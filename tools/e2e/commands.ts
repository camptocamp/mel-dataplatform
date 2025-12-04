/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
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
    login(username?: string, password?: string, redirect?: boolean)
    signOut(): void
    clearFavorites()
    selectDropdownOption(value: string): void
    openDropdown(): Chainable<JQuery<HTMLElement>>
    interceptDataset(id: string): void
    interceptSearchAggr(aggr: string): void
    addTranslationKey(): void
    removeTranslationKey(): void
    deleteAttachment(recordId: string, filename: string): void
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
      // do the login 2 times because it sometimes doesn't register (?)
      for (let i = 0; i < 2; i++) {
        cy.request({
          method: 'POST',
          url: '/geonetwork/signin',
          body: `username=${username}&password=${password}&_csrf=${xsrfTokenCookie.value}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          followRedirect: false,
        })
      }
    })
    cy.request({
      method: 'GET',
      url: '/geonetwork/srv/api/me',
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Could not log in to GeoNetwork API 😢')
      }
      cy.log('Login to GeoNetwork API successful!')
    })
    if (redirect) cy.visit('/')
    return cy.window()
  }
)

Cypress.Commands.add('signOut', () => {
  cy.visit('/geonetwork/srv/eng/catalog.search#/home')
  cy.get('a[title="User details"]').click()
  cy.get('a[title="Sign out"]').click()
})

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'openDropdown',
  { prevSubject: true },
  (dropdownElement) => {
    cy.get('body').click('bottomLeft') // first click on the document to close other dropdowns
    cy.wrap(dropdownElement).find('button').click()
    return cy.get('.cdk-overlay-container').find('[role=listbox]')
  }
)

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'selectDropdownOption',
  { prevSubject: true },
  (dropdownElement, value: string) => {
    cy.wrap(dropdownElement)
      .openDropdown()
      .find(`[data-cy-value="${value}"]`)
      .click()
  }
)

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
      url: `/geonetwork/srv/api/userselections/0/${this['myId']}`,
      headers: { accept: 'application/json' },
    })
      .its('body')
      .as('favoritesId')
  })

  return cy
    .getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      const favoritesId = this['favoritesId'] || []
      cy.request({
        url: `/geonetwork/srv/api/userselections/0/${
          this['myId']
        }?uuid=${favoritesId.join('&uuid=')}`,
        method: 'DELETE',
        headers: { accept: 'application/json', 'X-XSRF-TOKEN': token },
      })
    })
})

Cypress.Commands.add('interceptDataset', (id) => {
  cy.fixture(`datasets/${id}.json`).then((fixtureData) => {
    cy.intercept(
      'POST',
      `/geonetwork/srv/api/search/records/_search?bucket=bucket&relatedType=fcats&relatedType=hassources`,
      (req) => {
        if (req.body.query?.ids?.values.includes(id)) {
          req.reply({
            statusCode: 200,
            body: fixtureData,
          })
        }
      }
    ).as('interceptDataset')
  })
})

Cypress.Commands.add('interceptSearchAggr', (aggr: string) => {
  cy.fixture(`aggregations/${aggr}.json`).then((fixtureData) => {
    cy.intercept(
      'POST',
      `/geonetwork/srv/api/search/records/_search?bucket=bucket`,
      (req) => {
        if (req.body.aggregations && req.body.aggregations[aggr]) {
          req.reply({
            statusCode: 200,
            body: fixtureData,
          })
        }
      }
    ).as('interceptSearchAggr')
  })
})

Cypress.Commands.add('addTranslationKey', () => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/i18n/db/translations?replace=true`,
        method: 'PUT',
        body: JSON.stringify([
          {
            fieldName: 'application-banner',
            langId: 'fre',
            id: 0,
            value:
              'This is a warning message that should be shown when the key is set',
          },
          {
            fieldName: 'application-banner',
            langId: 'eng',
            id: 1,
            value:
              'This is a warning message that should be shown when the key is set',
          },
        ]),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        },
      })
    })
})

Cypress.Commands.add('removeTranslationKey', () => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/i18n/db/translations/application-banner`,
        method: 'DELETE',
        headers: { accept: 'application/json', 'X-XSRF-TOKEN': token },
      })
    })
})

Cypress.Commands.add(
  'deleteAttachment',
  (recordId: string, filename: string) => {
    cy.getCookie('XSRF-TOKEN')
      .its('value')
      .then(function (token) {
        cy.request({
          url: `/geonetwork/srv/api/records/${recordId}/attachments/${filename}`,
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            'X-XSRF-TOKEN': token,
          },
          failOnStatusCode: false,
        })
      })
  }
)
