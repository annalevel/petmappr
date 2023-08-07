import Pet from "../interfaces/Pet";

export default function PetInfoWindowContent(pet: Pet): string {
    const windowContent = ` \
    <h1>${pet.name}</h1> \
    <p>Species: ${pet.species}</p> \
    <sub>ID #${pet.id}</sub> \
    `;

    return windowContent;
}