import { TestBed } from '@angular/core/testing';

import { UbicacionEspecificaService } from './ubicacion-especifica.service';

describe('UbicacionEspecificaService', () => {
  let service: UbicacionEspecificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionEspecificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
