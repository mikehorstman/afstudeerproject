import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function findElementById(fixture: ComponentFixture<any>, id: string) {
    return fixture.nativeElement.querySelector(id);
}

export function findElementByCSS(fixture: ComponentFixture<any>, selector: string) {
    return fixture.debugElement.query(By.css(selector));
}

export function findElementsByClass(fixture: ComponentFixture<any>, selector: string) {
    return fixture.debugElement.queryAll(By.css(selector));
}
