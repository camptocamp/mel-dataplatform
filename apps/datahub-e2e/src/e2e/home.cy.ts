describe('datahub-e2e', () => {
  beforeEach(() => cy.visit('/home'))

  it('should display the title', () => {
    cy.get('.mel-page-title').should('be.visible')
  })
  it('should display the search bar and placeholder', () => {
    cy.get('gn-ui-fuzzy-search').should('be.visible')
    cy.get('gn-ui-autocomplete').should('have.length.gt', 0)
  })
})
