import SystemActor from "./module/actor/document";
import HeroDataModel from "./module/actor/Hero/model";
import NonheroDataModel from "./module/actor/Nonhero/model";
import SystemItem from "./module/item/document";
import AbilityDataModel from "./module/item/Ability/model";
import ActionDataModel from "./module/item/Action/model";
import AncestryDataModel from "./module/item/Ancestry/model";
import HeroClassDataModel from "./module/item/HeroClass/model";
import SpellDataModel from "./module/item/Spell/model";
import StatusDataModel from "./module/item/Status/model";
import InventoryItemDataModel from "./module/item/InventoryItem/model";
import WeaponDataModel from "./module/item/InventoryItem/Weapon/model";
import ArmorDataModel from "./module/item/InventoryItem/Armor/model";
import AlchemicalItemDataModel from "./module/item/InventoryItem/AlchemicalItem/model";


Hooks.once("init", () => {

    console.log("Vagabond VTT System | Initializing Vagabond VTT System");


    console.log("Vagabond VTT System | Registering System Actors");
    CONFIG.Actor.documentClass = SystemActor;
    
    CONFIG.Actor.dataModels.hero = HeroDataModel;
    CONFIG.Actor.dataModels.nonhero = NonheroDataModel;

    console.log(`Vagabond VTT System | Registered Actors: ${Object.keys(CONFIG.Actor.dataModels).join(", ")}`);

    console.log("Vagabond VTT System | Registering System Items");
    CONFIG.Item.documentClass = SystemItem;

    CONFIG.Item.dataModels = {
        ability: AbilityDataModel,
        action: ActionDataModel,
        alchemicalItem: AlchemicalItemDataModel,
        ancestry: AncestryDataModel,
        armor: ArmorDataModel,
        heroClass: HeroClassDataModel,
        inventoryItem: InventoryItemDataModel,
        spell: SpellDataModel,
        status: StatusDataModel,
        weapon: WeaponDataModel,
    }

    console.log(`Vagabond VTT System | Registered Items: ${Object.keys(CONFIG.Item.dataModels).join(", ")}`);

    
})