export class Customization {
    static readonly padding = new Customization('padding', 'px');
    static readonly fontSize = new Customization('fontSize', 'px');
    static readonly fontFamily = new Customization('fontFamily', '');
    static readonly backgroundColor = new Customization('backgroundColor', '');
    static readonly color = new Customization('color', '');
    static readonly width = new Customization('width', 'px');
    static readonly height = new Customization('height', 'px');
    static readonly alignment = new Customization('alignment', 'px');
    static readonly title = new Customization('title', '');
    static readonly text = new Customization('text', '');
    static readonly type = new Customization('type', '');
    static readonly show = new Customization('show', '');

    private constructor(public readonly label: string, public readonly suffix: string) {
    }
}

export interface StyleModel {
    key: Customization;
    value: string;
    elementId: string;
}
