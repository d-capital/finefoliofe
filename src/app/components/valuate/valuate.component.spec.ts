import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuateComponent } from './valuate.component';

describe('ValuateComponent', () => {
  let component: ValuateComponent;
  let fixture: ComponentFixture<ValuateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
