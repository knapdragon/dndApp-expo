type Feat = {
    id: number,
    source: string,
    name: string,
    description: string,

    score_increases: {
        "Strength": number,
        "Dexterity": number,
        "Constitution": number,
        "Intelligence": number,
        "Wisdom": number,
        "Charisma": number,
    },

    features: Record<string, Array<any>>,
}
export type {Feat};


const featsData = {};
export default featsData;