import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InputButton, InputCategory, InputCheckbox, InputDropdown, InputLayout, InputNumber, InputTextbox } from "../../models/input.model";
import { Onderdelen } from "../../models/enums.model";
import { Customization } from "../../models/style.model";

@Injectable()
export class FormService {
    layouts: InputLayout[] = [
        new InputLayout(Onderdelen.rubriekMenu, [
            new InputCategory('Rubriek', 'header', '1fr', [
                new InputTextbox({
                    key          : 'text',
                    customization: Customization.text,
                    label        : 'Naam',
                }),
                new InputCheckbox({
                    key          : 'show',
                    customization: Customization.show,
                    label        : 'Show',
                    options      : [{ key: 1, value: 'actief' }],
                }),
            ])
        ]),
        new InputLayout(Onderdelen.rubriek, [
            new InputCategory('Rubriek', 'header', '1fr', [
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',
                }),
                new InputTextbox({
                    key          : 'color',
                    customization: Customization.color,
                    label        : 'Text Color',
                }),
            ]),
            new InputCategory('Rubriek', 'header', '1fr', [
                new InputTextbox({
                    key          : 'text',
                    customization: Customization.text,
                    label        : 'Naam',
                }),
                new InputCheckbox({
                    key          : 'show',
                    customization: Customization.show,
                    label        : 'Show',
                    options      : [{ key: 1, value: 'actief' }],
                }),
            ])
        ]),
        new InputLayout(Onderdelen.rapport, [
            new InputCategory('Padding', 'rapport-page', '1fr 2fr', [
                new InputNumber({
                    key          : 'padding',
                    customization: Customization.padding,
                    label        : 'Padding',
                }),
            ]),
            new InputCategory('Font', 'rapport-page', '1fr 1fr', [
                new InputDropdown({
                    key          : 'fontFamily',
                    customization: Customization.fontFamily,
                    label        : 'Font Family',
                    options      : [{ key: 1, value: 'Ubuntu' }, { key: 2, value: 'Arial' }],
                }),
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',
                }),
            ]),
            new InputCategory('Kleuren', 'rapport-page', '1fr 2fr', [
                new InputTextbox({
                    key          : 'backgroundColor',
                    customization: Customization.backgroundColor,
                    label        : 'Background color',
                }),
            ])
        ]),
        new InputLayout(Onderdelen.opmerking, [
            new InputCategory('Titel', 'header', '1fr', [
                new InputTextbox({
                    key          : 'text',
                    customization: Customization.text,
                    label        : 'Titel',
                }),
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',
                }),
                new InputTextbox({
                    key          : 'color',
                    customization: Customization.color,
                    label        : 'Text Color',
                }),
            ]),
            new InputCategory('Opmerking', 'body', '1fr', [
                new InputTextbox({
                    key          : 'text',
                    customization: Customization.text,
                    label        : 'Opmerking',
                }),
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',
                }),
                new InputTextbox({
                    key          : 'color',
                    customization: Customization.color,
                    label        : 'Text Color',
                }),
            ]),
            new InputCategory('Afmetingen', 'opmerking-onderdeel', '1fr 2fr', [
                new InputNumber({
                    key          : 'width',
                    customization: Customization.width,
                    label        : 'Width',
                }),
            ]),
        ]),
        new InputLayout(Onderdelen.handtekening, [
            new InputCategory('Titel', 'header', '1fr', [
                new InputTextbox({
                    key          : 'text',
                    customization: Customization.text,
                    label        : 'Label',
                }),
                new InputTextbox({
                    key          : 'color',
                    customization: Customization.color,
                    label        : 'Color',
                }),
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',

                }),
            ]),
            new InputCategory('Afmetingen', 'handtekening-onderdeel', '1fr 2fr', [
                new InputNumber({
                    key          : 'width',
                    customization: Customization.width,
                    label        : 'Width',
                }),
            ]),
            new InputCategory('Lijn', 'line', '1fr 1fr', [
                new InputTextbox({
                    key          : 'backgroundColor',
                    customization: Customization.backgroundColor,
                    label        : 'Line color',
                }),
                new InputNumber({
                    key          : 'height',
                    customization: Customization.height,
                    label        : 'Height',
                }),
            ]),
        ]),
        new InputLayout(Onderdelen.logo, [
            new InputCategory('Afmetingen', 'logo-onderdeel', '1fr 2fr', [
                new InputNumber({
                    key          : 'width',
                    customization: Customization.width,
                    label        : 'Width',
                }),
            ]),
            new InputCategory('Alignment', 'logo-onderdeel', '1fr', [
                new InputButton({
                    key          : 'alignment',
                    customization: Customization.alignment,
                    label        : 'Alignment',
                    options      : [{ key: 1, value: 'top' }, { key: 2, value: 'bottom' }],
                }),
            ]),
        ]),
        new InputLayout(Onderdelen.grafiek, [
            new InputCategory('Afmetingen', 'grafiek-onderdeel', '1fr 1fr', [
                new InputNumber({
                    key          : 'width',
                    customization: Customization.width,
                    label        : 'Width',
                }),
                new InputNumber({
                    key          : 'height',
                    customization: Customization.height,
                    label        : 'Height',
                }),
            ]),
            new InputCategory('Grafiektype', 'grafiek-onderdeel', '1fr 2fr', [
                new InputDropdown({
                    key          : 'type',
                    customization: Customization.type,
                    label        : 'Type',
                    options      : [
                        { key: 1, value: 'line' },
                        { key: 2, value: 'bar' },
                    ],
                }),
            ]),
        ]),
        new InputLayout(Onderdelen.legenda, [
            new InputCategory('Alignment', 'legenda-onderdeel', '1fr', [
                new InputButton({
                    key          : 'alignment',
                    customization: Customization.alignment,
                    label        : 'Alignment',
                    options      : [{ key: 1, value: 'top' }, { key: 2, value: 'bottom' }],
                }),
            ]),
        ]),
        new InputLayout(Onderdelen.definitie, [
            new InputCategory('Opties', 'definitie-onderdeel', '1fr 1fr 1fr', [
                new InputCheckbox({
                    key          : 'show',
                    customization: Customization.show,
                    label        : 'Show',
                    options      : [{ key: 1, value: 'naam' }, { key: 2, value: 'leerjaar' }, { key: 3, value: 'schooljaar' }],
                }),
            ]),
            new InputCategory('Font', 'definitie-onderdeel', '1fr 1fr', [
                new InputNumber({
                    key          : 'fontSize',
                    customization: Customization.fontSize,
                    label        : 'Font Size',
                }),
                new InputTextbox({
                    key          : 'color',
                    customization: Customization.color,
                    label        : 'Text Color',
                }),
            ]),
        ]),
    ];

    private currentFormLayoutSource = new BehaviorSubject<any>(this.getFormLayout(Onderdelen.rapport));

    /**
     * Returns the current formLayout.
     */
    getCurrentFormLayout() {
        return this.currentFormLayoutSource.asObservable();
    }

    /**
     * Returns the right formLayout based on the given type.
     *
     * @param type
     */
    getFormLayout(type: number): InputLayout {
        return <InputLayout>this.layouts.find(layout => {
            return layout.type === type;
        })
    }

    /**
     * Sets the formLayout based on the given type.
     *
     * @param type
     */
    setFormLayout(type: number): void {
        this.currentFormLayoutSource.next(this.layouts.find(layout => {
            return layout.type === type;
        }))
    }
}
