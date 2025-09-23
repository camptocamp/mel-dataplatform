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
        .find('div')
        .children('div')
        .eq(1)
        .should('have.class', 'bg-gradient-to-b')
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
      cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
    })
    it('should display the vizualisation block', () => {
      cy.get('mel-datahub-dataset-visualisation').should('be.visible')
    })

    it('should display the map preview by default', () => {
      cy.get('gn-ui-map-container').should('be.visible')
      cy.get('gn-ui-table-view').should('not.exist')
      cy.get('gn-ui-chart-view').should('not.exist')
    })

    it('should open mapstore with dataset in a new tab', () => {
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen')
      })
      cy.get('mel-datahub-external-viewer-button').find('button').click()
      cy.get('@windowOpen').should(
        'be.calledWith',
        '/mapstore/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["rectangles_200m_menage_erbm"],"sources":[{"url":"https%3A%2F%2Fwww.geo2france.fr%2Fgeoserver%2Finsee%2Fows","type":"wms"}]}]',
        '_blank'
      )
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
      cy.get('gn-ui-data-view-share').should('be.visible')
    })
  })

  describe('Information block', () => {
    beforeEach(() => {
      cy.interceptDataset('ed34db28-5dd4-480f-bf29-dc08f0086131')
      cy.visit('/dataset/ed34db28-5dd4-480f-bf29-dc08f0086131')
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
        .should('have.text', 'Donnée mise à jour le')
    })

    it('should display the categories btns', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(1)
        .find('div')
        .children('button')
        .should('have.length.gt', 0)
    })

    it('should display the territories', () => {
      cy.get('@mainInfo')
        .children('div')
        .eq(1)
        .find('div')
        .children('button')
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
        .should('have.text', 'Métropole Européenne de Lille')
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
    // This link is not used at the time
    // it('should display the detailed file link and lead to it', () => {
    //   cy.get('@mainInfo')
    //     .children('div')
    //     .eq(5)
    //     .find('a')
    //     .invoke('attr', 'href')
    //     .should('include', '/geonetwork/srv/fre/catalog.search#/metadata')
    // })

    describe('When clicking on a category tag', () => {
      it('should navigate to home page with and search query parameters should be assigned a value', () => {
        cy.get('@mainInfo')
          .children('div')
          .eq(1)
          .find('div')
          .children('button')
          .eq(0)
          .click()
        cy.url().should(
          'include',
          '/search?categoryKeyword=https:%2F%2Fdata.lillemetropole.fr%2Fthematique%2Fcategories%2Fadministration_action_publique'
        )
      })
    })

    describe('When clicking on a territory tag', () => {
      it('should navigate to home page with and search query parameters should be assigned a value', () => {
        cy.get('@mainInfo')
          .children('div')
          .eq(2)
          .find('div')
          .children('button')
          .eq(0)
          .click()
        cy.url().should(
          'include',
          '/search?territories=https:%2F%2Fdata.lillemetropole.fr%2Fplace%2FmelTerritories%231'
        )
      })
    })
  })

  describe('API block', () => {
    describe('When the link is working', () => {
      beforeEach(() =>
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      )

      it('should display the API block', () => {
        cy.get('mel-datahub-dataset-apis').should('be.visible')
      })
      it('should have API cards', () => {
        cy.get('mel-datahub-dataset-apis')
          .find('mel-datahub-carousel')
          .find('mel-datahub-api-card')
          .should('have.length.gt', 0)
      })
      it('should display the swagger link', () => {
        cy.get('mel-datahub-dataset-apis')
          .find('mel-datahub-carousel')
          .find('mel-datahub-api-card')
          .last()
          .find('button')
          .eq(1)
          .click()
        cy.window().then((win) => {
          cy.get('mel-datahub-api-form')
            .find('a')
            .invoke('attr', 'href')
            .should('eq', `${win.location.origin}/data/swagger-ui/index.html`)
        })
      })
      it('should open the api form', () => {
        cy.get('mel-datahub-dataset-apis')
          .find('mel-datahub-carousel')
          .find('mel-datahub-api-card')
          .last()
          .find('button')
          .eq(1)
          .click()
        cy.get('mel-datahub-api-form').should('be.visible')
      })
    })
  })

  describe('Downloads section', () => {
    describe('Dataset with ID 04bcec79-5b25-4b16-b635-73115f7456e4', () => {
      beforeEach(() => {
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      })
      it('should contain the correct link in download button', () => {
        cy.get('[data-cy="download-button"]')
          .first()
          .invoke('attr', 'href')
          .as('downloadLink')
        cy.get('@downloadLink').should(
          'contain',
          '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv'
        )
        cy.get('[data-cy="download-button"]')
          .first()
          .should('have.attr', 'target', '_blank')
      })
      it('should contain empty download attribute for other files than json and geojson', () => {
        cy.get('[data-cy="download-button"]')
          .first()
          .should('have.attr', 'download', '')
      })
      it('should contain download attribute with filename for json files', () => {
        cy.get('[data-cy="download-button"]')
          .eq(3)
          .should(
            'have.attr',
            'download',
            'insee:rectangles_200m_menage_erbm.json'
          )
      })
      it('should open link in new tab as fallback (if download attribute is ignored, for not same-origin)', () => {
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
    describe('Dataset with ID ed34db28-5dd4-480f-bf29-dc08f0086131', () => {
      beforeEach(() => {
        cy.visit('/dataset/accroche_velos')
      })
      it('should display the download section', () => {
        cy.get('[data-cy="download-links"]').should('be.visible')
      })
      it('should dispaly the correct number of available downloads', () => {
        cy.get('[data-cy="download-links"]')
          .find('mel-datahub-link-item')
          .should('have.length', 4)
      })
    })
  })

  describe('Related datasets section', () => {
    it('should display the related datasets section', () => {
      cy.visit('/dataset/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
      cy.get('[data-cy="related-records-section"]').should('be.visible')
      cy.get('[data-cy="related-records-section"]')
        .find('mel-datahub-results-card-last-created')
        .should('have.length.gt', 0)
    })
  })

  describe('Associated resources section', () => {
    beforeEach(() => {
      cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
    })
    it('should display the associated resources section', () => {
      cy.get('[data-cy="associated-links"]').should('be.visible')
    })
    it('should allow the user to copy the link', () => {
      cy.get('[data-cy="associated-links"]')
        .find('mel-datahub-link-item')
        .first()
        .find('mel-datahub-button')
        .first()
        .click()
      // attempt to make the whole page focused
      cy.get('body').focus()

      cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
          expect(text).to.eq(
            'https://sig.hautsdefrance.fr/ext/opendata/Referentiel/SCoT_Dictionnnaire_attributs_2023.xlsx'
          )
        })
      })
    })
    it('should allow the user to access the resource', () => {
      cy.get('[data-cy="associated-links"]')
        .find('mel-datahub-link-item')
        .first()
        .find('a')
        .first()
        .should('have.attr', 'target', '_blank')
      cy.get('[data-cy="associated-links"]')
        .find('mel-datahub-link-item')
        .first()
        .find('a')
        .first()
        .should(
          'have.attr',
          'href',
          'https://qgisserver.hautsdefrance.fr/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/data/qgis/applications/limites_admin.qgz&request=GetFeature&typename=scot_en_cours&outputformat=csv&service=WFS'
        )
    })
  })

  describe('Navigation', () => {
    describe('With a query on', () => {
      beforeEach(() => cy.visit('/search?organization=Barbie%20Inc.'))
      it('should return to the search page with the previous query on', () => {
        cy.get('mel-datahub-results-card-search').first().click()

        cy.get('mel-datahub-dataset-header')
          .find('mel-datahub-button')
          .first()
          .click()
        cy.url().should('include', '/search?organization=Barbie%20Inc.')
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
