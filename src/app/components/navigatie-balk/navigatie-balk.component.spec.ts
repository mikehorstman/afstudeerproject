import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigatieBalkComponent } from './navigatie-balk.component';
import { findElementById } from "../../../testing";
import { FormService } from "../../services/form/form.service";
import { DataService } from "../../services/data/data.service";


describe('SidebarComponent', () => {
    let component: NavigatieBalkComponent;
    let fixture: ComponentFixture<NavigatieBalkComponent>;

    let logo: HTMLElement;
    let definitieTab: HTMLElement;
    let onderdeelTab: HTMLElement;
    let rubriekTab: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavigatieBalkComponent],
            providers   : [FormService, DataService],
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigatieBalkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        logo = findElementById(fixture, '#logo');
        definitieTab = findElementById(fixture, '#definitie');
        onderdeelTab = findElementById(fixture, '#onderdeel');
        rubriekTab = findElementById(fixture, '#rubriek');

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Navigation menu', () => {
        it('should show logo', () => {
            expect(logo).toBeTruthy();
        });

        it('should show rapportdefinitie button', () => {
            expect(definitieTab).toBeTruthy();
        });

        it('should show rapportonderdeel button', () => {
            expect(onderdeelTab).toBeTruthy();
        });

        it('should show rapportrubriek button', () => {
            expect(rubriekTab).toBeTruthy();
        });

        it('should call switchTab() on button click', waitForAsync(() => {
            spyOn(component, 'switchTab');
            onderdeelTab.click();
            fixture.detectChanges();
            expect(component.switchTab).toHaveBeenCalled();
        }));

        it('#switchTab() should change #currentTab', () => {
            expect(component.currentTab.item).toBe('definitie');
            component.switchTab({ item: 'onderdeel', title: 'Rapportonderdelen' });
            fixture.detectChanges();
            expect(component.currentTab.item).toBe('onderdeel');
        });

        it('should show different content based on the currentTab', () => {
            component.currentTab = component.tabs[1];
            fixture.detectChanges();

            let definitieForm = findElementById(fixture, '#definitie-form');
            let onderdelenMenu = findElementById(fixture, '#onderdelen-menu');
            let rubriekenMenu = findElementById(fixture, '#rubrieken-menu');

            expect(definitieForm).toBeNull();
            expect(onderdelenMenu).not.toBeNull();
            expect(rubriekenMenu).toBeNull();
        });

        it('should show an add button', () => {
            component.currentTab = component.tabs[1];
            fixture.detectChanges();

            const addOnderdeelButton = findElementById(fixture, '#add-onderdeel-button');

            expect(addOnderdeelButton).toBeTruthy();
        });

        it('should call addSelectedOnderdeel() in OnderdeelMenuComponent on button click()', () => {
            const onderdelenMenu = jasmine.createSpyObj('OnderdelenMenu', ['addSelectedOnderdeel']);
            component.onderdelenMenu = onderdelenMenu;
            component.currentTab = component.tabs[1];
            fixture.detectChanges();

            const addOnderdeelButton = findElementById(fixture, '#add-onderdeel-button');
            addOnderdeelButton.click();
            fixture.detectChanges();

            expect(onderdelenMenu.addSelectedOnderdeel).toHaveBeenCalled();
        });
    });
});
