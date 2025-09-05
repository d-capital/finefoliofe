import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairValueComponent } from './fair-value.component';

describe('FairValueComponent', () => {
  let component: FairValueComponent;
  let fixture: ComponentFixture<FairValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
