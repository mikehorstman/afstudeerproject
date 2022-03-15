import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxInputComponent } from './checkbox-input.component';
import { FormBuilder } from "@angular/forms";

describe('CheckboxInputComponent', () => {
    let component: CheckboxInputComponent;
    let fixture: ComponentFixture<CheckboxInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckboxInputComponent],
            providers   : [FormBuilder]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
