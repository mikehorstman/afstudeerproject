import { Component, OnInit } from '@angular/core';
import { Onderdelen } from "../../../models/enums.model";
import { BaseComponent } from "../../base/base.component";
import { InputBase, InputDropdown, InputLayout, InputNumber, InputTextbox } from "../../../models/input.model";
import { Customization } from "../../../models/style.model";
import { BerekeningGemiddelde, Rapportdefinitie, RapportRubriekWeergave } from "../../../models/rapport.model";

@Component({
    selector   : 'app-definitie-menu',
    templateUrl: './definitie-menu.component.html',
    styleUrls  : ['./definitie-menu.component.scss'],
})
export class DefinitieMenuComponent extends BaseComponent implements OnInit {
    definitieForm!: InputBase[];
    definitie!: Rapportdefinitie;
    berekeningGemiddeldes: BerekeningGemiddelde[] = [];
    rubriekWeergaves: RapportRubriekWeergave[] = [];

    /**
     * On component load, it sets the right form layout and definitie values.
     */
    ngOnInit(): void {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.definitie = definitie;
        })

        this.requestService.getBerekeningGemiddeldes().subscribe(result => {
            this.berekeningGemiddeldes = result;
            this.setDefinitieForm();
        })

        this.requestService.getRubriekWeergaves().subscribe(result => {
            this.rubriekWeergaves = result;
            this.setDefinitieForm();
        })

        this.setDefinitieForm();
    }

    setDefinitieForm() {
        this.definitieForm = new InputLayout(Onderdelen.definitie, [
            new InputTextbox({
                key          : 'schooljaar',
                label        : 'Schooljaar',
                customization: Customization.text,
                disabled     : true,
            }),
            new InputNumber({
                key          : 'leerjaar',
                label        : 'Leerjaar',
                customization: Customization.text,
            }),
            new InputNumber({
                key          : 'bodemcijfer',
                label        : 'Bodemcijfer',
                customization: Customization.text,
            }),
            new InputDropdown({
                key          : 'standaardWeergave',
                label        : 'Standaard weergave',
                customization: Customization.text,
                options      : this.createOptionsArray(this.rubriekWeergaves, 'naam')
            }),
            new InputDropdown({
                key          : 'berekeningGemiddelde',
                customization: Customization.text,
                label        : 'Berekening rapportgemiddelde',
                options      : this.createOptionsArray(this.berekeningGemiddeldes, 'naam',)
            }),
        ]).form as InputBase[];
    }

    createOptionsArray(options: any[], value: string) {
        return options.map((option, index) => {
            return { key: option.id, value: option[value] }
        })
    }

    /**
     * Saves the rapport definitie in the DataService.
     *
     * @param data
     * @param options
     */
    saveRapportDefinitie(data: { key: string; value: string; }, options: { key: number, value: string }[]): void {
        if (typeof this.definitie[data.key] === "number") {
            this.definitie[data.key] = parseInt(data.value)
        } else {
            this.definitie[data.key] = options.map((option, index) => {
                return { id: option.key, naam: option.value }
            }).find(option => option.id === parseInt(data.value));
        }
        this.requestService.updateDefinitie(this.definitie);
    }


    /**
     * Returns the right definitie value based on the key.
     *
     * @param key
     */
    getValue(key: string): string {
        if (this.definitie !== undefined) {
            let value = <string><unknown>this.definitie[key as keyof Rapportdefinitie];
            return typeof value === 'object' ? value['id'] : value.toString();
        } else {
            return ''
        }

    }
}
