import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnderdelenMenuComponent } from './onderdelen-menu.component';
import { DataService } from "../../../services/data/data.service";
import { findElementById } from "../../../../testing";
import { Onderdelen } from "../../../models/enums.model";
import { Onderdeel } from "../../../models/onderdeel.model";
import { FormService } from "../../../services/form/form.service";

describe('OnderdelenMenuComponent', () => {
    let component: OnderdelenMenuComponent;
    let fixture: ComponentFixture<OnderdelenMenuComponent>;

    let logoItem: HTMLElement;
    let grafiekItem: HTMLElement;
    let handtekeningItem: HTMLElement;
    let legendaItem: HTMLElement;
    let definitieItem: HTMLElement;
    let opmerkingItem: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OnderdelenMenuComponent],
            providers   : [FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnderdelenMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        logoItem = findElementById(fixture, '#logo-item');
        grafiekItem = findElementById(fixture, '#grafiek-item');
        handtekeningItem = findElementById(fixture, '#handtekening-item');
        legendaItem = findElementById(fixture, '#legenda-item');
        definitieItem = findElementById(fixture, '#definitie-item');
        opmerkingItem = findElementById(fixture, '#opmerking-item');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select an onderdeel on click()', () => {
        const legenda: Onderdeel = { title: 'Legenda', id: Onderdelen.legenda };
        const onderdeel = findElementById(fixture, '#Legenda-item');
        onderdeel.click();

        fixture.detectChanges();

        expect(component.selectedOnderdeel).toEqual(legenda);
    });

    it('should add an onderdeel to the RapportComponent on addSelectedOnderdeel() call', () => {
        const service = fixture.debugElement.injector.get(DataService);
        spyOn(service, 'addNewOnderdeel').and.callThrough();
        fixture.detectChanges()

        component.selectedOnderdeel = { title: 'Logo', id: Onderdelen.logo };
        component.addSelectedOnderdeel();

        fixture.detectChanges();

        expect(service.addNewOnderdeel).toHaveBeenCalled();
    });

    it('should show all the onderdelen in the menu', () => {
        const onderdelen = [
            { title: 'grafiek', id: Onderdelen.grafiek },
            { title: 'logo', id: Onderdelen.grafiek },
            { title: 'handtekening', id: Onderdelen.grafiek }
        ];

        component.onderdelen = onderdelen;
        fixture.detectChanges();

        onderdelen.forEach(onderdeel => {
            let item = findElementById(fixture, '#' + onderdeel.title + '-item');
            expect(item).toBeTruthy()
        })
    });
});
