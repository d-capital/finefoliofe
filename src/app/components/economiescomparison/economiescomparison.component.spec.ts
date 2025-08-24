import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiescomparisonComponent } from './economiescomparison.component';

describe('EconomiescomparisonComponent', () => {
  let component: EconomiescomparisonComponent;
  let fixture: ComponentFixture<EconomiescomparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomiescomparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomiescomparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
