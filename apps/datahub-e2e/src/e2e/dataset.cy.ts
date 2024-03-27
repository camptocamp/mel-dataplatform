describe('datasets', () => {
  describe('when not logged in', () => {
    beforeEach(() => {
      cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
    })

    it('should display the favorite button disabled', () => {
      cy.get('mel-datahub-button').eq(1).find('button').as('favoriteButton')
      cy.get('@favoriteButton').should('be.disabled')
      cy.get('@favoriteButton').should(
        'have.css',
        'background-color',
        'rgb(250, 206, 210)'
      )
    })

    it('should display the title', () => {
      cy.get('.mel-page-title').should('be.visible')
      cy.get('.mel-page-title').should(
        'have.text',
        ' SCoT (Schéma de cohérence territoriale) en région Hauts-de-France '
      )
    })

    it('should display the abstract in collapsed mode applying gradient', () => {
      cy.get('mel-datahub-text-expand').should('be.visible')
      cy.get('mel-datahub-text-expand')
        .find('mel-datahub-button')
        .should('have.text', ' En savoir plus ')
      cy.get('mel-datahub-text-expand')
        .find('mel-datahub-button')
        .find('img')
        .should('have.attr', 'src', 'assets/icons/arrow.svg')
      cy.get('mel-datahub-text-expand')
        .find('.bg-gradient-to-b')
        .should('have.css', 'max-height', '96px')
    })

    it('should scroll down when clicking on download button', () => {
      cy.get('mel-datahub-button').eq(2).as('downloadButton')
      cy.get('@downloadButton').click()
      cy.get('@downloadButton').should(() => {
        const scrollPosition = Cypress.dom.getWindowByElement(
          cy.state('window')
        ).scrollY
        expect(scrollPosition).to.be.greaterThan(0)
      })
    })

    it('should scroll down when clicking on api button', () => {
      cy.get('mel-datahub-button').eq(3).as('apiButton')
      cy.get('@apiButton').click()
      cy.get('@apiButton').should(() => {
        const scrollPosition = Cypress.dom.getWindowByElement(
          cy.state('window')
        ).scrollY
        expect(scrollPosition).to.be.greaterThan(0)
      })
    })

    it('should display the abstract in expanded mode without gradient', () => {
      cy.get('mel-datahub-text-expand').should('be.visible')
      cy.get('mel-datahub-text-expand').find('mel-datahub-button').click()
      cy.get('mel-datahub-text-expand')
        .find('mel-datahub-button')
        .should('have.text', ' Reduire ')
      cy.get('mel-datahub-text-expand')
        .find('mel-datahub-button')
        .find('img')
        .should('have.attr', 'src', 'assets/icons/arrow-up.svg')
      cy.get('mel-datahub-text-expand')
        .find('.bg-gradient-to-b')
        .should('not.exist')
      cy.get('mel-datahub-text-expand')
        .find('.ease-in')
        .should('have.css', 'max-height')
        .and('satisfy', (maxHeight) => parseInt(maxHeight, 10) > 110)
    })

    it('should display the footer', () => {
      cy.get('mel-datahub-footer').should('be.visible')
    })
  })

  describe('Vizualisation block', () => {
    beforeEach(() => {
      cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
    })
    it('should display the vizualisation block', () => {
      cy.get('mel-datahub-dataset-visualisation').should('be.visible')
    })

    it('should display the map preview by default', () => {
      cy.get('gn-ui-map-context').should('be.visible')
      cy.get('gn-ui-table-view').should('not.exist')
      cy.get('gn-ui-chart-view').should('not.exist')
    })

    it('should switch between tabs and display the table and analysis components', () => {
      cy.get('mel-datahub-dataset-visualisation')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(1)
        .click()
      cy.get('gn-ui-table-view').should('be.visible')
      cy.get('mel-datahub-dataset-visualisation')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(2)
        .click()
      cy.get('gn-ui-chart-view').should('be.visible')
    })

    it('should display the sharing tool', () => {
      cy.get('mel-datahub-dataset-visualisation')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(2)
        .click()
      cy.get('gn-ui-data-view-share').should('be.visible')
    })
  })

  describe('Information block', () => {
    beforeEach(() => {
      cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
      cy.get('mel-datahub-dataset-information')
        .children('div')
        .first()
        .children('div')
        .eq(1)
        .as('mainInfo')
    })
    it('should display the information block', () => {
      cy.get('mel-datahub-dataset-information').should('be.visible')
    })

    it('should display the update date', () => {
      cy.get('@mainInfo')
        .first()
        .find('div')
        .first()
        .find('span')
        .should('have.text', 'Mise à jour le')
    })

    it('should display the categories btns', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(1)
        .find('div')
        .children('span')
        .should('have.length.gt', 0)
    })

    it('should display the territories', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(2)
        .find('div')
        .children('span')
        .should('have.length.gt', 0)
    })

    it('should display the licenses', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(3)
        .children('span')
        .eq(1)
        .should('have.length.gt', 0)
    })

    it('should display the producer', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(4)
        .find('span')
        .eq(1)
        .should('have.text', 'Région Hauts-de-France')
    })

    it('should display the social media share btns', () => {
      cy.get('mel-datahub-dataset-information')
        .children('div')
        .first()
        .children('div')
        .eq(2)
        .children('div')
        .first()
        .find('a')
        .should('have.length', 4)
    })
  })

  describe('API block', () => {
    beforeEach(() => cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2'))

    it('should display the API block', () => {
      cy.get('mel-datahub-dataset-apis').should('be.visible')
    })
    it('should have API cards', () => {
      cy.get('mel-datahub-dataset-apis')
        .find('mel-datahub-custom-carousel')
        .find('mel-datahub-api-card')
        .should('have.length.gt', 0)
    })
    it('should display the swagger link', () => {
      cy.get('mel-datahub-dataset-apis')
        .find('mel-datahub-custom-carousel')
        .find('mel-datahub-api-card')
        .last()
        .click()
      cy.get('mel-datahub-api-form')
        .find('a')
        .invoke('attr', 'href')
        .should(
          'eq',
          'https://mel.integration.apps.gs-fr-prod.camptocamp.com/data/swagger-ui/index.html'
        )
    })
    it('should open the api form', () => {
      cy.get('mel-datahub-dataset-apis')
        .find('mel-datahub-custom-carousel')
        .find('mel-datahub-api-card')
        .last()
        .click()
      cy.get('mel-datahub-api-form').should('be.visible')
    })
  })

  describe('Downloads section', () => {
    beforeEach(() => {
      cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
    })
    it('should download button should contain the correct link and open in new tab', () => {
      cy.get('[data-cy="download-button"]')
        .first()
        .invoke('attr', 'href')
        .as('downloadLink')
      cy.get('@downloadLink').should(
        'contain',
        '/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv'
      )
      cy.get('[data-cy="download-button"]')
        .first()
        .should('have.attr', 'target', '_blank')
    })
    it('should copy the link resource to clipboard when clicking on copy button', () => {
      cy.get('body').focus()
      cy.get('[data-cy="copy-button"]').first().click()
      // attempt to make the whole page focused
      cy.get('body').focus()

      cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
          expect(text).to.eq(
            'https://www.geo2france.fr/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv'
          )
        })
      })
    })
  })

  describe('Related datasets section', () => {
    it('should display the related datasets section', () => {
      cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
      cy.get('[data-cy="related-records-section"]').should('be.visible')
      cy.get('[data-cy="related-records-section"]')
        .find('mel-datahub-results-card-last-created')
        .should('have.length.gt', 0)
    })
  })

  describe('Navigation', () => {
    describe('With a query on', () => {
      beforeEach(() => cy.visit('/search?publisher=Barbie%20Inc.'))
      it('should return to the search page with the previous query on', () => {
        cy.get('mel-datahub-results-card-search').first().click()

        cy.get('mel-datahub-dataset-header')
          .find('mel-datahub-button')
          .first()
          .click()
        cy.url().should('include', '/search?publisher=Barbie%20Inc.')
      })
    })
    describe('Without a query on', () => {
      beforeEach(() => cy.visit('/'))
      it('should return to the dataset list on the search page', () => {
        cy.get('mel-datahub-results-card-last-created').first().click()

        cy.get('mel-datahub-dataset-header')
          .find('mel-datahub-button')
          .first()
          .click()
        cy.url().should('include', '/search')
      })
    })
  })
})
describe('when logged in', () => {
  beforeEach(() => {
    cy.login()
    cy.clearFavorites()
    cy.visit('/dataset/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
  })
  it('should toggle the favorite button', () => {
    cy.get('mel-datahub-button').eq(1).as('favoriteButton')
    cy.get('@favoriteButton')
      .find('img')
      .should('have.attr', 'src', 'assets/icons/heart.svg')
    cy.get('@favoriteButton').click()
    cy.get('@favoriteButton')
      .find('img')
      .should('have.attr', 'src', 'assets/icons/heart-filled.svg')
  })
})
