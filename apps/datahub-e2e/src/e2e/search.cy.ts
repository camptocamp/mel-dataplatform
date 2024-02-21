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
  it('should display the result hits in search card', () => {
    cy.get('mel-datahub-results-card-search').should('have.length', 14)
  })

  // If not logged in or no favorites exists
  it('should display record results in last created cards inside a carousel', () => {
    cy.get('mel-datahub-custom-carousel')
      .find('mel-datahub-results-card-last-created')
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
      cy.get('@firstResult').click()
      cy.url().should('include', 'dataset')
      cy.get('mel-datahub-dataset-page').should('be.visible')
    })
  })

  // If logged in and favorites exist
  describe('User logged in', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/search')
      cy.get('mel-datahub-heart-toggle').first().click()
    })
    it('should display record results in favorite cards inside a carousel', () => {
      cy.get('mel-datahub-custom-carousel')
        .find('mel-datahub-results-card-favorite')
        .eq(0)
        .find('h1')
        .should(
          'have.text',
          ' Metadata for E2E testing purpose. (this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut) '
        )

      cy.get('mel-datahub-results-card-favorite')
        .find('.mel-badge-button')
        .should('be.visible')

      cy.get('mel-datahub-results-card-favorite')
        .find('mel-datahub-metadata-quality')
        .should('be.visible')
    })

    describe('interactions with dataset', () => {
      beforeEach(() => {
        cy.get('mel-datahub-results-card-favorite').first().as('firstResult')
      })
      it('should open the dataset page in the same application on click', () => {
        cy.get('@firstResult').find('h1').click()
        cy.url().should('include', 'dataset')
        cy.get('mel-datahub-dataset-page').should('be.visible')
      })
    })
  })
})
