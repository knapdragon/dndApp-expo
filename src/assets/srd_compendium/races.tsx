type Race = {
    id: number,
    source: string,
    name: string,

    // Flavour
    age: string,
    alignment: string,
    size: string,
    languages: Array<String>,
    description: string,

    // Speeds
    baseWalkSpeed: number,
    baseFlySpeed: number,
    baseClimbSpeed: number,
    baseSwimSpeed: number,

    // Mechanics
    score_increases: {
        "Strength": number,
        "Dexterity": number,
        "Constitution": number,
        "Intelligence": number,
        "Wisdom": number,
        "Charisma": number,
    },
    dmgResists: Array<String>,
    dmgVulns: Array<String>,

    // Racial specific features
    racialFeatures: Record<string, Array<any>>,
}

interface Subrace extends Race {
    name: string,

    score_increases: {
        "Strength": number,
        "Dexterity": number,
        "Constitution": number,
        "Intelligence": number,
        "Wisdom": number,
        "Charisma": number,
    },
    subRacialFeatures: Record<string, Array<any>>,
}

export type {Race, Subrace};


const racesData = {};
export default racesData;