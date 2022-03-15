import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from "../../base/base.component";
import { StyleService } from "../../../services/style/style.service";
import { FormService } from "../../../services/form/form.service";
import { DataService } from "../../../services/data/data.service";
import { RequestService } from "../../../services/request/request.service";


@Component({
    selector   : 'app-rapport-onderdeel',
    templateUrl: './rapport-onderdeel.component.html',
    styleUrls  : ['./rapport-onderdeel.component.scss']
})
export class RapportOnderdeelComponent extends BaseComponent implements OnInit {
    @Input() boundary!: HTMLElement;
    @Input() uniqueId!: string;
    @Input() lockXAxis: boolean = false;
    @Input() templateRef!: TemplateRef<any>;

    constructor(public styleService: StyleService, formService: FormService, dataService: DataService, requestService: RequestService) {
        super(formService, dataService, styleService, requestService);
    }

    ngOnInit(): void {
    }
}
