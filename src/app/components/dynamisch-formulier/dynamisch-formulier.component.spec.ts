import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamischFormulierComponent } from './dynamic-form.component';
import { findElementsByClass } from "../../../testing";
import { InputButton, InputDropdown } from "../../models/input.model";
import { Customization } from "../../models/style.model";

describe('DynamicFormComponent', () => {
    let component: DynamischFormulierComponent;
    let fixture: ComponentFixture<DynamischFormulierComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DynamischFormulierComponent]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamischFormulierComponent);
        component = fixture.componentInstance;

        component.inputField = { key: 'padding', customization: Customization.padding, label: 'Padding', controlType: 'textbox', options: [], disabled: false };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the right label', () => {
        let label = findElementsByClass(fixture, '.label')[0].nativeElement;
        expect(label.textContent).toBe('Padding');
    });

    it('should emit on input', () => {
        spyOn(component.dataChanged, "emit");
        let input = findElementsByClass(fixture, '.textbox')[0].nativeElement;

        input.value = 12;

        input.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(input.value).toBe('12');
        expect(component.dataChanged.emit).toHaveBeenCalled();
    });

    it('should emit on select', () => {
        component.inputField = new InputDropdown();
        fixture.detectChanges();
        spyOn(component.dataChanged, "emit");
        let select = findElementsByClass(fixture, '.dropdown')[0].nativeElement;

        select.value = 2;

        select.dispatchEvent(new Event('selectionChange'));
        fixture.detectChanges();
        expect(select.value).toBe(2);
        expect(component.dataChanged.emit).toHaveBeenCalled();
    });

    it('should emit on click', () => {
        component.inputField = new InputButton();
        component.inputField.options = [{ key: 1, value: 'top' }]
        fixture.detectChanges();
        spyOn(component.dataChanged, "emit");

        let button = findElementsByClass(fixture, '.button')[0].nativeElement;
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.dataChanged.emit).toHaveBeenCalled();
    });

    it('should show the right inputfield based on #inputfield.controlType', () => {
        let textInput = findElementsByClass(fixture, '.textbox')[0];
        let numberInput = findElementsByClass(fixture, '.number')[0];
        expect(textInput).toBeDefined();
        expect(numberInput).not.toBeDefined()

        component.inputField.controlType = 'number';

        fixture.detectChanges();

        textInput = findElementsByClass(fixture, '.textbox')[0];
        numberInput = findElementsByClass(fixture, '.number')[0];

        expect(textInput).not.toBeDefined();
        expect(numberInput).toBeDefined()
    });
});
