import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsCardLastCreatedComponent } from './results-card-last-created.component'

describe('ResultsCardLastCreatedComponent', () => {
  let component: ResultsCardLastCreatedComponent
  let fixture: ComponentFixture<ResultsCardLastCreatedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsCardLastCreatedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsCardLastCreatedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
