import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RapportComponent } from './rapport.component';
import { findElementByCSS, findElementById, findElementsByClass } from "../../../testing";
import { DebugElement } from "@angular/core";
import { FormService } from "../../services/form/form.service";
import { DataService } from "../../services/data/data.service";
import { Onderdelen } from "../../models/enums.model";
import { StyleService } from "../../services/style/style.service";
import { Customization } from "../../models/style.model";

describe('RapportComponent', () => {
    let component: RapportComponent;
    let fixture: ComponentFixture<RapportComponent>;

    let page: HTMLElement;
    let rapport: HTMLElement;
    let bottomBar: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RapportComponent],
            providers   : [FormService, DataService, StyleService]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RapportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = findElementById(fixture, '#rapport-page-0');
        rapport = findElementById(fixture, '#rapport');
        bottomBar = findElementByCSS(fixture, 'app-bottom-bar');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the right dimensions for an a4 paper', () => {
        let width = page.offsetWidth;
        let height = page.offsetHeight;
        expect(Math.round(((height / width) + Number.EPSILON) * 10) / 10).toEqual(1.4);
    });

    it('should have a BottomBarComponent', () => {
        expect(bottomBar).toBeTruthy()
    });

    describe('Zoom page', () => {
        it('should call zoomPage() on zoom changes', () => {
            spyOn(component, 'zoomPage');

            bottomBar.triggerEventHandler('zoomed', 120);
            fixture.detectChanges();

            expect(component.zoomPage).toHaveBeenCalled();
        });

        it('should transform the #rapport element on zoomPage() call', () => {
            const zoomValue = 120;
            component.zoomPage(zoomValue);

            expect(rapport.style.transform).toBe('scale(' + (zoomValue / 100) + ')');
            expect(rapport.style.transformOrigin).toBe('center top');
        });
    });

    describe('Add page', () => {
        it('passes the number of pages', () => {
            const pages = new Array(4);
            component.pages = pages;
            fixture.detectChanges();

            expect(bottomBar.properties.numberOfPages).toBe(pages.length);
        });

        it('should call addPage() on page add', () => {
            spyOn(component, 'addPage');

            bottomBar.triggerEventHandler('added', 3);
            fixture.detectChanges();

            expect(component.addPage).toHaveBeenCalled();
        });

        it('should update #pages on addPage() call', () => {
            component.pages = new Array(1);
            component.addPage();

            expect(component.pages.length).toBe(2);
        });
    });

    describe('Update styling', () => {
        it('should call appendStylingOnEveryPage when the styling is changed ', inject([StyleService], (styleService: StyleService) => {
            spyOn(component, 'appendStylingOnEveryPage');

            const style = { key: Customization.padding, value: '20', elementId: 'body' }
            styleService.updateStyling(style);
            fixture.detectChanges();

            expect(component.appendStylingOnEveryPage).toHaveBeenCalled();
        }));

        it('should call StyleService.setStyling() on page click() ', inject([StyleService], (styleService: StyleService) => {
            spyOn(styleService, 'setStyling');

            page.click();
            fixture.detectChanges();

            expect(styleService.setStyling).toHaveBeenCalled();
        }));

        it('should update the styling of all the rapport pages on appendStylingOnEveryPage() call', () => {
            const styling = [
                { key: Customization.padding, value: '20', elementId: 'rapport-page' },
                { key: Customization.fontSize, value: '12', elementId: 'rapport-page' },
                { key: Customization.fontFamily, value: 'Arial', elementId: 'rapport-page' },
                { key: Customization.backgroundColor, value: 'rgb(250, 250, 250)', elementId: 'rapport-page' }
            ];
            component.pages = new Array(3);
            component.appendStylingOnEveryPage(styling);
            const pages = findElementsByClass(fixture, '.rapport-page');
            pages.forEach((page) => {
                expect(page.styles['padding']).toBe('20px')
                expect(page.styles['font-size']).toBe('12px')
                expect(page.styles['font-family']).toBe('Arial')
                expect(page.styles['background-color']).toBe('rgb(250, 250, 250)')
            })
        });

        it('should update the styling of newly added pages', fakeAsync(() => {
            const styling = [{ key: Customization.padding, value: '20', elementId: 'rapport-page' }];

            fixture.detectChanges();

            component.styling = styling;
            component.appendStylingOnEveryPage(styling)
            let pages = findElementsByClass(fixture, '.rapport-page');
            expect(pages.length).toBe(1);
            expect(pages[0].styles['padding']).toBe('20px');

            component.addPage();
            fixture.detectChanges();
            tick(100);

            pages = findElementsByClass(fixture, '.rapport-page');
            expect(pages.length).toBe(2);
            expect(pages[1].styles['padding']).toBe('20px');
        }));
    });

    describe('Add rapport-onderdeel', () => {
        it('should get a new onderdeel from the DataService', inject([DataService], (dataService: DataService) => {
            spyOn(component, 'addOnderdeel');

            dataService.addNewOnderdeel(1);
            fixture.detectChanges();

            expect(component.addOnderdeel).toHaveBeenCalled();
        }));

        it('could add a logo to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.logo);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-logo');

            expect(logo).toBeTruthy()
        }));

        it('could add a grafiek to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.grafiek);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-grafiek');

            expect(logo).toBeTruthy()
        }));

        it('could add a legenda to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.legenda);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-legenda');

            expect(logo).toBeTruthy()
        }));

        it('could add a handtekeningenvak to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.handtekening);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-handtekening');

            expect(logo).toBeTruthy()
        }));

        it('could add a definitie to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.definitie);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-definitie');

            expect(logo).toBeTruthy()
        }));

        it('could add a opmerking to the rapport on addOnderdeel() call', waitForAsync(() => {
            component.addOnderdeel(Onderdelen.opmerking);
            fixture.detectChanges();

            const logo = findElementByCSS(fixture, 'app-opmerking');

            expect(logo).toBeTruthy()
        }));
    });
});
