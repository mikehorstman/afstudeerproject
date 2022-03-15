import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { OpmerkingComponent } from './opmerking.component';
import { StyleService } from "../../../services/style/style.service";
import { Customization } from "../../../models/style.model";
import { FormService } from "../../../services/form/form.service";
import { findElementById } from "../../../../testing";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

describe('OpmerkingComponent', () => {
    let component: OpmerkingComponent;
    let fixture: ComponentFixture<OpmerkingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpmerkingComponent, RapportOnderdeelComponent],
            providers   : [StyleService, FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpmerkingComponent);
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

    it('should show the right title', inject([StyleService], (styleService: StyleService) => {
        const styling = [
            { key: Customization.text, value: 'Opmerking', elementId: 'header' },
            { key: Customization.text, value: 'Opmerking', elementId: 'body' }
        ]
        component.styling = styling;

        fixture.detectChanges()

        let title = findElementById(fixture, '#opmerking-title');
        expect(title.innerText).toEqual('Opmerking')
    }));
});
