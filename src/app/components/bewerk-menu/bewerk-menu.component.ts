import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { InputCategory } from "../../models/input.model";
import { Customization } from "../../models/style.model";

@Component({
    selector   : 'app-bewerk-menu',
    templateUrl: './bewerk-menu.component.html',
    styleUrls  : ['./bewerk-menu.component.scss'],
})
export class BewerkMenuComponent extends BaseComponent implements OnInit {
    layout!: InputCategory[];

    /**
     * When the component is loaded, it subscribes to the FormService and StyleService.
     */
    ngOnInit(): void {
        this.formService.getCurrentFormLayout().subscribe(result => {
            this.layout = result.form as InputCategory[];
        })
        this.styleService.getStyling().subscribe(result => {
            this.styling = result;
        })
    }

    /**
     * This function is called when the user input changes. It calls the StyleService and sets the styling in the service.
     *
     * @param style
     * @param category
     */
    onInput(style: any, category: InputCategory): void {
        this.styleService.updateStyling({ key: Customization[style.key], value: style.value, elementId: category.key });
    }
}
