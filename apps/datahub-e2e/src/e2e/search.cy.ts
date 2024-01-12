describe('datahub-e2e', () => {
  beforeEach(() => cy.visit('/search'))

  it('should display the title', () => {
    cy.get('.mel-page-title').should('be.visible')
  })
  it('should display the number of result hits', () => {
    cy.get('gn-ui-results-hits-number').should('contain', 12)
  })
  it('should display record results in preview cards', () => {
    cy.get('gn-ui-results-list')
      .find('gn-ui-record-preview-card')
      .eq(0)
      .find('h1')
      .should('have.text', ' Accroches vélos MEL ')
  })
})
