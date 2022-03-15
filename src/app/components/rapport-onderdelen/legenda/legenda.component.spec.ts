import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { LegendaComponent } from './legenda.component';
import { DataService } from "../../../services/data/data.service";
import { StyleService } from "../../../services/style/style.service";
import { FormService } from "../../../services/form/form.service";
import { Customization } from "../../../models/style.model";
import { findElementByCSS, findElementById } from "../../../../testing";
import { DisplayOptions } from "../../../models/enums.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

describe('LegendaComponent', () => {
    let component: LegendaComponent;
    let fixture: ComponentFixture<LegendaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LegendaComponent, RapportOnderdeelComponent],
            providers   : [DataService, StyleService, FormService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call appendStyling() when the styling is changed', inject([StyleService], (styleService: StyleService) => {
        spyOn(component, 'appendStyling');

        const style = { key: Customization.padding, value: '20', elementId: 'body' }
        styleService.updateStyling(style);
        fixture.detectChanges();

        expect(component.appendStyling).toHaveBeenCalled();
    }));

    it('should set the currenWeergave when the definitie is changed', inject([DataService], (dataService: DataService) => {
        dataService.updateDefinitie({ schooljaar: '', leerjaar: '', bodemcijfer: '', standaardWeergave: 'bolletjes', berekeningGemiddelde: '' });
        fixture.detectChanges();

        expect(component.currentWeergave!.naam).toEqual('bolletjes')
    }));

    it('should show the right legenda based on currentWeergave', inject([DataService], (dataService: DataService) => {
        dataService.updateDefinitie({ schooljaar: '', leerjaar: '', bodemcijfer: '', standaardWeergave: 'bolletjes', berekeningGemiddelde: '' });
        fixture.detectChanges();

        expect(component.currentWeergave!.naam).toEqual('bolletjes')

        let element = findElementById(fixture, '#bolletjes');
        expect(element).toBeTruthy();

    }));
});
