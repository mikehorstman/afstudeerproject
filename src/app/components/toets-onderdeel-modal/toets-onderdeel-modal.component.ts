import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RequestService } from "../../services/request/request.service";
import { InputTextbox } from "../../models/input.model";
import { Customization } from "../../models/style.model";
import { RapportToetsonderdeel } from "../../models/rapport.model";

@Component({
    selector   : 'app-toets-onderdeel-modal',
    templateUrl: './toets-onderdeel-modal.component.html',
    styleUrls  : ['./toets-onderdeel-modal.component.scss']
})
export class ToetsOnderdeelModalComponent implements OnInit {
    toetsOnderdelen!: RapportToetsonderdeel[];
    displayedColumns = [
        { naam: 'select', value: [] },
        { naam: 'toetsnaam', value: ['toetsOnderdeel', 'schoolMethodeToets', 'naam'] },
        { naam: 'onderdeel', value: ['toetsOnderdeel', 'naam'] },
        { naam: 'schoolvak', value: ['toetsOnderdeel', 'schoolMethodeToets', 'schoolvak'] },
        { naam: 'leerjaar', value: ['toetsOnderdeel', 'schoolMethodeToets', 'leerjaar'] },
        { naam: 'afnamedatum', value: ['toetsOnderdeel', 'schoolMethodeToets', 'meestRecenteAfnameDatum'] }
    ]
    onderdelenToKoppel: RapportToetsonderdeel[] = [];
    onderdelenToOntkoppel: RapportToetsonderdeel[] = [];

    inputField: InputTextbox = new InputTextbox({
        key          : 'naam',
        label        : 'Naam',
        customization: Customization.text,
        disabled     : false,
    });

    constructor(private requestService: RequestService,
        public dialogRef: MatDialogRef<ToetsOnderdeelModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.requestService.getToetsOnderdelen().subscribe(onderdelen => {
            this.toetsOnderdelen = onderdelen;
            this.filter();
        })
    }

    /**
     * Changes the name of the subrubriek.
     *
     * @param data
     */
    editName(data: { key: string; value: string; }) {
        this.data.subrubriek.naam = data.value;
    }

    filter() {
        this.toetsOnderdelen = this.toetsOnderdelen.filter(x => {
            return this.data.subrubriek.toetsOnderdelen.findIndex((t: RapportToetsonderdeel) => t === x) === -1
        });
    }

    /**
     * Connects the selected toetsonderdelen to the subrubriek.
     */
    koppelOnderdeel() {
        this.data.toetsOnderdelen = this.removeOnderdelen(this.toetsOnderdelen, this.onderdelenToKoppel)
        this.data.subrubriek.toetsOnderdelen.push(...this.onderdelenToKoppel);
        this.data.subrubriek.toetsOnderdelen = [...this.data.subrubriek.toetsOnderdelen];
        this.onderdelenToOntkoppel = [];
        this.onderdelenToKoppel = [];
    }

    /**
     * Disconnects the selected toetsonderdelen from the subrubriek.
     */
    ontkoppelOnderdeel() {
        this.data.subrubriek.toetsOnderdelen = this.removeOnderdelen(this.data.subrubriek.toetsOnderdelen, this.onderdelenToOntkoppel);
        this.toetsOnderdelen.push(...this.onderdelenToOntkoppel);
        this.toetsOnderdelen = [...this.toetsOnderdelen]
        this.onderdelenToOntkoppel = [];
        this.onderdelenToKoppel = [];
    }

    /**
     * Removes items from an array.
     *
     * @param source
     * @param removables
     */
    removeOnderdelen(source: RapportToetsonderdeel[], removables: RapportToetsonderdeel[]) {
        return source.filter((x) => {
            return removables.findIndex(t => t === x) === -1
        });
    }
}
