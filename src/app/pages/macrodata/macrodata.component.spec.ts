import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrodataComponent } from './macrodata.component';

describe('MacrodataComponent', () => {
  let component: MacrodataComponent;
  let fixture: ComponentFixture<MacrodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacrodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacrodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
