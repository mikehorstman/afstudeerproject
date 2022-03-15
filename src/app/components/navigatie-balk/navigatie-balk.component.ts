import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { OnderdelenMenuComponent } from "./onderdelen-menu/onderdelen-menu.component";
import { Tab } from "../../models/tab.model";
import { StyleService } from "../../services/style/style.service";
import { FormService } from "../../services/form/form.service";
import { DataService } from "../../services/data/data.service";
import { RubriekenMenuComponent } from "./rubrieken-menu/rubrieken-menu.component";
import { RequestService } from "../../services/request/request.service";


@Component({
    selector   : 'app-navigatie-balk',
    templateUrl: './navigatie-balk.component.html',
    styleUrls  : ['./navigatie-balk.component.scss'],

})
export class NavigatieBalkComponent extends BaseComponent implements OnInit {
    @ViewChild(OnderdelenMenuComponent) onderdelenMenu!: OnderdelenMenuComponent;
    @ViewChild(RubriekenMenuComponent) rubriekenMenu!: RubriekenMenuComponent;

    tabs: Tab[] = [
        { item: 'definitie', title: 'Rapportdefinitie bewerken', disabled: false },
        { item: 'onderdeel', title: 'Rapportonderdelen', disabled: false },
        { item: 'rubriek', title: 'Rubrieken', disabled: false }
    ];
    currentTab: Tab = this.tabs[0];

    constructor(styleService: StyleService, formService: FormService, dataService: DataService, requestService: RequestService) {
        super(formService, dataService, styleService, requestService);
    }

    ngOnInit(): void {
    }

    /**
     * This function is called on tab click(). It sets the currentTab.
     *
     * @param tab
     */
    switchTab(tab: Tab) {
        this.currentTab = tab.disabled ? this.currentTab : tab;
    }
}
