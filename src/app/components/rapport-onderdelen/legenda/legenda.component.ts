import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RapportCijferSchaal, Rapportdefinitie, RapportRubriekWeergave } from "../../../models/rapport.model";
import { Customization } from "../../../models/style.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";
import { RapportRubriekWeergaveType } from "../../../models/enums.model";

@Component({
    selector   : 'app-legenda',
    templateUrl: './legenda.component.html',
    styleUrls  : ['./legenda.component.scss']
})
export class LegendaComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @ViewChild('template') templateRef!: TemplateRef<any>;

    mainElement: string = 'legenda-onderdeel';
    definitie!: Rapportdefinitie;
    WeergaveType = RapportRubriekWeergaveType;

    Customization = Customization;

    cijferSchaal!: RapportCijferSchaal;

    standaardWeergave!: RapportRubriekWeergave|undefined;

    ngOnInit(): void {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;
            this.standaardWeergave = this.definitie.standaardWeergave;
        })

        this.cijferSchaal = this.dataService.cijferSchaal;

        this.setDefaultStyling([
                { key: Customization.alignment, value: 'top', elementId: this.mainElement },
            ]
        );
        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        })
    }
}
