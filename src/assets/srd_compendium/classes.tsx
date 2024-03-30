import { DND_Item, Armour, Weapon } from "./items";
import { Spell } from './spells';

type DND_Class = {
    id: number,
    name: string,
    level: number | string,
    hitDiceType: string,

    proficiencies: {
        Armour: Array<Armour>,
        Weapons: Array<Weapon>,
        Tools: Array<DND_Item>,
        SavingThrows: Array<String>,
        Skills: Array<String>,
    },
    equipment: Array<DND_Item>,

    spellInfo: {
        canPrepare: Boolean,
        spellSlots: {
            "1st_level": number,
            "2nd_level": number,
            "3rd_level": number,
            "4th_level": number,
            "5th_level": number,
            "6th_level": number,
            "7th_level": number,
            "8th_level": number,
            "9th_level": number,
        },
        spellsPrepared: Array<Spell>,
        spellSaveDC: number,
        spellAttackModifier: number,  
        
        classSpellList: Array<Spell>,
    },

    classFeatures: Record<string, Array<any>>,
}

interface DND_Subclass extends DND_Class {
    name: string,
    subClassFeatures: Record<string, Array<any>>,
    subClassSpellList: Array<Spell>,
}

export type {DND_Class, DND_Subclass};


const classesData = {};
export default classesData;