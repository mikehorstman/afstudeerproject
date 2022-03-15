import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultatenWeergaveComponent } from "./resultaten-weergave.component";

describe('WeergaveComponent', () => {
  let component: ResultatenWeergaveComponent;
  let fixture: ComponentFixture<ResultatenWeergaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatenWeergaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatenWeergaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
