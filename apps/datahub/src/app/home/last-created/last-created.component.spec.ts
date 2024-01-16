import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LastCreatedComponent } from './last-created.component'

describe('LastCreatedComponent', () => {
  let component: LastCreatedComponent
  let fixture: ComponentFixture<LastCreatedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCreatedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LastCreatedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
