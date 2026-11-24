import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { SectorPeg, SectorPegService } from '../../services/sector-peg.service';
import { SectorPegComponent } from './sector-peg.component';

describe('SectorPegComponent', () => {
  let fixture: ComponentFixture<SectorPegComponent>;
  let component: SectorPegComponent;
  let language: string;
  let getSectorPeg: jasmine.Spy;

  const rows: SectorPeg[] = [
    { market: 'US', language: 'en', sector: 'Technology Services', averagePeg: 1.5 },
    { market: 'MOEX', language: 'en', sector: 'Energy', averagePeg: 2 },
    { market: 'MOEX', language: 'ru', sector: 'Энергетика', averagePeg: 3 },
    { market: 'US', language: 'es', sector: 'Servicios tecnológicos', averagePeg: 1.8 }
  ];

  beforeEach(async () => {
    language = 'en';
    getSectorPeg = jasmine.createSpy().and.returnValue(of(rows));

    await TestBed.configureTestingModule({
      imports: [SectorPegComponent],
      providers: [
        { provide: SectorPegService, useValue: { getSectorPeg } },
        { provide: BrowserStorageService, useValue: { getItem: () => language } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SectorPegComponent);
    component = fixture.componentInstance;
  });

  it('defaults to US for English and displays only English sectors', () => {
    fixture.detectChanges();

    expect(getSectorPeg).toHaveBeenCalledWith('US');
    expect(component.sectors.map(sector => sector.sector)).toEqual(['Technology Services']);
  });

  it('defaults to MOEX and displays Russian sectors for Russian language', () => {
    language = 'ru';
    fixture.detectChanges();

    expect(getSectorPeg).toHaveBeenCalledWith('MOEX');
    expect(component.sectors.map(sector => sector.sector)).toEqual(['Энергетика']);
  });

  it('displays English sectors when Russian users select the US market', () => {
    language = 'ru';
    fixture.detectChanges();
    component.onMarketChange({
      target: { value: 'US' }
    } as unknown as Event);

    expect(getSectorPeg).toHaveBeenCalledWith('US');
    expect(component.sectors.map(sector => sector.sector)).toEqual(['Technology Services']);
  });

  it('defaults to US and displays English sectors for Spanish language', () => {
    language = 'es';
    fixture.detectChanges();

    expect(getSectorPeg).toHaveBeenCalledWith('US');
    expect(component.sectors.map(sector => sector.sector)).toEqual(['Technology Services']);
  });
});
