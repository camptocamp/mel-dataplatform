import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCardFavoriteComponent } from './results-card-favorite.component';

describe('ResultsCardFavoriteComponent', () => {
  let component: ResultsCardFavoriteComponent;
  let fixture: ComponentFixture<ResultsCardFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsCardFavoriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsCardFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
