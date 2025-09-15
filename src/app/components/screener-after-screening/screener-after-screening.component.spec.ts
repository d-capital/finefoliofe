import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerAfterScreeningComponent } from './screener-after-screening.component';

describe('ScreenerAfterScreeningComponent', () => {
  let component: ScreenerAfterScreeningComponent;
  let fixture: ComponentFixture<ScreenerAfterScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenerAfterScreeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenerAfterScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
