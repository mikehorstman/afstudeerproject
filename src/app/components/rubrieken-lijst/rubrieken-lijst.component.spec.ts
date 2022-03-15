import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriekenLijstComponent } from './rubrieken-lijst.component';

describe('RubriekListComponent', () => {
  let component: RubriekenLijstComponent;
  let fixture: ComponentFixture<RubriekenLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubriekenLijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriekenLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
