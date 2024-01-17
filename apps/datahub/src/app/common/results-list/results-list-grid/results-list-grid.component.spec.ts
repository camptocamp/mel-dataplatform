import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsListGridComponent } from './results-list-grid.component'

describe('ResultsListGridComponent', () => {
  let component: ResultsListGridComponent
  let fixture: ComponentFixture<ResultsListGridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsListGridComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsListGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
