import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportOnderdeelComponent } from './rapport-onderdeel.component';

describe('RapportOnderdeelComponent', () => {
  let component: RapportOnderdeelComponent;
  let fixture: ComponentFixture<RapportOnderdeelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportOnderdeelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportOnderdeelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
