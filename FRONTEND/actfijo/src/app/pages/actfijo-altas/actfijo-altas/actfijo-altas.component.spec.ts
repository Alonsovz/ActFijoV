import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActfijoAltasComponent } from './actfijo-altas.component';

describe('ActfijoAltasComponent', () => {
  let component: ActfijoAltasComponent;
  let fixture: ComponentFixture<ActfijoAltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActfijoAltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActfijoAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
