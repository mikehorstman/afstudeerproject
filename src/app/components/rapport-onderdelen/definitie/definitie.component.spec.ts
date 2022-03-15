import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { DefinitieComponent } from './definitie.component';
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { Customization } from "../../../models/style.model";
import { findElementsByClass } from "../../../../testing";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

describe('DefinitieComponent', () => {
    let component: DefinitieComponent;
    let fixture: ComponentFixture<DefinitieComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefinitieComponent, RapportOnderdeelComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefinitieComponent);
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

    it('isVisible() returns if the element should be visible', () => {
        component.styling = [{ key: Customization.show, value: '{"naam": true, "schooljaar":false, "leerjaar":true}', elementId: 'rapport-page' }];

        expect(component.isVisible('naam')).toEqual(true);
        expect(component.isVisible('schooljaar')).toEqual(false);
        expect(component.isVisible('leerjaar')).toEqual(true);
    });

    it('it only shows the elements which should be visible', () => {
        component.styling = [{ key: Customization.show, value: '{"naam": true, "schooljaar":false, "leerjaar":true}', elementId: 'rapport-page' }];
        fixture.detectChanges()

        let naamLabel = findElementsByClass(fixture, '.name-label');
        let leerjaarLabel = findElementsByClass(fixture, '.leerjaar-label');
        let schooljaarLabel = findElementsByClass(fixture, '.schooljaar-label');

        expect(naamLabel[0]).toBeTruthy();
        expect(leerjaarLabel[0]).toBeTruthy();
        expect(schooljaarLabel[0]).toBeUndefined();
    });
});
