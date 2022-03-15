import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { DataService } from "../../services/data/data.service";
import { RequestService } from "../../services/request/request.service";

@Component({
    selector     : 'app-bottom-bar',
    templateUrl  : './bottom-bar.component.html',
    styleUrls    : ['./bottom-bar.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class BottomBarComponent implements OnInit {
    zoomValue: number|null = 100;
    minimumZoomValue: number = 0;
    maximumZoomValue: number = 200;
    zoomStepAmount: number = 10;

    page: number = 1;

    @Output() zoomed = new EventEmitter<number>();

    numberOfPages!: number

    constructor(private dataService: DataService, private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.dataService.getNumberOfPages().subscribe(amount => {
            this.numberOfPages = amount;
        })
    }

    /**
     * Sends the right zoom value to the RapportComponent when the zoom value changes.
     *
     * @param amount
     */
    zoomPage(amount: number|null): void {
        if (!(amount! > this.maximumZoomValue || amount! < this.minimumZoomValue)) {
            this.zoomValue = amount!;
            this.zoomed.emit(this.zoomValue);
        }
    }

    /**
     * Send the current page value to the RapportComponent when the current page changes.
     *
     * @param page
     */
    switchPage(page: number): void {
        if (!(page === this.numberOfPages + 1 || page === 0)) {
            this.page = page;
            this.dataService.setCurrentPage(this.page);
        }
    }

    /**
     * Adds a page to the RapportComponent. It also sets the current page to the newly added page.
     *
     * @param amount
     */
    addPage(amount: number): void {
        this.numberOfPages += amount;
        this.dataService.addNewPage();
        this.switchPage(this.numberOfPages);
        this.requestService.definitie.pageAmount = this.numberOfPages;
    }
}
