describe('datahub-e2e', () => {
  beforeEach(() => cy.visit('/search'))

  it('should display the title', () => {
    cy.get('.mel-page-title').should('be.visible')
  })
  it('should display the number of result hits', () => {
    cy.get('gn-ui-results-hits-number').should('contain', 14)
  })
  it('should display the footer', () => {
    cy.get('mel-datahub-footer').should('be.visible')
  })

  // If not logged in or no favorites exists
  it('should display record results in last created cards', () => {
    cy.get('mel-datahub-results-card-last-created')
      .eq(0)
      .find('h1')
      .should(
        'have.text',
        ' Metadata for E2E testing purpose. (this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut) '
      )

    cy.get('mel-datahub-results-card-last-created')
      .find('h1')
      .should('be.visible')

    cy.get('mel-datahub-results-card-last-created')
      .find('.mel-badge-button')
      .should('be.visible')
  })

  describe('interactions with dataset', () => {
    beforeEach(() => {
      cy.get('mel-datahub-results-card-last-created').first().as('firstResult')
    })
    it('should open the dataset page in the same application on click', () => {
      const urlRegex = /http:\/\/[^/]+:\d+\/dataset/
      cy.get('@firstResult').click()
      cy.url().should('match', urlRegex)
      cy.get('mel-datahub-dataset-page').should('be.visible')
    })
  })

  // ********************
  // TODO: This can be activated and tested when we will be able to add favorites

  // it('should display record results in preview cards', () => {
  //   cy.get('mel-datahub-results-card-favorite')
  //     .eq(0)
  //     .find('h1')
  //     .should(
  //       'have.text',
  //       ' Cartographie des sols agricoles de la plaine du Rhône '
  //     )

  //   cy.get('mel-datahub-results-card-favorite')
  //     .find('.mel-badge-button')
  //     .should('be.visible')

  //   cy.get('mel-datahub-results-card-favorite')
  //     .find('gn-ui-star-toggle')
  //     .should('be.visible')

  //   cy.get('mel-datahub-results-card-favorite')
  //     .find('mel-datahub-mel-datahub-metadata-quality')
  //     .should('be.visible')
  // })

  // describe('interactions with dataset', () => {
  //   beforeEach(() => {
  //     cy.get('mel-datahub-results-card-favorite').first().as('firstResult')
  //   })
  //   it('should open the dataset page in the same application on click', () => {
  //     const urlRegex = /http:\/\/[^/]+:\d+\/dataset/
  //     cy.get('@firstResult').click()
  //     cy.url().should('match', urlRegex)
  //     cy.get('mel-datahub-dataset-page').should('be.visible')
  //   })
  //   it('should filter the search by clicked keyword', () => {
  //     const urlRegex = /http:\/\/[^\/]+:\d+\/search\?q=.+/
  //     cy.get('@firstResult')
  //       .find('.mel-badge-button')
  //       .first()
  //       .as('firstKeyWord')
  //       .should('have.text', ' Usage des sols ')

  //     cy.get('@firstKeyWord').click()
  //     cy.url().should('match', urlRegex)

  //     cy.get('mel-datahub-results-card-search').should('be.visible')
  //   })
  // })
  // ********************
})
