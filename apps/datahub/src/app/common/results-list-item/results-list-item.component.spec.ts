import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsListItemComponent } from './results-list-item.component';

describe('ResultsListItemComponent', () => {
  let component: ResultsListItemComponent;
  let fixture: ComponentFixture<ResultsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
