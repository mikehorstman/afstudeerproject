import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../base/base.component";

@Component({
    selector   : 'app-header',
    templateUrl: './header.component.html',
    styleUrls  : ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

    leerjaar: number = 3;

    ngOnInit(): void {
    }

    saveDefinitie() {
        this.requestService.getDefinitie().subscribe(definitie => {
            this.requestService.postDefinitie(definitie).subscribe(result => {
            })

            this.dataService.onderdelenToRemove.forEach(uuid => {
                this.requestService.deleteOnderdeel(uuid).subscribe(result => {
                })
            })
        })
    }
}
