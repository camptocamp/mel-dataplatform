import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsCardSearchComponent } from './results-card-search.component'

describe('ResultsCardSearchComponent', () => {
  let component: ResultsCardSearchComponent
  let fixture: ComponentFixture<ResultsCardSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsCardSearchComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsCardSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
