import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasactivoComponent } from './marcasactivo.component';

describe('MarcasactivoComponent', () => {
  let component: MarcasactivoComponent;
  let fixture: ComponentFixture<MarcasactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcasactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
