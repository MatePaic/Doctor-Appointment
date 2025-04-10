export interface Doctor {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    address: Address;
    available: boolean
}

interface Address {
    line1: string;
    line2: string;
}