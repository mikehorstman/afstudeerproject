import { Component, Input, OnInit } from '@angular/core';
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";
import { StyleService } from "../../../services/style/style.service";
import { DataService } from "../../../services/data/data.service";
import { FormService } from "../../../services/form/form.service";
import { Customization, StyleModel } from "../../../models/style.model";
import { RequestService } from "../../../services/request/request.service";
import { Rapportdefinitie, RapportRubriek, RapportRubriekWeergave, RapportSubrubriek } from "../../../models/rapport.model";

@Component({
    selector   : 'app-rubriek',
    templateUrl: './rubriek.component.html',
    styleUrls  : ['./rubriek.component.scss']
})
export class RubriekComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @Input() rubriek!: RapportRubriek;

    uuid!: string;
    styling: StyleModel[] = [];
    subrubrieken!: RapportSubrubriek[];

    mainElement: string = 'rubriek-onderdeel';
    definitie!: Rapportdefinitie;
    naam: string = 'Rubriek';
    standaardWeergave!: RapportRubriekWeergave;

    Customization = Customization;

    constructor(styleService: StyleService, dataService: DataService, formService: FormService, requestService: RequestService) {
        super(styleService, formService, dataService, requestService)
    }

    ngOnInit(): void {
        this.uuid = this.rubriek.uuid;
        this.styling = this.rubriek.styling;
        this.subrubrieken = this.rubriek.subrubrieken

        this.setDefaultStyling(this.styling)

        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;
            this.standaardWeergave = this.definitie.standaardWeergave!;
        })

        this.setDefaultStyling([
                { key: Customization.fontSize, value: '14', elementId: 'header' },
                { key: Customization.color, value: '#000000', elementId: 'header' },
                { key: Customization.text, value: '', elementId: 'header' },
                { key: Customization.show, value: '{"actief": true}', elementId: 'header' }
            ]
        );
        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        })
    }
}
