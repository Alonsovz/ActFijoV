import { TestBed } from '@angular/core/testing';

import { UbicacionFisicaService } from './ubicacion-fisica.service';

describe('UbicacionFisicaService', () => {
  let service: UbicacionFisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionFisicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
