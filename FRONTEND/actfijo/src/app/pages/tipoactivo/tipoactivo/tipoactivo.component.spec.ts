import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoactivoComponent } from './tipoactivo.component';

describe('TipoactivoComponent', () => {
  let component: TipoactivoComponent;
  let fixture: ComponentFixture<TipoactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
