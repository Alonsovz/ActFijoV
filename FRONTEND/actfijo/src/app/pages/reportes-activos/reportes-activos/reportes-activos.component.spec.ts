import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesActivosComponent } from './reportes-activos.component';

describe('ReportesActivosComponent', () => {
  let component: ReportesActivosComponent;
  let fixture: ComponentFixture<ReportesActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
