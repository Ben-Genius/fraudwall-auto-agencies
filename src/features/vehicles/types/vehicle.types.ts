export interface AccidentRecord {
    date: string;
    location: string;
    accidentNumber: number;
    _id: string;
}

export interface EventRecord {
    date: string;
    location: string;
    source: string[];
    odometer: string;
    details: string[];
    _id: string;
}

export interface OwnerRecord {
    type: string;
    purchasedYear: string;
    state: string;
    ownedDuration: string;
    _id: string;
}

export interface RecallRecord {
    date: string;
    recallNumber: string;
    component: string;
    _id: string;
}

export interface SalesRecord {
    date: string;
    price: string;
    dealerName: string;
    sellerCity: string;
    sellerState: string;
    odometer: string;
    _id: string;
}

export interface VehicleHistory {
    _id: string;
    vin: string;
    make: string;
    year: string;
    summary: string;
    accidents: AccidentRecord[];
    events: EventRecord[];
    owners: OwnerRecord[];
    recalls: RecallRecord[];
    salesHistory: SalesRecord[];
    titleBrands: Record<string, string>;
    usage: Record<string, string>;
    createdAt: string;
    updatedAt: string;
    retrievedAt: string;
    service: string;
}
