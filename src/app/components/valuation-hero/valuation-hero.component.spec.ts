import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationHeroComponent } from './valuation-hero.component';

describe('ValuationHeroComponent', () => {
  let component: ValuationHeroComponent;
  let fixture: ComponentFixture<ValuationHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuationHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuationHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
