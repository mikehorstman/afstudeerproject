import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { BaseComponent } from "../../base/base.component";
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { DataService } from "../../../services/data/data.service";
import { Onderdelen } from "../../../models/enums.model";
import { v4 as uuid } from 'uuid';
import { Customization } from "../../../models/style.model";
import { MatDialog } from "@angular/material/dialog";
import { ToetsOnderdeelModalComponent } from "../../toets-onderdeel-modal/toets-onderdeel-modal.component";
import { RequestService } from "../../../services/request/request.service";
import { Rapportdefinitie, RapportRubriek, RapportSubrubriek } from "../../../models/rapport.model";

@Component({
    selector: 'app-rubrieken-menu',
    templateUrl: './rubrieken-menu.component.html',
    styleUrls: ['./rubrieken-menu.component.scss']
})
export class RubriekenMenuComponent extends BaseComponent implements OnInit {

    constructor(formService: FormService, styleService: StyleService, dataService: DataService, requestService: RequestService, public dialog: MatDialog) {
        super(formService, dataService, styleService, requestService);
    }

    numberOfPages: number[] = new Array(1);
    currentUuid: string = '';
    definitie!: Rapportdefinitie;

    ngOnInit(): void {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;
        })
        this.dataService.getNumberOfPages().subscribe(pages => {
            this.numberOfPages = new Array(pages);
            if (this.numberOfPages.length !== this.definitie.rubrieken.length) {
                this.definitie.rubrieken.push([]);
                this.requestService.updateDefinitie(this.definitie)
            }
        })

        if (this.definitie.rubriekStyling === undefined || this.definitie.rubriekStyling.length === undefined) {
            this.definitie.rubriekStyling = [
                { key: Customization.fontSize, value: '14', elementId: 'header' },
                { key: Customization.color, value: '#000000', elementId: 'header' },
                { key: Customization.text, value: '', elementId: 'header' },
                { key: Customization.show, value: '{"actief": true}', elementId: 'header' }
            ]
        }

        this.styleService.getStyling().subscribe(styling => {
            if (this.styleService.currentUuid === this.currentUuid) {
                this.styling = styling;
                let show = this.styling.find(obj => obj.key.label === 'show');
                let text = this.styling.find(obj => obj.key.label === 'text');

                this.definitie.rubrieken.forEach(rubriek => {
                    rubriek.forEach(item => {
                        if (item.uuid === this.currentUuid) {
                            item.naam = text !.value;
                            item.is_active = JSON.parse(show!.value)['actief'];
                        }
                    })
                })
            }
        })
    }

    /**
     * This function is called when an item in the rubrieken menu is dropped.
     *
     * @param event
     * @param index
     */
    drop(event: CdkDragDrop<RapportRubriek[], any>, index: number) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        for (let i = 0; i < this.definitie.rubrieken.length; i++) {
            this.definitie.rubrieken[i].map(rubriek => {
                rubriek.page = i + 1;
            })
        }
        this.requestService.updateDefinitie(this.definitie);
    }

    /**
     * Called when an item in the menu is clicked. It sets the styling.
     *
     * @param event
     * @param rubriek
     */
    onClick(event: Event, rubriek: RapportRubriek) {
        this.dataService.setCurrentPage(rubriek.page)
        this.currentUuid = rubriek.uuid;

        this.onSelect(event,Onderdelen.rubriek, rubriek.styling, this.currentUuid)
    }

    /**
     * Adds a new rubriek to the definitie.
     */
    addRubriek() {
        this.definitie.rubrieken[this.dataService.currentPage - 1].push({
            page        : this.dataService.currentPage,
            naam        : 'Rubriek',
            is_active   : true,
            subrubrieken: [],
            opmerkingen : [],
            uuid        : uuid(),
            styling     : [ { key: Customization.fontSize, value: '14', elementId: 'header' },
                { key: Customization.color, value: '#000000', elementId: 'header' },
                { key: Customization.text, value: 'Rubriek', elementId: 'header' },
                { key: Customization.show, value: '{"actief": true}', elementId: 'header' }]
        });
        this.requestService.updateDefinitie(this.definitie);
        const event: Event = new Event('click')
        this.onClick(event, this.definitie.rubrieken[this.dataService.currentPage - 1][this.definitie.rubrieken[this.dataService.currentPage - 1].length - 1])
    }

    /**
     * Adds a new subrubriek to the rubriek.
     *
     * @param r
     */
    addSubRubriek(r: RapportRubriek) {
        this.definitie.rubrieken.forEach(rubriek => {
            rubriek.forEach(item => {
                if (item.uuid === r.uuid) {
                    this.openDialog({ toetsOnderdelen: [], cijfers: [], berekeningGemiddelde: { id: 1, naam: 'rapportgemiddelde' }, naam: '', isActive: true, uuid: uuid() }, r, 'post')
                }
            })
        })

    }

    /**
     * Opens the toetsonderdelen pop-up.
     *
     * @param subrubriek
     */
    openDialog(subrubriek: RapportSubrubriek, r: RapportRubriek, mode: string) {
        const dialogRef = this.dialog.open(ToetsOnderdeelModalComponent, {
            width: '80%',
            data : { 'subrubriek': subrubriek, 'mode': mode }
        });
        dialogRef.updateSize('80%')

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                if (result.mode === 'post') {
                    this.definitie.rubrieken.forEach(rubriek => {
                        rubriek.forEach(item => {
                            if (item.uuid === r.uuid) {
                                item.subrubrieken.push(result.subrubriek)
                            }
                        })
                    })
                }
            }
        });
    }
}
