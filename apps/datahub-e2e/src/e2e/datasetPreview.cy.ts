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
    beforeEach(() => {
      cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      cy.get('mel-datahub-dataset-visualisation').as('previewSection')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(0)
        .as('mapTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(1)
        .as('tableTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(2)
        .as('chartTab')
    })
    it('should NOT show the config saving btn when logged out', () => {
      cy.get('[data-cy="save-dataviz-config-btn"]').should('not.exist')
    })
    describe('Logged in as admin', () => {
      beforeEach(() => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      })
      it('should show the config saving btn', () => {
        cy.get('[data-cy="save-dataviz-config-btn"]').should(
          'have.text',
          " Définir l'aperçu par défaut "
        )
      })
      it('should save and use a map config', () => {
        cy.get('@mapTab').click()
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('@mapTab').invoke('attr', 'aria-selected').should('eq', 'true')
      })
      // FIXME: skip for now, as test is not reliable
      it.skip('should save and use a table config', () => {
        cy.get('@tableTab').click()
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        // make sure to wait for second loading of datavizConfig (2x cy.visit)
        waitForDatavizConfigToBeLoaded()
        waitForDatavizConfigToBeLoaded()
        cy.get('@tableTab').invoke('attr', 'aria-selected').should('eq', 'true')
      })
      // FIXME: skip for now, as test is not reliable
      it.skip('should save and use a chart config', () => {
        cy.get('@chartTab').click()
        cy.get('[data-cy="save-dataviz-config-btn"]').click()
        waitForDatavizConfigToBeSaved()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        // make sure to wait for second loading of datavizConfig (2x cy.visit)
        waitForDatavizConfigToBeLoaded()
        waitForDatavizConfigToBeLoaded()
        cy.get('@chartTab').invoke('attr', 'aria-selected').should('eq', 'true')
      })
    })
  })
})
