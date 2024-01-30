describe('datahub-e2e', () => {
  beforeEach(() => cy.visit('/search'))

  it('should display the title', () => {
    cy.get('.mel-page-title').should('be.visible')
  })
  it('should display the number of result hits', () => {
    cy.get('gn-ui-results-hits-number').should('contain', 12)
  })
  it('should display record results in preview cards', () => {
    cy.get('mel-datahub-results-list-grid')
      .find('mel-datahub-results-card-search')
      .eq(0)
      .find('h1')
      .should(
        'have.text',
        ' Cartographie des sols agricoles de la plaine du Rhône '
      )
  })
})
