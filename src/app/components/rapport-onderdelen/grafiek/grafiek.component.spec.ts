import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { GrafiekComponent } from './grafiek.component';
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { Customization } from "../../../models/style.model";

describe('GrafiekComponent', () => {
    let component: GrafiekComponent;
    let fixture: ComponentFixture<GrafiekComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GrafiekComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrafiekComponent);
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

    it('should update the graph series when the styling is changed', inject([StyleService], (styleService: StyleService) => {
        spyOn(component.chart, 'updateSeries');

        const style = { key: Customization.padding, value: '20', elementId: 'body' }

        styleService.setStyling(component.styling, component.uuid);
        styleService.updateStyling(style);
        fixture.detectChanges();

        expect(component.chart.updateSeries).toHaveBeenCalled();
    }));
});
