import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomBarComponent } from './bottom-bar.component';
import { first } from "rxjs/operators";
import { findElementById } from "../../../testing";


describe('BottomBarComponent', () => {
    let component: BottomBarComponent;
    let fixture: ComponentFixture<BottomBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BottomBarComponent]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BottomBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Zoom page', () => {
        let plusIcon: HTMLElement;
        let minusIcon: HTMLElement;
        let zoomLabel: HTMLElement;
        let zoomSlider: HTMLElement;

        beforeEach(() => {
            plusIcon = findElementById(fixture, '#plus');
            minusIcon = findElementById(fixture, '#minus');
            zoomLabel = findElementById(fixture, '#zoom-label');
            zoomSlider = findElementById(fixture, '#zoom-slider');
        });

        it('should show the #zoom-slider', () => {
            expect(zoomSlider).toBeTruthy();
        });

        it('should show #plus and #minus icons', () => {
            expect(plusIcon).toBeTruthy();
            expect(minusIcon).toBeTruthy();
        });

        it('should show the right #zoom-label', () => {
            expect(zoomLabel).toBeTruthy();
            expect(zoomLabel.innerHTML).toEqual(component.zoomValue + '%');
        });

        it('should call zoomPage() on #plus and #minus click', waitForAsync(() => {
            spyOn(component, 'zoomPage');

            plusIcon.click();
            fixture.detectChanges();
            expect(component.zoomPage).toHaveBeenCalled();

            minusIcon.click();
            fixture.detectChanges();
            expect(component.zoomPage).toHaveBeenCalled();
        }));

        it('should zoom on #plus and #minus click', () => {
            component.zoomValue = 100;

            plusIcon.click();
            expect(component.zoomValue).toBe(110);
            minusIcon.click();
            expect(component.zoomValue).toBe(100);
        });

        it('#currentZoomValue should not be bigger than #maximumZoomValue or smaller than #minimumZoomValue', () => {
            component.zoomValue = 100;
            component.maximumZoomValue = 120;
            component.minimumZoomValue = 90;

            minusIcon.click();
            expect(component.zoomValue).toBe(90);

            minusIcon.click();
            expect(component.zoomValue).toBe(90);

            plusIcon.click();
            plusIcon.click();
            plusIcon.click();
            expect(component.zoomValue).toBe(120);

            plusIcon.click();
            expect(component.zoomValue).toBe(120);
        });

        it('raises the zoomed event when one of the zoom-buttons is clicked', () => {
            const zoomValue = 120;
            component.zoomValue = zoomValue;
            component.zoomed.pipe(first()).subscribe((currentZoomValue: number) => expect(currentZoomValue).toBe(zoomValue + 10));

            plusIcon.click();
        });
    });

    describe('Switch between pages', () => {
        let leftArrow: HTMLElement;
        let rightArrow: HTMLElement;
        let currentPageLabel: HTMLElement;

        beforeEach(() => {
            leftArrow = findElementById(fixture, '#left-arrow');
            rightArrow = findElementById(fixture, '#right-arrow');
            currentPageLabel = findElementById(fixture, '#current-page-label');
        });

        it('should show #left-arrow and #right-arrow icons', () => {
            expect(leftArrow).toBeTruthy();
            expect(rightArrow).toBeTruthy();
        });

        it('should show the right #current-page-label', () => {
            component.numberOfPages = 2;
            fixture.detectChanges();
            expect(currentPageLabel).toBeTruthy();
            expect(currentPageLabel.innerHTML).toEqual(component.page + '/' + component.numberOfPages);
        });

        it('should call switchPage() on arrow click', waitForAsync(() => {
            spyOn(component, 'switchPage');
            rightArrow.click();
            fixture.detectChanges();
            expect(component.switchPage).toHaveBeenCalled();
        }));

        it('should switch pages on arrow click', () => {
            component.numberOfPages = 2;
            expect(component.page).toBe(1);

            rightArrow.click();
            expect(component.page).toBe(2);

            leftArrow.click();
            expect(component.page).toBe(1);
        });

        it('#page should not be bigger than #numberOfPages or smaller than 1', () => {
            component.numberOfPages = 2;
            expect(component.page).toBe(1);

            rightArrow.click();
            expect(component.page).toBe(2);

            rightArrow.click();
            expect(component.page).toBe(2);

            leftArrow.click();
            expect(component.page).toBe(1);

            leftArrow.click();
            expect(component.page).toBe(1);
        });

        it('raises the switched event when one of the arrows is clicked', () => {
            const page = 1;
            component.numberOfPages = 2;
            component.page = page;
            component.switched.pipe(first()).subscribe((currentPage: number) => expect(currentPage).toBe(page + 1));

            rightArrow.click();
        });
    });

    describe('Add page', () => {
        let addPageLabel: HTMLElement;
        let addPageButton: HTMLElement;

        beforeEach(() => {
            addPageLabel = findElementById(fixture, '#add-page-label');
            addPageButton = findElementById(fixture, '#add-page');
        });

        it('should show the right add-page label', () => {
            expect(addPageLabel).toBeTruthy();
            expect(addPageLabel.innerHTML).toEqual('nieuwe pagina');
        });

        it('should add a page on button click', () => {
            component.numberOfPages = 1;

            addPageButton.click();
            expect(component.numberOfPages).toBe(2);
        });

        it('should call addPage() on button click', waitForAsync(() => {
            spyOn(component, 'addPage');

            addPageButton.click();
            fixture.detectChanges();
            expect(component.addPage).toHaveBeenCalled();
        }));

        it('raises the added event when the #add-page button is clicked', () => {
            let pages = 1;
            component.numberOfPages = pages;
            component.added.pipe(first()).subscribe((numberOfPages: number) => expect(numberOfPages).toBe(pages + 1));

            addPageButton.click();
        });

        it('should change #page to the newly added page', () => {
            component.page = 1;
            component.numberOfPages = 1;

            addPageButton.click();
            expect(component.page).toBe(2);
        });
    });
});



