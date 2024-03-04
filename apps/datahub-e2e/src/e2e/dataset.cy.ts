describe('datasets', () => {
  describe('when not logged in', () => {
    beforeEach(() => cy.visit('/dataset/8698bf0b-fceb-4f0f-989b-111e7c4af0a4'))

    it('should display the favorite button disabled', () => {
      cy.get('mel-datahub-button').eq(0).find('button').as('favoriteButton')
      cy.get('@favoriteButton').should('be.disabled')
      cy.get('@favoriteButton').should(
        'have.css',
        'background-color',
        'rgb(250, 206, 210)'
      )
    })

    it('should display the title', () => {
      cy.get('.mel-page-title').should('be.visible')
      cy.get('.mel-page-title').should('have.text', ' Alpenkonvention ')
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
        .should('have.css', 'max-height', '72px')
    })

    it('should scroll down when clicking on download button', () => {
      cy.get('mel-datahub-button').eq(1).as('downloadButton')
      cy.get('@downloadButton').click()
      cy.get('@downloadButton').should(() => {
        const scrollPosition = Cypress.dom.getWindowByElement(
          cy.state('window')
        ).scrollY
        expect(scrollPosition).to.be.greaterThan(0)
      })
    })

    it('should scroll down when clicking on api button', () => {
      cy.get('mel-datahub-button').eq(2).as('apiButton')
      cy.get('@apiButton').click()
      cy.get('@apiButton').should(() => {
        const scrollPosition = Cypress.dom.getWindowByElement(
          cy.state('window')
        ).scrollY
        expect(scrollPosition).to.be.greaterThan(0)
      })
    })

    describe('Information block', () => {
      beforeEach(() => {
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
          .should('have.text', 'Bundesamt für Raumentwicklung')
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
      beforeEach(() =>
        cy.visit('/dataset/ee965118-2416-4d48-b07e-bbc696f002c2')
      )

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
})
describe('when logged in', () => {
  beforeEach(() => {
    cy.login()
    cy.clearFavorites()
    cy.visit('/dataset/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
  })
  it('should toggle the favorite button', () => {
    cy.get('mel-datahub-button').eq(0).as('favoriteButton')
    cy.get('@favoriteButton')
      .find('img')
      .should('have.attr', 'src', 'assets/icons/heart.svg')
    cy.get('@favoriteButton').click()
    cy.get('@favoriteButton')
      .find('img')
      .should('have.attr', 'src', 'assets/icons/heart-filled.svg')
  })
})
