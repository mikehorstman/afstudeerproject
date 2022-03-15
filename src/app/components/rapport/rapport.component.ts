import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, Injector, Input, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { LogoComponent } from "../rapport-onderdelen/logo/logo.component";
import { GrafiekComponent } from "../rapport-onderdelen/grafiek/grafiek.component";
import { LegendaComponent } from "../rapport-onderdelen/legenda/legenda.component";
import { DefinitieComponent } from "../rapport-onderdelen/definitie/definitie.component";
import { OpmerkingComponent } from "../rapport-onderdelen/opmerking/opmerking.component";
import { HandtekeningComponent } from "../rapport-onderdelen/handtekening/handtekening.component";
import { RapportOnderdeelComponent } from "../rapport-onderdelen/rapport-onderdeel/rapport-onderdeel.component";
import { FormService } from "../../services/form/form.service";
import { DataService } from "../../services/data/data.service";
import { StyleService } from "../../services/style/style.service";
import { Onderdelen } from "../../models/enums.model";
import { Customization, StyleModel } from "../../models/style.model";
import { RubriekComponent } from "../rapport-onderdelen/rubriek/rubriek.component";
import { RequestService } from "../../services/request/request.service";
import { Rapportdefinitie, RapportOnderdeel } from "../../models/rapport.model";
import { v4 as uuid } from 'uuid';

@Component({
    selector   : 'app-rapport',
    templateUrl: './rapport.component.html',
    styleUrls  : ['./rapport.component.scss'],
})
export class RapportComponent extends BaseComponent implements OnInit {
    @Input() leerjaar!: number;

    componentRef!: ComponentRef<any>;
    factory = this.componentFactoryResolver.resolveComponentFactory(RapportOnderdeelComponent);

    currentPage: number = 1;
    pages: number[] = new Array(1);
    mainElement: string = 'rapport-page';
    rapportDefinitie!: Rapportdefinitie;
    uuid = '1234';

    constructor(formService: FormService, dataService: DataService, styleService: StyleService, requestService: RequestService, private renderer: Renderer2, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private app: ApplicationRef) {
        super(formService, dataService, styleService, requestService);
    }

    /**
     * It sends the default styling of the rapport page and sends it to the StyleService. It subscribes to the StyleService so it knows when to update
     * the styling. There is also a subscription to the DataService, so it knows when to add a new onderdeel to the rapport.
     */
    ngOnInit(): void {
        this.requestService.currentLeerjaar = this.leerjaar;
        this.requestService.isReady().subscribe(data => {
            if (data) {
                this.appendStylingOnEveryPage(this.requestService.definitie.styling)
                this.styling = this.requestService.definitie.styling
                this.styleService.setStyling(this.styling, this.uuid);
                this.rapportDefinitie = this.requestService.definitie;
                this.setRubriekPosition();
                this.dataService.setNumberOfPages(this.rapportDefinitie.pageAmount)
            }

            this.requestService.definitie.onderdelen.forEach(onderdeel => {
                this.loadOnderdeelOnRapport(onderdeel);
            })

            this.dataService.getCurrentPage().subscribe(page => {
                    this.currentPage = page;
                }
            )
        })

        this.setDefaultStyling([
            { key: Customization.fontSize, value: '12', elementId: this.mainElement },
            { key: Customization.backgroundColor, value: '#FFFFFF', elementId: this.mainElement },
            { key: Customization.fontFamily, value: 'Ubuntu', elementId: this.mainElement },
            { key: Customization.padding, value: '20', elementId: this.mainElement }
        ])

        this.styleService.setStyling(this.styling, this.uuid);
        this.styleService.getStyling().subscribe(styling => {
            this.appendStylingOnEveryPage(styling)
        })

        this.dataService.getNewOnderdeel().subscribe(onderdeel => {
            if (this.rapportDefinitie !== undefined) {
                this.addOnderdeel(onderdeel)

            }
        })

        this.dataService.getNumberOfPages().subscribe(amount => {
            for (let i = 0; i < amount; i++) {
                if (this.pages.length !== amount) {
                    this.addPage();
                }
            }
        })
    }

    setRubriekPosition() {
        setTimeout(() => {
            let element = document.getElementById('rubriek-list-' + this.uuid);
            element!.style.cssText = 'position:absolute; left:' + (this.rapportDefinitie.x)
                                     + 'px; top:' + (this.rapportDefinitie.y) + 'px; width:200;';
        }, 1);
    }

