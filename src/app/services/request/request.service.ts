import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { BerekeningGemiddelde, Rapportdefinitie, RapportRubriekWeergave, RapportToetsonderdeel } from "../../models/rapport.model";
import { HttpClient } from "@angular/common/http";
import { RapportRubriekWeergaveType } from "../../models/enums.model";

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    rootURL = 'http://localhost:3080/api';

    currentLeerjaar: number = 3;
    definitie: Rapportdefinitie = {
        id                  : 1,
        uuid                : '1234',
        leerjaar            : 1,
        bodemcijfer         : 69,
        schooljaar          : {
            startDate: new Date(2020, 9, 1),
            endDate  : new Date(2021, 7, 1),
            naam     : '2020/2021',
        },
        standaardWeergave   : {
            naam: 'grafiek',
            type: RapportRubriekWeergaveType.SMILEY
        },
        rubrieken           : [[]],
        onderdelen          : [],
        berekeningGemiddelde: {
            naam: ''
        },
        styling             : [],
        rubriekStyling      : [],
        pageAmount          : 10,
        x                   : 0,
        y                   : 0
    }
    toetsOnderdelen: RapportToetsonderdeel[] = [
        {
            weging        : 1,
            toetsOnderdeel: {
                naam              : 'onderdeel1',
                schoolMethodeToets: {
                    naam                   : 'Taal',
                    leerjaar               : 1,
                    schoolvak              : 'Nederlands',
                    meestRecenteAfnameDatum: new Date().toDateString(),
                }
            }
        },
        {
            weging        : 1,
            toetsOnderdeel: {
                naam              : 'onderdeel2',
                schoolMethodeToets: {
                    naam                   : 'Spelling',
                    leerjaar               : 1,
                    schoolvak              : 'Nederlands',
                    meestRecenteAfnameDatum: new Date().toDateString(),
                }
            }
        },
        {
            weging        : 1,
            toetsOnderdeel: {
                naam              : 'onderdeel3',
                schoolMethodeToets: {
                    naam                   : 'Woordenschat',
                    leerjaar               : 1,
                    schoolvak              : 'Nederlands',
                    meestRecenteAfnameDatum: new Date().toDateString(),
                }
            }
        }
    ]

    private definitieSource = new BehaviorSubject(this.definitie);

    private readySource = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
        this.loadDefinitie().subscribe(definitie => {
            this.definitie = definitie;
            this.definitieSource.next(this.definitie)
            this.readySource.next(true);
        })
    }

    isReady() {
        return this.readySource.asObservable();
    }

    loadDefinitie() {
        return this.http.get<Rapportdefinitie>(this.rootURL + '/definitie', { params: { leerjaar: this.currentLeerjaar } });
    }

    getDefinitie(): Observable<Rapportdefinitie> {
        return this.definitieSource.asObservable();
    }

    setDefinitie(definitie: Rapportdefinitie) {
        this.definitieSource.next(definitie);
    }

    postDefinitie(definitie: any) {
        return this.http.post<Rapportdefinitie>(this.rootURL + '/definitie', { definitie: JSON.stringify(definitie) });
    }

    deleteOnderdeel(uuid: string) {
        return this.http.delete(this.rootURL + '/onderdeel/' + uuid)
    }

    getToetsOnderdelen(): Observable<RapportToetsonderdeel[]> {
        return of(this.toetsOnderdelen);
    }

    getRubriekWeergaves() {
        return this.http.get<RapportRubriekWeergave[]>(this.rootURL + '/weergave');
    }

    updateDefinitie(definitie: Rapportdefinitie) {
        this.definitie = definitie;
        this.definitieSource.next(this.definitie);
    }

    getBerekeningGemiddeldes() {
        return this.http.get<BerekeningGemiddelde[]>(this.rootURL + '/gemiddelde');
    }
}


