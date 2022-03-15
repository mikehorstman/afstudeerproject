import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Customization } from "../../../models/style.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

@Component({
    selector   : 'app-handtekening',
    templateUrl: './handtekening.component.html',
    styleUrls  : ['./handtekening.component.scss']
})
export class HandtekeningComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @ViewChild('template') templateRef!: TemplateRef<any>;

    Customization = Customization;

    mainElement: string = 'handtekening-onderdeel';
    text: string = 'Handtekening leerkracht';


    ngOnInit(): void {
        this.setDefaultStyling([
                { key: Customization.text, value: this.text, elementId: 'header' },
                { key: Customization.fontSize, value: '12', elementId: 'header' },
                { key: Customization.color, value: '#000000', elementId: 'header' },
                { key: Customization.backgroundColor, value: '#000000', elementId: 'line' },
                { key: Customization.height, value: '1', elementId: 'line' },
                { key: Customization.width, value: '250', elementId: this.mainElement }
            ]
        );

        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        })
    }
}
