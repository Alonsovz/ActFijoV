import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosactivoComponent } from './modelosactivo.component';

describe('ModelosactivoComponent', () => {
  let component: ModelosactivoComponent;
  let fixture: ComponentFixture<ModelosactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelosactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelosactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
