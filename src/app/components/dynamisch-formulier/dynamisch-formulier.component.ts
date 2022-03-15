import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { InputBase } from "../../models/input.model";

@Component({
    selector     : 'app-dynamisch-formulier',
    templateUrl  : './dynamisch-formulier.component.html',
    styleUrls    : ['./dynamisch-formulier.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamischFormulierComponent {
    @Input() inputField!: InputBase;
    @Input() value!: string;
    @Output() dataChanged = new EventEmitter<{ key: string, value: string }>();

    /**
     * This method is called when the user fills in the input field. It sends the input value to the parent component.
     *
     * @param event
     * @param key
     */
    onInput(event: Event, key: string): void {
        this.dataChanged.emit({ 'key': key, 'value': (event.target as HTMLInputElement).value })
    }

    /**
     * This method is called when the user selects a value from the input dropdown. It sends the input value to the parent component.
     *
     * @param event
     * @param key
     */
    onSelect(event: MatSelectChange, key: string): void {
        this.dataChanged.emit({ 'key': key, 'value': event.value })
    }

    onCheck(event: { key: string; value: string }): void {
        this.dataChanged.emit(event)
    }

    /**
     * This method is called when the user selects a value from the input buttons. It sends the input value to the parent component.
     *
     * @param value
     * @param key
     */
    onClick(value: string, key: string): void {
        this.dataChanged.emit({ 'key': key, 'value': value })
    }

    /**
     * Checks if the two parameters are the same.
     *
     * @param value
     * @param option
     */
    isSelected(value: string, option: string): boolean {
        return value === option;
    }
}
