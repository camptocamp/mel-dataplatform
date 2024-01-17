import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsListCarouselComponent } from './results-list-carousel.component'

describe('ResultsListCarouselComponent', () => {
  let component: ResultsListCarouselComponent
  let fixture: ComponentFixture<ResultsListCarouselComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsListCarouselComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsListCarouselComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
