import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBienVnrComponent } from './tipo-bien-vnr.component';

describe('TipoBienVnrComponent', () => {
  let component: TipoBienVnrComponent;
  let fixture: ComponentFixture<TipoBienVnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoBienVnrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBienVnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
