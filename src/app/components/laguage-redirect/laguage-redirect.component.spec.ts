import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaguageRedirectComponent } from './laguage-redirect.component';

describe('LaguageRedirectComponent', () => {
  let component: LaguageRedirectComponent;
  let fixture: ComponentFixture<LaguageRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaguageRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaguageRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
