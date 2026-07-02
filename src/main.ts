import SystemActor from "./module/actor/document";
import HeroDataModel from "./module/actor/Hero/model";
import NonheroDataModel from "./module/actor/Nonhero/model";
import { NonheroSheet } from "./module/actor/Nonhero/sheet";
import { SystemActorSheet } from "./module/actor/sheet";
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
import { VAGABOND_VTT_SYSTEM_CONFIG } from "./config";
import { HeroSheet } from "./module/actor/Hero/sheet";
import "./styles/style.css";


Hooks.once("init", () => {

    console.log("Vagabond VTT System | Initializing Vagabond VTT System");

    CONFIG.VAGABOND_VTT_SYSTEM_CONFIG = VAGABOND_VTT_SYSTEM_CONFIG;

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

    console.log("Vagabond VTT System | Registering System Actor Sheets");

    const { Actors } = foundry.documents.collections;
    const { ActorSheet } = foundry.appv1.sheets;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet(CONFIG.VAGABOND_VTT_SYSTEM_CONFIG.NAME, SystemActorSheet, { makeDefault: false });
    Actors.registerSheet(CONFIG.VAGABOND_VTT_SYSTEM_CONFIG.NAME, HeroSheet, {
        types: ["hero"],
        makeDefault: true,
    });
    Actors.registerSheet(CONFIG.VAGABOND_VTT_SYSTEM_CONFIG.NAME, NonheroSheet, {
        types: ["nonhero"],
        makeDefault: true,
    });

})