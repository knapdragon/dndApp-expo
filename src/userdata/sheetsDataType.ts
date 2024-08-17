type CharacterSheetType = {
    id: number,
    name: string,
    imageURL: string,
    characterLevel: number,
    race: string,
    subrace: string,
    mainClass: string,
    multiClass: string[], // could be changed to Record<string, number>[] for specifying multiclass level?

    attributes: {
        proficiencyBonus: number, // increases at certain level milestones

        hitPointsCurrent: number,
        hitPointsMax: number,
        hitPointsTemporary: number,
        armourClass: number,

        damageResistances: string[],      // traditionally, halved damage received
        damageImmunities: string[],       // traditionally, nullifies damage received
        damageVulnerabilities: string[],  // traditionally, doubles damage received

        // traditionally measured in feet per round
        speed: number,
        flySpeed: number,
        swimSpeed: number,
        climbSpeed: number,

        abilities: {
          // ability scores should (almost?) never be negative
          strength: number,
          dexterity: number,
          constitution: number,
          intelligence: number,
          wisdom: number,
          charisma: number,

          // can be negative - changes based on ability score
          modifierStrength: number,
          modifierDexterity: number,
          modifierConstitution: number,
          modifierIntelligence: number,
          modifierWisdom: number,
          modifierCharisma: number,

          savingThrows: {
              strength: boolean,
              dexterity: boolean,
              constitution: boolean,
              intelligence: boolean,
              wisdom: boolean,
              charisma: boolean
          }
        }

        proficiencies: {
            skills: {
                acrobatics: boolean,
                "animal-handling": boolean,
                arcana: boolean,
                athletics: boolean,
                deception: boolean,
                history: boolean,
                insight: boolean,
                intimidation: boolean,
                investigation: boolean,
                medicine: boolean,
                nature: boolean,
                perception: boolean,
                performance: boolean,
                persuasion: boolean,
                religion: boolean,
                "sleight-of-hand": boolean,
                stealth: boolean,
                survival: boolean,
            },

            // name of equipment, and proficiencies are traditionally only ever true or false
            equipment: Record<string, boolean>[],
        }
    },

    actions: any[],   // types cannot reasonably be predicted

    inventory: {
        // currency may eventually be changed to Record<string, number> for customisability
        currency: {   
            Copper: number,
            Silver: number,
            Electrum: number,
            Gold: number,
            Platinum: number
        },

        // only tracks quantities; information can be retrieved on-demand,
        // such as upon viewing an item in the inventory
        items: Record<string, number>[]   
    },

    buffs: any[],   // types cannot reasonably be predicted
}

export default CharacterSheetType;