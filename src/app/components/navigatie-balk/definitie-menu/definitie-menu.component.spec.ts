import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinitieMenuComponent } from './definitie-menu.component';
import { FormService } from "../../../services/form/form.service";
import { findElementsByClass } from "../../../../testing";
import { DataService } from "../../../services/data/data.service";

describe('DefinitieFormComponent', () => {
    let component: DefinitieMenuComponent;
    let fixture: ComponentFixture<DefinitieMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefinitieMenuComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefinitieMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get a form-layout from the FormService', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.definitieForm.length).toBeGreaterThan(0)
    });

    it('should show the right amount of input fields', () => {
        component.ngOnInit();
        fixture.detectChanges();

        let bodies = findElementsByClass(fixture, '.body');

        expect(bodies.length).toEqual(5);
    });
});
