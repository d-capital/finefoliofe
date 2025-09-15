import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerHeroComponent } from './screener-hero.component';

describe('ScreenerHeroComponent', () => {
  let component: ScreenerHeroComponent;
  let fixture: ComponentFixture<ScreenerHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenerHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenerHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
