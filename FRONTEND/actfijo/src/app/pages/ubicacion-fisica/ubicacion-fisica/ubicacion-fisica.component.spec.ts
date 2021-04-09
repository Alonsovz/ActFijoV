import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionFisicaComponent } from './ubicacion-fisica.component';

describe('UbicacionFisicaComponent', () => {
  let component: UbicacionFisicaComponent;
  let fixture: ComponentFixture<UbicacionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
