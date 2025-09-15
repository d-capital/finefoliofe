import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerResultsComponent } from './screener-results.component';

describe('ScreenerResultsComponent', () => {
  let component: ScreenerResultsComponent;
  let fixture: ComponentFixture<ScreenerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenerResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
