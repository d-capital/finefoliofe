import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerWhyUsComponent } from './screener-why-us.component';

describe('ScreenerWhyUsComponent', () => {
  let component: ScreenerWhyUsComponent;
  let fixture: ComponentFixture<ScreenerWhyUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenerWhyUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenerWhyUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
