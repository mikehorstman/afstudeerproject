import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { HandtekeningComponent } from './handtekening.component';
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { Customization } from "../../../models/style.model";
import { findElementById } from "../../../../testing";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

describe('SignatureComponent', () => {
  let component: HandtekeningComponent;
  let fixture: ComponentFixture<HandtekeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandtekeningComponent, RapportOnderdeelComponent ],
      providers: [FormService, StyleService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandtekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appendStyling() when the styling is changed ', inject([StyleService], (styleService: StyleService) => {
    spyOn(component, 'appendStyling');

    const style = { key: Customization.padding, value: '20', elementId: 'body' }
    styleService.updateStyling(style);
    fixture.detectChanges();

    expect(component.appendStyling).toHaveBeenCalled();
  }));

  it('should show the right label', inject([StyleService], (styleService: StyleService) => {
    component.styling = [{ key: Customization.text, value: 'Handtekening', elementId: 'header' }];
    fixture.detectChanges()

    let title = findElementById(fixture, '#signature-label');
    expect(title.innerText).toEqual('Handtekening')
  }));
});
