import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { findElementById } from "../../../testing";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let title: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        title = findElementById(fixture, '#title');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show a title', () => {
        expect(title).toBeTruthy();
        expect(title.innerHTML).toContain('Rapport leerjaar ' + component.leerjaar);
    });
});
