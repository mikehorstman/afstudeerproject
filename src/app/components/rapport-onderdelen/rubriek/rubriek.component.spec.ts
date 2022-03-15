import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriekComponent } from './rubriek.component';
import { FormService } from "../../../services/form/form.service";

describe('RubriekComponent', () => {
    let component: RubriekComponent;
    let fixture: ComponentFixture<RubriekComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RubriekComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RubriekComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
