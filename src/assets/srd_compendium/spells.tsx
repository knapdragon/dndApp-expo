import { DND_Class, DND_Subclass } from "./classes";

export type Spell = {
    id: number,
    source: string,
    name: string,
    spellLevel: number | string, // cantrips = spellLevel 0
    mainClass: DND_Class,
    subClass: DND_Subclass,
    school: string,

    castTime: ["Action", "Bonus action", "Reaction", "Free action"],
    range: string,
    duration: string,
    components: {
        "Verbal": Boolean,
        "Somatic": Boolean,
        "Material": string,
    },
    description: string,
    upcastEffects: string | Array<String> | Record<number, string>,
}

const spellsData = {};
export default spellsData;