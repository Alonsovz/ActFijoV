import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActfijoGestionComponent } from './actfijo-gestion.component';

describe('ActfijoGestionComponent', () => {
  let component: ActfijoGestionComponent;
  let fixture: ComponentFixture<ActfijoGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActfijoGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActfijoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
