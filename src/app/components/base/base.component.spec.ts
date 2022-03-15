import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseComponent } from "./base.component";
import { FormService } from "../../services/form/form.service";
import { Onderdelen } from "../../models/enums.model";
import { Customization } from "../../models/style.model";
import { DataService } from "../../services/data/data.service";
import { LogoComponent } from "../rapport-onderdelen/logo/logo.component";

describe('BaseComponent', () => {
    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports     : [
                RouterTestingModule
            ],
            declarations: [
                BaseComponent,
                LogoComponent
            ],
            providers   : [FormService, DataService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should call setFormLayout() in FormService on onSelect()', () => {
        const service = fixture.debugElement.injector.get(FormService);
        spyOn(service, 'setFormLayout').and.callThrough();
        fixture.detectChanges()

        const event = new Event('click');
        component.onSelect(event, Onderdelen.rapport, []);
        fixture.detectChanges();

        expect(service.setFormLayout).toHaveBeenCalled();
    });

    it('should remove the border to an element on deselectElement() call', () => {
        let element = document.createElement('div')
        element.id = 'newDiv';
        element.style.border = 'dashed 1px #000000';

        spyOn(document, 'getElementById').and.returnValue(element);

        component.deselectElement(element.id);
        fixture.detectChanges();

        expect(element.style.border).toEqual('none')
    });

    it('setAlignment() should change the position of an element', () => {
        let element = document.createElement('div')
        element.id = 'newDiv';
        element.style.top = '20px';

        spyOn(document, 'getElementById').and.returnValue(element);
        component.styling = [{ key: Customization.alignment, value: 'top', elementId: 'body' }];

        fixture.detectChanges();

        component.setAlignment(element.id);
        fixture.detectChanges();

        expect(element.style.top).toEqual('0px')
    });

    it('removeComponent() should remove an onderdeel from the rapport', () => {
        const service = fixture.debugElement.injector.get(DataService);
        let logo = TestBed.createComponent(LogoComponent);
        fixture.detectChanges();
        service.components.push(logo.componentRef);
        fixture.detectChanges();
        expect(service.components.length).toEqual(1);

        component.removeComponent(logo.componentInstance.uuid);
        fixture.detectChanges();

        expect(service.components.length).toEqual(0);
    });
});
