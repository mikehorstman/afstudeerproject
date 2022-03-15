import { Component, Input, OnInit } from '@angular/core';
import { Rapportdefinitie, RapportRubriek } from "../../models/rapport.model";
import { BaseComponent } from "../base/base.component";
import { CdkDragEnd } from "@angular/cdk/drag-drop";

@Component({
    selector   : 'app-rubrieken-lijst',
    templateUrl: './rubrieken-lijst.component.html',
    styleUrls  : ['./rubrieken-lijst.component.scss']
})
export class RubriekenLijstComponent extends BaseComponent implements OnInit {
    @Input() boundary!: HTMLElement;

    rubrieken: [RapportRubriek[]] = [[]];

    definitie!: Rapportdefinitie;
    currentPage: number = 1;
    uuid: string = '1234';

    ngOnInit(): void {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;
            this.rubrieken = definitie.rubrieken;
            this.rubrieken.forEach(rubriek => {
                rubriek.forEach(item => {
                    this.addStyle(item.styling, item.uuid)
                })
            })
        })

        this.dataService.getCurrentPage().subscribe(page => {
            this.currentPage = page;
        })
    }

    dropRubriek(event: CdkDragEnd) {
        this.x = Math.round(event.source.getFreeDragPosition().x);
        this.y = Math.round(event.source.getFreeDragPosition().y);

        this.rapportDefinitie = this.requestService.definitie;

        if (this.uuid === '1234') {
            this.rapportDefinitie.x = this.calculatePosition(+this.rapportDefinitie.x, +this.x);
            this.rapportDefinitie.y = this.calculatePosition(+this.rapportDefinitie.y, +this.y);
        }
        this.requestService.updateDefinitie(this.rapportDefinitie);
    }
}
