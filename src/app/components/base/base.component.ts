import { Component, Injectable, OnInit } from '@angular/core';
import { FormService } from "../../services/form/form.service";
import { DataService } from "../../services/data/data.service";
import { StyleService } from "../../services/style/style.service";
import { Onderdelen } from "../../models/enums.model";
import { StyleModel, Customization } from "../../models/style.model";
import { RequestService } from "../../services/request/request.service";
import { Rapportdefinitie } from "../../models/rapport.model";
import { CdkDragEnd } from "@angular/cdk/drag-drop";

@Component({
    selector : 'app-base',
    providers: [FormService, DataService, StyleService, RequestService],
    template : ``
})
@Injectable()
export class BaseComponent implements OnInit {

    styling!: StyleModel[];
    uuid: string = '';
    Onderdelen = Onderdelen;

    mainElement: string = '';

    x: number = 0;
    y: number = 0;

    rapportDefinitie!: Rapportdefinitie;

    constructor(protected formService: FormService, protected dataService: DataService, protected styleService: StyleService, protected requestService: RequestService) {
    }

    ngOnInit(): void {
    }

    dropOnderdeel(event: CdkDragEnd) {
        this.x = Math.round(event.source.getFreeDragPosition().x);
        this.y = Math.round(event.source.getFreeDragPosition().y);

        this.rapportDefinitie = this.requestService.definitie;

        this.rapportDefinitie.onderdelen.map(onderdeel => {
            if (onderdeel.uuid === this.styleService.currentUuid) {
                onderdeel.x = this.calculatePosition(+onderdeel.x, +this.x);
                onderdeel.y = this.calculatePosition(+onderdeel.y, +this.y);
            }
        })
        this.requestService.updateDefinitie(this.rapportDefinitie);
    }

    calculatePosition(a: number, b: number) {
        return a + b;
    }

    addStyle(styling: StyleModel[], suffix: string,) {
        setTimeout(function () {
            styling.forEach(style => {
                let element = document.getElementById(style.elementId + '-' + suffix);
                if (element !== null) {
                    element!.style[style.key.label] = style.value + style.key.suffix;
                }
            })
        }, 1);
    }

    /**
     * Appends the given styling on the element with the given elementId.
     *
     * @param styling
     * @param suffix
     * @param uuid
     */
    appendStyling(styling: StyleModel[], suffix: string, uuid: string = this.uuid): void {
        if (this.styleService.currentUuid === uuid) {
            this.styling = styling;
            this.addStyle(styling, suffix)

            this.setAlignment(this.mainElement + '-' + suffix);

            this.rapportDefinitie = this.requestService.definitie;
            if (this.uuid === '1234') {
                this.rapportDefinitie.styling = styling;
            } else {
                this.rapportDefinitie.onderdelen.map(onderdeel => {
                    if (onderdeel.uuid === this.styleService.currentUuid) {
                        onderdeel.styling = styling;
                    }
                })

                this.rapportDefinitie.rubrieken.forEach(rubriek => {
                    rubriek.forEach(item => {
                        if (item.uuid === this.styleService.currentUuid) {
                            item.styling = styling
                        }
                    })
                })
            }

            this.requestService.updateDefinitie(this.rapportDefinitie)
        }
    }

    /**
     * Returns the right styling value based on the key.
     *
     * @param element
     * @param customization
     */
    getValue(element: string, customization: Customization): string {
        return this.styling.find(o => o.key.label === customization.label && o.key.suffix === customization.suffix && o.elementId === element)!.value
    }

    /**
     * Sets the alignment of the given element.
     *
     * @param elementId
     */
    setAlignment(elementId: string) {
        let element = document.getElementById(elementId);
        let alignment = this.styling.find(obj => obj.key.label === 'alignment')
        let innerPage = document.getElementById('inner-page-' + (this.dataService.currentPage - 1));
        switch (alignment?.value) {
            case('bottom'):
                element!.style.top = (innerPage!.offsetHeight - element!.offsetHeight) + 'px';
                break;
            case('top'):
                element!.style.top = '0';
                break;
        }
    }

    removeComponent(uuid: string) {
        let componentRef = this.dataService.components.filter(
            x => x.instance.uuid === uuid
        )[0];
        let innerPage = document.getElementById('inner-page-' + (this.dataService.currentPage - 1));
        innerPage?.removeChild(componentRef.location.nativeElement);

        const componentIndex = this.dataService.components.indexOf(componentRef);
        this.dataService.components.splice(componentIndex, 1);
        this.rapportDefinitie = this.requestService.definitie;

        this.rapportDefinitie.onderdelen.forEach(function (item, index, object) {
            if (item.uuid === uuid) {
                object.splice(index, 1);
            }
        });
        this.dataService.onderdelenToRemove.push(uuid);
    }

    /**
     * This function is called when a component is selected. It will set the right formLayout for the EditMenuComponent
     * and it sets the component-styling as current styling in the StylingService.
     *
     * @param event
     * @param type
     * @param styling
     * @param uuid
     */
    onSelect(event: Event, type: number, styling: StyleModel[], uuid: string = this.uuid): void {
        event.stopPropagation()
        this.formService.setFormLayout(type);
        this.styleService.setStyling(styling, uuid);
    }

    beforemove(uuid: string, type: number, styling: StyleModel[]) {
        this.formService.setFormLayout(type);
        this.styleService.setStyling(styling, uuid);
    }

    /**
     * Sets the current default styling of the component.
     *
     * @param options
     */
    setDefaultStyling(options: StyleModel[]): void {
        if (this.styling === undefined || this.styling.length === undefined) {
            this.styling = options;
        }
    }
}
