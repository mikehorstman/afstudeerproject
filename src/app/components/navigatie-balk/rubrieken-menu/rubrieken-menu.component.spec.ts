import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriekenMenuComponent } from './rubrieken-menu.component';

describe('RubriekenMenuComponent', () => {
  let component: RubriekenMenuComponent;
  let fixture: ComponentFixture<RubriekenMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubriekenMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriekenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
