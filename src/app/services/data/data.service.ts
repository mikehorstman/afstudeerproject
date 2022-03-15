import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Onderdelen } from "../../models/enums.model";
import { RapportCijferSchaal, Rapportdefinitie, RapportRubriek } from "../../models/rapport.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    numberOfPages: number = 1;
    currentPage: number = 1;
    cijferSchaal: RapportCijferSchaal = {
        toonOpLegenda: false,
        naam         : 'schaal1',
        key          : 1,
        opties       : [
            {
                tekst: 'onvoldoende',
                van  : 0,
                tot  : 3.99,
            },
            {
                tekst: 'bijna voldoende',
                van  : 4,
                tot  : 5.49,
            },
            {
                tekst: 'voldoende',
                van  : 5.5,
                tot  : 7.99,
            },
            {
                tekst: 'goed',
                van  : 8,
                tot  : 10,
            }
        ]
    }

    private componentSource = new BehaviorSubject(Onderdelen.rapport);
    private pagesSource = new BehaviorSubject(this.numberOfPages);
    private currentPageSource = new BehaviorSubject(this.currentPage);

    components: ComponentRef<any>[] = [];
    onderdelenToRemove: string[] = [];

    getNumberOfPages(): Observable<number> {
        return this.pagesSource.asObservable();
    }

    setNumberOfPages(pages: number): void {
        this.numberOfPages = pages;
        this.pagesSource.next(this.numberOfPages);
    }

    getCurrentPage(): Observable<number> {
        return this.currentPageSource.asObservable();
    }

    setCurrentPage(page: number): void {
        this.currentPage = page;
        this.currentPageSource.next(this.currentPage);
    }

    addNewPage(): void {
        this.numberOfPages++;
        this.pagesSource.next(this.numberOfPages);
    }

    /**
     * Returns the current rapport onderdeel which is going to be added to the rapport.
     */
    getNewOnderdeel(): Observable<Onderdelen> {
        return this.componentSource.asObservable();
    }

    /**
     * Adds a new rapport onderdeel to the DataService.
     *
     * @param name
     */
    addNewOnderdeel(name: Onderdelen): void {
        this.componentSource.next(name);
    }
}






