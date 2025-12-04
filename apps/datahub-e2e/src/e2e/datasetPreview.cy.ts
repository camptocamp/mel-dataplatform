beforeEach(() => {
  // GEOSERVER stubs
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?SERVICE=WMS&REQUEST=GetCapabilities',
    {
      fixture: 'insee-wms-getcapabilities.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetCapabilities',
    {
      fixture: 'insee-wfs-getcapabilities.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&RESULTTYPE=hits&COUNT=1',
    {
      fixture: 'insee-wfs-table-hits.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
  //Note: The real WFS of this example responds with an error to this request due to a missing primary key in the table
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&STARTINDEX=10',
    {
      fixture: 'insee-wfs-table-data-page2.json',
    }
  )
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&SORTBY=idk+D',
    {
      fixture: 'insee-wfs-table-data-sort-idk.json',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=rectangles_200m_menage_erbm*',
    {
      fixture: 'insee-rectangles_200m_menage_erbm.png',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv',
    {
      fixture: 'insee-rectangles_200m_menage_erbm.csv',
    }
  )
  cy.intercept(
    'GET',
    '/geonetwork/srv/api/records/04bcec79-5b25-4b16-b635-73115f7456e4/attachments/datavizConfig.json'
  ).as('getDatavizConfig')
  cy.intercept(
    'GET',
    '/geonetwork/srv/api/records/04bcec79-5b25-4b16-b635-73115f7456e4/attachments'
  ).as('getAttachments')
  cy.intercept(
    'POST',
    '/geonetwork/srv/api/records/04bcec79-5b25-4b16-b635-73115f7456e4/attachments?visibility=public'
  ).as('postAttachment')
})
function waitForDatavizConfigToBeLoaded() {
  cy.wait('@getDatavizConfig')
  cy.wait('@getAttachments')
}
function waitForDatavizConfigToBeSaved() {
  cy.wait('@postAttachment')
}

describe('Dataset preview section', () => {
  describe('Vizualisation block display', () => {
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

  describe('Dataviz configuration', () => {
    it('should NOT show the config saving btn when logged out', () => {
      cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      cy.get('[data-cy="save-dataviz-config-btn"]').should('not.exist')
    })
    describe('Logged in as admin', () => {
      before(() => {
        cy.login()
        cy.deleteAttachment(
          '04bcec79-5b25-4b16-b635-73115f7456e4',
          'datavizConfig.json'
        )
      })
      after(() => {
        cy.login()
        cy.deleteAttachment(
          '04bcec79-5b25-4b16-b635-73115f7456e4',
          'datavizConfig.json'
        )
      })
      it('should show the config saving btn', () => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('mel-datahub-dataset-visualisation').should('be.visible')
        cy.get('[data-cy="save-dataviz-config-btn"]').should(
          'have.text',
          " Définir l'aperçu par défaut "
        )
      })
      it('should save and use a map config', () => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('mel-datahub-dataset-visualisation').should('be.visible')
        // note: this test does not wait for dataviz config like below as none exists yet
        // however waiting in tests below is important so lately arriving config does not interfere with new config setting
        // to avoid issues, make sure no datavizConfig exists for the dataset before running the tests (cf. before, after)
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(0)
          .click()
        cy.get('mel-datahub-dataset-visualisation')
          .find('mel-datahub-map-view')
          .should('be.visible')
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        waitForDatavizConfigToBeLoaded()
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(0)
          .invoke('attr', 'aria-selected')
          .should('eq', 'true')
      })
      it('should save and use a table config', () => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('mel-datahub-dataset-visualisation').should('be.visible')
        // wait for dataviz config created in map test above
        waitForDatavizConfigToBeLoaded()
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .click()
        cy.get('mel-datahub-dataset-visualisation')
          .find('gn-ui-table-view')
          .should('be.visible')
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        waitForDatavizConfigToBeLoaded()
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .invoke('attr', 'aria-selected')
          .should('eq', 'true')
      })
      it('should save and use a chart config', () => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('mel-datahub-dataset-visualisation').should('be.visible')
        // wait for dataviz config created in table test above
        waitForDatavizConfigToBeLoaded()
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(2)
          .click()
        cy.get('mel-datahub-dataset-visualisation')
          .find('gn-ui-chart-view')
          .find('gn-ui-dropdown-selector')
          .filter(':visible')
          .as('drop')
        cy.get('mel-datahub-dataset-visualisation')
          .find('gn-ui-chart-view')
          .should('be.visible')
        cy.get('@drop').should('have.length', 4)
        cy.get('@drop').eq(0).selectDropdownOption('pie')
        cy.get('@drop').eq(2).selectDropdownOption('men')
        cy.get('@drop').eq(3).selectDropdownOption('average')
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        waitForDatavizConfigToBeLoaded()
        cy.get('mel-datahub-dataset-visualisation')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(2)
          .invoke('attr', 'aria-selected')
          .should('eq', 'true')
        cy.get('mel-datahub-dataset-visualisation')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-type')
          .should('include', 'pie')
        cy.get('mel-datahub-dataset-visualisation')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-value-property')
          .should('include', 'average(men)')
      })
    })
  })
})
