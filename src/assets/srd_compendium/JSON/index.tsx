import equipmentCategoriesSRD from './5e-SRD-Equipment-Categories.json';
import equipmentSRD from './5e-SRD-Equipment.json';
import magicItemsSRD from './5e-SRD-Magic-Items.json';

const categories = [];
for (let i = 0; i < equipmentCategoriesSRD.length; i++) {
  categories.push(equipmentCategoriesSRD[i].name);
}

const weaponsData = equipmentSRD.filter((item) => item.equipment_category.name === "Weapon");
const armorData = equipmentSRD.filter((item) => item.equipment_category.name === "Armor");
const adventuringGearData = equipmentSRD.filter((item) => item.equipment_category.name === "Adventuring Gear");
const ammoData = equipmentSRD.filter((item) => item.equipment_category.name === "Ammunition");
const toolsData = equipmentSRD.filter((item) => item.equipment_category.name === "Tools");
const vehiclesData = equipmentSRD.filter((item) => item.equipment_category.name === "Vehicle");
const equipmentPacksData = equipmentSRD.filter((item) => item.equipment_category.name === "Equipment Packs");
const magicItemsData = magicItemsSRD;

export const equipmentData = {
  "Categories":       categories,
  "Weapons":          weaponsData,
  "Armour":           armorData,
  "Adventuring Gear": adventuringGearData,
  "Ammunition":       ammoData,
  "Tools":            toolsData,
  "Vehicles":         vehiclesData,
  "Equipment Packs":  equipmentPacksData,
  "Magic Items":      magicItemsData,
}