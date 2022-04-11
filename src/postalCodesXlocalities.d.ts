declare const postalCodesXlocalities: Record<number, Locality[]>;
export = postalCodesXlocalities;

type Locality = [locality: string, onrp: number];