    /**
     * Adds an extra page to the rapport. It then appends the styling to the newly added page.
     */
    addPage(): void {
        this.pages.push(1)

        setTimeout(() => {
            this.appendStylingOnEveryPage(this.styling);
        }, 1);
    }

    /**
     * This function appends the styling to every rapport page.
     *
     * @param styling
     */
    appendStylingOnEveryPage(styling: StyleModel[]): void {
        let pages = document.getElementsByClassName('rapport-page');
        for (let i = 0; i < pages.length; i++) {
            this.appendStyling(styling, i.toString());
        }
    }

    getOnderdeelType(type: Onderdelen) {
        switch (type) {
            case Onderdelen.logo:
                return this.componentFactoryResolver.resolveComponentFactory(LogoComponent);
            case Onderdelen.grafiek:
                return this.componentFactoryResolver.resolveComponentFactory(GrafiekComponent);
            case Onderdelen.legenda:
                return this.componentFactoryResolver.resolveComponentFactory(LegendaComponent);
            case Onderdelen.definitie:
                return this.componentFactoryResolver.resolveComponentFactory(DefinitieComponent);
            case Onderdelen.opmerking:
                return this.componentFactoryResolver.resolveComponentFactory(OpmerkingComponent);
            case Onderdelen.handtekening:
                return this.componentFactoryResolver.resolveComponentFactory(HandtekeningComponent);
            case Onderdelen.rubriek:
                return this.componentFactoryResolver.resolveComponentFactory(RubriekComponent);
        }
        return this.componentFactoryResolver.resolveComponentFactory(LogoComponent);
    }

    /**
     * Adds an new onderdeel to the current page, based on the given onderdeelType.
     *
     * @param onderdeelType
     */
    addOnderdeel(onderdeelType: Onderdelen): void {
        const uniqueId = uuid();
        this.appendOnderdeelToRapport(onderdeelType, this.currentPage, uniqueId );
        let page = document.getElementById('rapport-page-' + (this.currentPage - 1));

        const pagePadding = page?.style.padding;
        this.componentRef.location.nativeElement.style.cssText = 'position:absolute; left:' + pagePadding
                                                                 + '; top:' + pagePadding + '; width:200;';

        if (onderdeelType !== Onderdelen.rapport) {
            this.rapportDefinitie.onderdelen.push({
                type     : onderdeelType,
                definitie: this.rapportDefinitie.id,
                page     : this.currentPage,
                styling  : this.componentRef.instance.styling,
                uuid     : uniqueId,
                x        : 0,
                y        : 0
            })

        }
        this.requestService.updateDefinitie(this.rapportDefinitie)
    }

    loadOnderdeelOnRapport(onderdeel: RapportOnderdeel) {
        setTimeout(() => {
            this.appendOnderdeelToRapport(onderdeel.type, onderdeel.page, onderdeel.uuid)

            this.componentRef.instance.addStyle(onderdeel.styling, onderdeel.uuid);

            this.componentRef.instance.setDefaultStyling(onderdeel.styling)
            this.componentRef.location.nativeElement.style.cssText = 'position:absolute; left:' + (onderdeel.x)
                                                                     + 'px; top:' + (onderdeel.y) + 'px; width:200;';
        }, 1);
    }

    appendOnderdeelToRapport(type: Onderdelen, page: number, uuid: string){
        this.factory = this.getOnderdeelType(type);
        let innerPage = document.getElementById('inner-page-' + (page - 1))

        this.componentRef = this.factory.create(this.injector, []);
        this.componentRef.instance['boundary'] = innerPage;

        this.componentRef.instance.uuid = uuid;

        innerPage?.appendChild(this.componentRef.location.nativeElement);
        this.dataService.components.push(this.componentRef);

        this.app.attachView(this.componentRef.hostView);
    }

    /**
     * Zooms the rapport pages based on the given zoomValue.
     *
     * @param zoomValue
     */
    zoomPage(zoomValue: number): void {
        const rapport = document.getElementById('rapport')!;

        rapport.style.transform = 'scale(' + (zoomValue / 100) + ')';
        rapport.style.transformOrigin = 'center top';
    }
}
