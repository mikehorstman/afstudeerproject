import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { InputBase } from "../../../models/input.model";

@Component({
    selector   : 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrls  : ['./checkbox-input.component.scss']
})
export class CheckboxInputComponent implements OnInit {
    @Input() value!: string;
    @Input() inputField!: InputBase;
    @Output() checkBoxChanged = new EventEmitter<{ key: string, value: string }>();
    group!: FormGroup;

    labels: any;
    selected: any;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.labels = JSON.parse(this.value);
        this.group = this.fb.group(this.labels);
    }

    /**
     * This method is called when an user checks one of the checkboxes.
     *
     * @param event
     * @param key
     */
    onCheck(event: MatCheckboxChange, key: string) {
        this.checkBoxChanged.emit({ 'key': key, 'value': JSON.stringify(this.group.value) })
    }
}
