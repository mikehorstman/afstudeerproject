import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../base/base.component";
import { Onderdelen } from "../../../models/enums.model";
import { Onderdeel } from "../../../models/onderdeel.model";

@Component({
    selector   : 'app-onderdelen-menu',
    templateUrl: './onderdelen-menu.component.html',
    styleUrls  : ['./onderdelen-menu.component.scss'],
})
export class OnderdelenMenuComponent extends BaseComponent implements OnInit {
    onderdelen: Onderdeel[] = [
        { title: 'Grafiek', id: Onderdelen.grafiek },
        { title: 'Handtekening', id: Onderdelen.handtekening },
        { title: 'Opmerking', id: Onderdelen.opmerking },
        { title: 'Logo', id: Onderdelen.logo },
        { title: 'Legenda', id: Onderdelen.legenda },
        { title: 'Definitie', id: Onderdelen.definitie }
    ]

    selectedOnderdeel: Onderdeel = this.onderdelen[0];

    ngOnInit(): void {
    }

    /**
     * This function is called when one of the onderdelen is selected.
     *
     * @param onderdeel
     */
    selectOnderdeel(onderdeel: Onderdeel): void {
        this.selectedOnderdeel = onderdeel;
    }

    /**
     * This function is called on button click(). It adds the selected onderdeel on the rapport page, via the DataService.
     */
    addSelectedOnderdeel(): void {
        this.dataService.addNewOnderdeel(this.selectedOnderdeel.id);
    }
}
