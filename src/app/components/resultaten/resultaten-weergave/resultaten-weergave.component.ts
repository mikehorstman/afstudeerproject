import { Component, Input, OnInit } from '@angular/core';
import { RapportCijferSchaal } from "../../../models/rapport.model";
import { DataService } from "../../../services/data/data.service";
import { RapportRubriekWeergaveType } from "../../../models/enums.model";

@Component({
    selector   : 'app-resultaten-weergave',
    templateUrl: './resultaten-weergave.component.html',
    styleUrls  : ['./resultaten-weergave.component.scss']
})
export class ResultatenWeergaveComponent implements OnInit {
    @Input() result!: number;
    @Input() option!: string;

    WeergaveType = RapportRubriekWeergaveType;
    cijferSchaal!: RapportCijferSchaal;

    smileys = ['frown', 'frown', 'meh', 'smile'];
    colors = ['#FF0000', '#FF8C00', '#F5E942', '#429CF5', '#30FA1E']

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.cijferSchaal = this.dataService.cijferSchaal;
    }

}
