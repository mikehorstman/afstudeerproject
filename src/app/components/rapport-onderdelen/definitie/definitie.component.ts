import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Customization } from "../../../models/style.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";
import { Rapportdefinitie } from "../../../models/rapport.model";

@Component({
    selector   : 'app-definitie',
    templateUrl: './definitie.component.html',
    styleUrls  : ['./definitie.component.scss']
})
export class DefinitieComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @ViewChild('template') templateRef!: TemplateRef<any>;

    Customization = Customization;

    mainElement: string = 'definitie-onderdeel';
    definitie!: Rapportdefinitie;
    leerling: string = 'John Doe';


    ngOnInit(): void {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;

        })
        this.setDefaultStyling([
                { key: Customization.fontSize, value: '12', elementId: this.mainElement },
                { key: Customization.color, value: '#000000', elementId: this.mainElement },
                { key: Customization.show, value: '{"naam": true, "schooljaar":true, "leerjaar":true}', elementId: this.mainElement }
            ]
        );
        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        })
    }

    /**
     * Checks if one of the definition elements should be invisible or not.
     *
     * @param name
     */
    isVisible(name: string) {
        let show = this.styling.find(obj => obj.key.label === 'show');
        return JSON.parse(show!.value)[name] === true;
    }
}
