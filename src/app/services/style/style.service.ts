import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { StyleModel } from "../../models/style.model";

@Injectable({
    providedIn: 'root'
})
export class StyleService {
    styling: StyleModel[] = [];
    currentUuid?: string;

    private styleSource = new BehaviorSubject(this.styling);

    /**
     * Sets the styling based on the given componentUuid.
     *
     * @param styling
     * @param uuid
     */
    setStyling(styling: any, uuid: string): void {
        this.currentUuid = uuid;
        this.styling = styling;
        this.styleSource.next(this.styling);
    }

    /**
     * Updates the styling.
     *
     * @param style
     */
    updateStyling(style: StyleModel): void {
        this.styling = this.styling.map(function (o) {
            return o.key.label === style.key.label && o.key.suffix === style.key.suffix && o.elementId === style.elementId ? style : o;
        });
        this.styleSource.next(this.styling);
    }

    /**
     * Gets the current styling.
     */
    getStyling(): Observable<StyleModel[]> {
        return this.styleSource.asObservable()
    }
}
