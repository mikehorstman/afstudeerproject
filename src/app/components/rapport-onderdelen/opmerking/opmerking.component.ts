import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Customization } from "../../../models/style.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";
import { DataService } from "../../../services/data/data.service";
import { FormService } from "../../../services/form/form.service";
import { StyleService } from "../../../services/style/style.service";
import { RequestService } from "../../../services/request/request.service";

@Component({
    selector   : 'app-opmerking',
    templateUrl: './opmerking.component.html',
    styleUrls  : ['./opmerking.component.scss']
})
export class OpmerkingComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @ViewChild('template') templateRef!: TemplateRef<any>;

    mainElement: string = 'opmerking-onderdeel';

    constructor(dataService: DataService, formService: FormService, styleService: StyleService, requestService: RequestService) {
        super(styleService, formService, dataService, requestService);
    }

    Customization = Customization;

    ngOnInit(): void {
        this.setDefaultStyling([
                { key: Customization.text, value: 'Opmerking', elementId: 'header' },
                { key: Customization.fontSize, value: '24', elementId: 'header' },
                { key: Customization.color, value: '#000000', elementId: 'header' },
                { key: Customization.fontSize, value: '12', elementId: 'body' },
                { key: Customization.text, value: '', elementId: 'body' },
                { key: Customization.color, value: '#000000', elementId: 'body' },
                { key: Customization.width, value: '450', elementId: this.mainElement }
            ]
        );
        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        })
    }
}
