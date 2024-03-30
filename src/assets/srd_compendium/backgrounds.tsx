import {DND_Item} from './items.tsx';

type Background = {
    id: number,
    source: string,
    name: string,
    description: string,
    benefits: {
        skillProficiencies: Array<String>,
        toolProficiencies: Array<String>,
        languages: Array<String>,
        equipment: Array<DND_Item>,
    },

    features: Record<string, Array<any>>,
    
    // flavour
    personalityTraits: Array<String>,
    ideals: Array<String>,
    bonds: Array<String>,
    flaws: Array<String>,
}

export type {Background};

const backgroundsData = {};
export default backgroundsData;