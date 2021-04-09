import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionEspecificaComponent } from './ubicacion-especifica.component';

describe('UbicacionEspecificaComponent', () => {
  let component: UbicacionEspecificaComponent;
  let fixture: ComponentFixture<UbicacionEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionEspecificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
