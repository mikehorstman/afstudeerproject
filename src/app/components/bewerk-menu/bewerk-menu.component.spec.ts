import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { BewerkMenuComponent } from './bewerk-menu.component';
import { findElementByCSS, findElementById, findElementsByClass } from "../../../testing";
import { FormService } from "../../services/form/form.service";
import { InputCategory, InputNumber } from "../../models/input.model";
import { StyleService } from "../../services/style/style.service";
import { Customization } from "../../models/style.model";
import { BehaviorSubject } from "rxjs";

describe('EditMenuComponent', () => {
    let component: BewerkMenuComponent;
    let fixture: ComponentFixture<BewerkMenuComponent>;

    let mockFormService: FormService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BewerkMenuComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BewerkMenuComponent);
        component = fixture.componentInstance;
        mockFormService = TestBed.inject(FormService)
        spyOn(mockFormService, 'getCurrentFormLayout').and.returnValue(new BehaviorSubject(getMockLayout()).asObservable())
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Update styling', () => {
        it('should update #styling when the styling is changed ', inject([StyleService], (styleService: StyleService) => {
            const style = { key: Customization.padding, value: '20', elementId: 'body' };
            styleService.setStyling([{ key: Customization.padding, value: '10', elementId: 'body' }], component.uuid)
            styleService.updateStyling(style);
            fixture.detectChanges();

            expect(component.styling).toEqual([style])
        }));

        it('should show a title', () => {
            component.styling = [{ key: Customization.padding, value: '20', elementId: 'body' }]
            component.layout = getMockLayout();
            fixture.detectChanges();

            let title = findElementById(fixture, '#title');
            fixture.detectChanges();

            expect(title.textContent).toEqual(component.layout[0].title);
        });

        it('should show the right amount of input fields', () => {
            component.styling = [{ key: Customization.padding, value: '20', elementId: 'body' }]
            component.layout = getMockLayout();
            fixture.detectChanges();

            let headers = findElementsByClass(fixture, '.header');
            let bodies = findElementsByClass(fixture, '.body');
            let totalBodyCount = 0;

            expect(headers.length).toEqual(component.layout.length);

            component.layout.forEach((category: { options: string|any[]; }) => {
                totalBodyCount += category.options.length;
            })
            expect(bodies.length).toEqual(totalBodyCount);
        });
    });
});

function getMockLayout() {
    return [
        new InputCategory('Padding', 'body', '1fr', [
            new InputNumber({
                key          : 'padding',
                customization: Customization.padding,
                label        : 'Padding',
            }),
        ]),
    ]
}
