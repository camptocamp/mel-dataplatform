describe('datahub-e2e', () => {
  beforeEach(() => cy.visit('/home'))

  it('should display the title', () => {
    cy.get('.mel-page-title').should('be.visible')
  })
  it('should display the search bar and placeholder', () => {
    cy.get('mel-datahub-fuzzy-search').should('be.visible')
    cy.get('mel-datahub-autocomplete').should('have.length.gt', 0)
  })
  it('should display results card last created', () => {
    cy.get('mel-datahub-results-card-last-created').should('be.visible')
    cy.get('mel-datahub-results-card-last-created').should('have.length.gt', 0)
    cy.get('mel-datahub-results-card-last-created').as('lastCreatedCard')

    cy.get('@lastCreatedCard').find('h1').should('be.visible')
    cy.get('@lastCreatedCard').find('.mel-badge-button').should('be.visible')
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
  describe('custom carousel', () => {
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
          ' Cartographie des sols agricoles de la plaine du Rhône '
        )
        .should('be.visible')
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
    it('should display the partners icons', () => {
      cy.get('@footer')
        .children('footer')
        .first()
        .children('div')
        .first()
        .children('div')
        .eq(1)
        .children('img')
        .should('have.length', 2)
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
        .eq(3)
        .find('a')
        .invoke('attr', 'href')
        .as('url')
      cy.get('@url').should('include', 'recrutement')
    })
  })
})
