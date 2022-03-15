import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatieBalkComponent } from './components/navigatie-balk/navigatie-balk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { MatSliderModule } from "@angular/material/slider";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { FormService } from "./services/form/form.service";
import { MatSelectModule } from "@angular/material/select";
import { DefinitieMenuComponent } from './components/navigatie-balk/definitie-menu/definitie-menu.component';
import { OnderdelenMenuComponent } from './components/navigatie-balk/onderdelen-menu/onderdelen-menu.component';
import { RubriekenMenuComponent } from './components/navigatie-balk/rubrieken-menu/rubrieken-menu.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { LogoComponent } from './components/rapport-onderdelen/logo/logo.component';
import { GrafiekComponent } from './components/rapport-onderdelen/grafiek/grafiek.component';
import { LegendaComponent } from './components/rapport-onderdelen/legenda/legenda.component';
import { HandtekeningComponent } from './components/rapport-onderdelen/handtekening/handtekening.component';
import { OpmerkingComponent } from './components/rapport-onderdelen/opmerking/opmerking.component';
import { DefinitieComponent } from './components/rapport-onderdelen/definitie/definitie.component';
import { RapportOnderdeelComponent } from './components/rapport-onderdelen/rapport-onderdeel/rapport-onderdeel.component';
import { HeaderComponent } from "./components/header/header.component";
import { RapportComponent } from "./components/rapport/rapport.component";
import { BottomBarComponent } from "./components/bottom-bar/bottom-bar.component";
import { DynamischFormulierComponent } from "./components/dynamisch-formulier/dynamisch-formulier.component";
import { BewerkMenuComponent } from "./components/bewerk-menu/bewerk-menu.component";
import { BaseComponent } from "./components/base/base.component";
import { MatRadioModule } from "@angular/material/radio";
import { ResultatenWeergaveComponent } from "./components/resultaten/resultaten-weergave/resultaten-weergave.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CheckboxInputComponent } from './components/dynamisch-formulier/checkbox-input/checkbox-input.component';
import { RubriekComponent } from './components/rapport-onderdelen/rubriek/rubriek.component';
import { ToetsOnderdeelModalComponent } from './components/toets-onderdeel-modal/toets-onderdeel-modal.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { TabelComponent } from './components/tabel/tabel.component';
import { createCustomElement } from "@angular/elements";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { RubriekenLijstComponent } from './components/rubrieken-lijst/rubrieken-lijst.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigatieBalkComponent,
        HeaderComponent,
        RapportComponent,
        BottomBarComponent,
        BewerkMenuComponent,
        BaseComponent,
        DynamischFormulierComponent,
        DefinitieMenuComponent,
        OnderdelenMenuComponent,
        RubriekenMenuComponent,
        LogoComponent,
        GrafiekComponent,
        LegendaComponent,
        HandtekeningComponent,
        OpmerkingComponent,
        DefinitieComponent,
        RapportOnderdeelComponent,
        ResultatenWeergaveComponent,
        CheckboxInputComponent,
        RubriekComponent,
        ToetsOnderdeelModalComponent,
        TabelComponent,
        RubriekenLijstComponent,
    ],
    imports     : [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        MatSliderModule,
        DragDropModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        NgApexchartsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        HttpClientModule
    ],
    providers   : [FormService],
    entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {

    constructor(private injector: Injector) {
        const webComponent = createCustomElement(RapportComponent, { injector });
        customElements.define('rapport-view', webComponent);
    }

    ngDoBootstrap(appRef: ApplicationRef): void {
        if (document.querySelector('app-root')) {
            appRef.bootstrap(AppComponent);
        }
    }
}
