import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionAgdComponent } from './clasificacion-agd.component';

describe('ClasificacionAgdComponent', () => {
  let component: ClasificacionAgdComponent;
  let fixture: ComponentFixture<ClasificacionAgdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificacionAgdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionAgdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
