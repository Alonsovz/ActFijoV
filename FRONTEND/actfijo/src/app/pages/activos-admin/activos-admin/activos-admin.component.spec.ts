import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosAdminComponent } from './activos-admin.component';

describe('ActivosAdminComponent', () => {
  let component: ActivosAdminComponent;
  let fixture: ComponentFixture<ActivosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
