describe('home', () => {
  beforeEach(() => cy.visit('/'))

  describe('home header search', () => {
    it('should display the title', () => {
      cy.get('.mel-page-title').should('be.visible')
    })
    it('should display the search bar and placeholder', () => {
      cy.get('mel-datahub-fuzzy-search').should('be.visible')
      cy.get('mel-datahub-autocomplete').should('have.length.gt', 0)
    })
    it('should create correct url to navigate to search', () => {
      cy.get('mel-datahub-fuzzy-search').type('test{enter}')
      cy.url().should('include', 'catalogue/search?q=test')
    })
  })

  describe('home header carousel', () => {
    it('should display results card last created', () => {
      cy.get('mel-datahub-results-card-last-created').should('be.visible')
      cy.get('mel-datahub-results-card-last-created').should(
        'have.length.gt',
        0
      )
      cy.get('mel-datahub-results-card-last-created').as('lastCreatedCard')

      cy.get('@lastCreatedCard').find('h1').should('be.visible')
      cy.get('@lastCreatedCard')
        .find('.mel-badge-button-primary')
        .should('be.visible')
    })
    it('should display a carousel that loops through last created cards', () => {
      cy.get('mel-datahub-custom-carousel').find(
        'mel-datahub-results-card-last-created'
      )
      cy.get('mel-datahub-custom-carousel')
        .find('[title="carousel-arrow-right"]')
        .click()

      cy.get('mel-datahub-custom-carousel')
        .find('h1')
        .eq(2)
        .should(
          'have.text',
          ' Leitungskataster Fernwärme AEW Energie AG '
        )
        .should('be.visible')
    })
    describe('interactions with dataset', () => {
      beforeEach(() => {
        cy.get('mel-datahub-results-card-last-created')
          .first()
          .as('firstResult')
      })
      it('should create correct url to open the dataset page in the same application on click', () => {
        cy.get('@firstResult').click()
        cy.url().should(
          'include',
          'catalogue/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a'
        )
      })
      it('should create correct url to navigate to search on keyword click', () => {
        cy.get('mel-datahub-results-card-last-created').eq(1).find('.mel-badge-button-primary').first().click()
        cy.url().should('include', 'catalogue/search?q=administration')
      })
    })
  })

  describe('footer', () => {
    beforeEach(() => {
      cy.get('mel-datahub-footer').as('footer')
    })
    it('should display the footer', () => {
      cy.get('@footer').should('be.visible')
    })
    it('should have links to the social medias', () => {
      cy.get('@footer')
        .find('ul')
        .first()
        .children('li')
        .first()
        .find('a')
        .invoke('attr', 'href')
        .as('url')
      cy.get('@url').should('include', 'twitter')
      cy.get('@url').should('include', 'MetropoleLille')
    })
    it('should display the partners icons as links', () => {
      cy.get('@footer')
        .children('footer')
        .first()
        .children('div')
        .first()
        .children('div')
        .eq(1)
        .children('a')
        .should('have.length', 2)
        .each((el, index) => {
          const urls = [
            'https://next-generation-eu.europa.eu/index_fr',
            'https://www.economie.gouv.fr/plan-de-relance',
          ]
          cy.wrap(el).should('have.attr', 'href', urls[index])
          cy.wrap(el).should('have.attr', 'target', '_blank')
        })
    })
    it('should have a button to the newsletter subscription', () => {
      cy.get('@footer')
        .children('footer')
        .first()
        .children('div')
        .first()
        .children('div')
        .eq(2)
        .find('a')
        .invoke('attr', 'href')
        .as('url')
      cy.get('@url').should('include', 'infolettre')
    })
    it('should have nav links to MEL website', () => {
      cy.get('@footer')
        .children('footer')
        .first()
        .children('div')
        .eq(1)
        .find('li')
        .eq(1)
        .find('a')
        .invoke('attr', 'href')
        .as('url')
      cy.get('@url').should('include', 'mentions-legales')
    })
  })
})
