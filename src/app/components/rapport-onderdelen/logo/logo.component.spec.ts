import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { Customization } from "../../../models/style.model";

describe('LogoComponent', () => {
    let component: LogoComponent;
    let fixture: ComponentFixture<LogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogoComponent],
            providers   : [StyleService, FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent);
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
});
