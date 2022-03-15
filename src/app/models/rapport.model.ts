import { Onderdelen, RapportRubriekWeergaveType } from "./enums.model";
import { StyleModel } from "./style.model";

export interface RapportCijferSchaal {
    toonOpLegenda: boolean;
    naam: string;
    opties: RapportCijferSchaalOptie[];
    key: number;
}

export interface RapportCijferSchaalOptie {
    tekst: string;
    van: number;
    tot: number;
}

export interface Rapportdefinitie {
    id: number;
    leerjaar?: number;
    bodemcijfer?: number;
    standaardWeergave?: RapportRubriekWeergave;
    berekeningGemiddelde?: BerekeningGemiddelde;
    schooljaar?: Schooljaar;
    rubrieken: [RapportRubriek[]];
    onderdelen: RapportOnderdeel[];
    styling: StyleModel[];
    rubriekStyling: StyleModel[];
    pageAmount: number;
    uuid: string;
    x: number;
    y: number;
}

export interface RapportOnderdeel {
    id?: number;
    type: Onderdelen;
    styling: StyleModel[];
    definitie: number;
    page: number;
    uuid: string;
    x: number;
    y: number;
}

export interface RapportRubriekWeergave {
    id?: number;
    naam: string;
    type: RapportRubriekWeergaveType;
}

export interface OpmerkingRubriek {
    leerling?: number;
    rubriek: RapportRubriek;
    tekst: string;
}

export interface Schooljaar {
    id?: number;
    startDate: Date;
    endDate: Date;
    naam: string;
}

export interface BerekeningGemiddelde {
    id?: number;
    naam: string;
}

export interface SchoolMethodeToetsonderdeel {
    naam: string;
    volgnummer?: number;
    afkorting?: string;
    schoolMethodeToets: SchoolMethodeToets;
}

export interface SchoolMethodeToets {
    naam: string;
    leerjaar: number;
    schoolvak: string;
    onderdelen?: SchoolMethodeToetsonderdeel[];
    meestRecenteAfnameDatum: string;
}

export interface RapportRubriek {
    rapportDefinitie?: Rapportdefinitie;
    subrubrieken: RapportSubrubriek[];
    opmerkingen: OpmerkingRubriek[];
    volgnummer?: number;
    naam: string;
    is_active: boolean;
    uuid: string;
    page:number;
    styling: StyleModel[];
}

export interface RapportSubrubriek {
    weergave?: RapportRubriekWeergave;
    rubriek?: RapportRubriek;
    toetsOnderdelen: RapportToetsonderdeel[];
    cijfers: RapportCijfer[];
    berekeningGemiddelde: BerekeningGemiddelde;
    naam: string;
    isActive: boolean;
    uuid: string;
}

export interface RapportToetsonderdeel {
    weging: number;
    rapportRubriek?: RapportSubrubriek;
    toetsOnderdeel: SchoolMethodeToetsonderdeel
}

export interface RapportCijfer {
    cijfer: number;
}




