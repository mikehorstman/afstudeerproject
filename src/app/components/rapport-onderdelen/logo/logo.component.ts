import { Component, Input, OnInit } from '@angular/core';
import { Customization } from "../../../models/style.model";
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

@Component({
    selector   : 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls  : ['./logo.component.scss'],
})
export class LogoComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;

    mainElement: string = 'logo-onderdeel';

    ngOnInit(): void {
        this.setDefaultStyling([
            { key: Customization.width, value: '200', elementId: this.mainElement },
            { key: Customization.alignment, value: 'top', elementId: this.mainElement },
        ])

        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
        });
    }
}
