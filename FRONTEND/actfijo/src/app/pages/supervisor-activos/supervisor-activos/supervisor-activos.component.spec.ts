import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorActivosComponent } from './supervisor-activos.component';

describe('SupervisorActivosComponent', () => {
  let component: SupervisorActivosComponent;
  let fixture: ComponentFixture<SupervisorActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
