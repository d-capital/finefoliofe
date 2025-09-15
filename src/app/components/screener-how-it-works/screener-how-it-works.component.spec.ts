import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerHowItWorksComponent } from './screener-how-it-works.component';

describe('ScreenerHowItWorksComponent', () => {
  let component: ScreenerHowItWorksComponent;
  let fixture: ComponentFixture<ScreenerHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenerHowItWorksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenerHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
