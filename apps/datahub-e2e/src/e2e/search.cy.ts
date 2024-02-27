describe('search', () => {
  beforeEach(() => cy.visit('/search'))

  describe('search page defaults', () => {
    it('should display the title', () => {
      cy.get('.mel-page-title').should('be.visible')
    })
    it('should display the number of result hits', () => {
      cy.get('[data-cy="searchResults"]').should('contain', 14)
    })
    it('should display the footer', () => {
      cy.get('mel-datahub-footer').should('be.visible')
    })
    it('should display the result hits in search card', () => {
      cy.get('mel-datahub-results-card-search').should('have.length', 14)
    })
  })

  describe('search header carousel', () => {
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
        cy.get('mel-datahub-results-card-last-created')
          .first()
          .as('firstResult')
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

  describe('search form and results', () => {
    const getFilterOptions = () => {
      cy.get('[id^=dropdown-multiselect-] label').as('options')
    }

    beforeEach(() => {
      cy.get('mel-datahub-filter-dropdown').as('filters')
      cy.get('mel-datahub-results-card-search').as('result-cards')
    })

    it('should display the search form', () => {
      cy.get('mel-datahub-search-form').should('be.visible')
    })
    it('should display the search filters', () => {
      cy.get('mel-datahub-search-filters').should('be.visible')
    })
    it('should display the search results', () => {
      cy.get('mel-datahub-search-results').should('be.visible')
    })
    it('should display the search results in a grid', () => {
      cy.get('mel-datahub-results-list-grid').should('be.visible')
    })
    it('should filter the results when selecting a filter value (topic)', () => {
      cy.get('@filters').eq(0).click()
      getFilterOptions()
      cy.get('@options').eq(0).click()
      cy.get('@result-cards').should('have.length', 2)
      cy.get('@result-cards')
        .eq(0)
        .find('h1')
        .should('have.text', ' Alpenkonvention ')
      cy.get('@result-cards')
        .eq(1)
        .find('h1')
        .should(
          'have.text',
          ' Patrimoine - Biens classés et zones de protection - Série '
        )
    })
    it('should filter the results when selecting multiple filter values (producer)', () => {
      cy.get('@filters').eq(1).click()
      getFilterOptions()
      cy.get('@options').eq(0).click()
      cy.get('@options').eq(1).click()
      cy.get('@options').eq(2).click()
      cy.get('mel-datahub-results-card-search').should('have.length', 3)
    })
    it('should filter the results when executing a search', () => {
      cy.get('mel-datahub-autocomplete input').type('velo')
      cy.get('mel-datahub-autocomplete .material-symbols-outlined')
        .contains('search')
        .click()
      cy.get('@result-cards').should('have.length', 1)
      cy.get('@result-cards')
        .eq(0)
        .find('h1')
        .should('have.text', ' Accroches vélos MEL ')
    })
    it('should combine search input and filters (producer)', () => {
      cy.get('mel-datahub-autocomplete input').type('test')
      cy.get('mel-datahub-autocomplete .material-symbols-outlined')
        .contains('search')
        .click()
      cy.get('@result-cards').should('have.length', 3)
      cy.get('@filters').eq(1).click()
      getFilterOptions()
      cy.get('@options').eq(12).click()
      cy.get('@result-cards').should('have.length', 1)
      cy.get('@result-cards')
        .eq(0)
        .find('h1')
        .should('have.text', ' Accroches vélos MEL ')
    })
    it('should combine search input and filters and display a message if no results found', () => {
      cy.get('mel-datahub-autocomplete input').type('test')
      cy.get('mel-datahub-autocomplete .material-symbols-outlined')
        .contains('search')
        .click()
      cy.get('@result-cards').should('have.length', 3)
      cy.get('@filters').eq(1).click()
      getFilterOptions()
      cy.get('@options').eq(10).click()
      cy.get('[data-cy=searchResults]').should(
        'have.text',
        ' Aucune correspondance. '
      )
    })
  })
})
