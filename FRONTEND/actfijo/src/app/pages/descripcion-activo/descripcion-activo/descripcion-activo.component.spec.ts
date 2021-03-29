import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionActivoComponent } from './descripcion-activo.component';

describe('DescripcionActivoComponent', () => {
  let component: DescripcionActivoComponent;
  let fixture: ComponentFixture<DescripcionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
