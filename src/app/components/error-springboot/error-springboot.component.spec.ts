import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSpringbootComponent } from './error-springboot.component';

describe('ErrorSpringbootComponent', () => {
  let component: ErrorSpringbootComponent;
  let fixture: ComponentFixture<ErrorSpringbootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSpringbootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSpringbootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
