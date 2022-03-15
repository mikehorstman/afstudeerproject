import { Customization } from "./style.model";

export class InputLayout {
    type: number;
    form: (InputCategory|InputBase)[];

    constructor(type: number, form: (InputCategory|InputBase)[]) {
        this.type = type;
        this.form = form;
    }
}

export class InputCategory {
    title: string;
    key: string;
    options: InputBase[];
    grid: string;

    constructor(title: string, key: string, grid: string, options: InputBase[]) {
        this.title = title;
        this.key = key;
        this.options = options;
        this.grid = grid;
    }
}

export class InputBase {
    key: string;
    customization: Customization;
    label: string;
    controlType: string;
    disabled: boolean;
    options: { key: number, value: string }[];

    constructor(options: {
        key?: string;
        customization?: Customization
        label?: string;
        controlType?: string;
        disabled?: boolean;
        options?: { key: number, value: string }[];
    } = {}) {
        this.key = options.key || '';
        this.customization = options.customization || Customization.width;
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.disabled = options.disabled || false;
        this.options = options.options || [];
    }
}

export class InputNumber extends InputBase {
    controlType = 'number';
}

export class InputTextbox extends InputBase {
    controlType = 'textbox';
}

export class InputDropdown extends InputBase {
    controlType = 'dropdown';
}

export class InputButton extends InputBase {
    controlType = 'button';
}

export class InputCheckbox extends InputBase {
    controlType = 'checkbox';
}
