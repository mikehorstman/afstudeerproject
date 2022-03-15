import { Component, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { RequestService } from "./services/request/request.service";
import { DataService } from "./services/data/data.service";
import { RapportOnderdeelComponent } from "./components/rapport-onderdelen/rapport-onderdeel/rapport-onderdeel.component";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],

})
export class AppComponent {
    title: string = 'digitale-rapport-editor';

    componentRef!: ComponentRef<any>;
    factory = this.componentFactoryResolver.resolveComponentFactory(RapportOnderdeelComponent);
    constructor(private requestService: RequestService, private resolver: ComponentFactoryResolver, private dataService: DataService, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {

    }
}
