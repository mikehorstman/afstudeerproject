import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToetsOnderdeelModalComponent } from './toets-onderdeel-modal.component';

describe('ToetsOnderdeelModalComponent', () => {
  let component: ToetsOnderdeelModalComponent;
  let fixture: ComponentFixture<ToetsOnderdeelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToetsOnderdeelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToetsOnderdeelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
