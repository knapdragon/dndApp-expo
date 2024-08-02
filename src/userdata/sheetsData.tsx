import { DND_Class } from "../assets/srd_compendium/classes";
import { Race } from "../assets/srd_compendium/races";

export type Sheet = {
    id: number,
    name: string,
    image: typeof Image,
    characterLevel: number,
    race: Race,
    mainClass: DND_Class,
    multiClass: Array<DND_Class>,
} 

const sheetsData = {
    sheets: [
        {
            id: 1,
            name: "Nohn Coe",
            image: "",
            characterLevel: 1,
            race: "Aarakocra",
            mainClass: "Cleric",
            multiClass: ["/","Fighter"],
        },
        {
            id: 2,
            name: "Yane Loe",
            image: "",
            characterLevel: 1,
            race: "Dwarf",
            mainClass: "Ranger",
            multiClass: [],
        }
    ],
};

export default sheetsData;