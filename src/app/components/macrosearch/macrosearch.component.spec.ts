import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosearchComponent } from './macrosearch.component';

describe('MacrosearchComponent', () => {
  let component: MacrosearchComponent;
  let fixture: ComponentFixture<MacrosearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacrosearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacrosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
