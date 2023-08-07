export default interface Pet {
    id: number;
    name: string;
    species: string;
    location: { lat: number; lng: number; };
}