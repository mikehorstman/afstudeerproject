import { TestBed } from '@angular/core/testing';
import { Customization } from "../../models/style.model";

import { StyleService } from './style.service';

describe('StyleService', () => {
    let service: StyleService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StyleService);
    });

    it('updateStyling() should update the styling', () => {
        service.styling = [{key: Customization.padding, value: '10', elementId: 'header'}];

        const style = { key: Customization.padding, value: '20', elementId: 'header'};
        service.updateStyling(style);

        expect(service.styling).toEqual([style])
    });
});
