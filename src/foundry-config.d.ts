import type { SystemConfig } from "./config";

declare global {
    interface CONFIG {
        VAGABOND_VTT_SYSTEM_CONFIG: SystemConfig;
    }

    interface DataModelConfig {
        Actor: {
            hero: typeof import("./module/actor/Hero/model").default;
            nonhero: typeof import("./module/actor/Nonhero/model").default;
        };
        Item: {
            ability: typeof import("./module/item/Ability/model").default;
            action: typeof import("./module/item/Action/model").default;
            alchemicalItem: typeof import("./module/item/InventoryItem/AlchemicalItem/model").default;
            ancestry: typeof import("./module/item/Ancestry/model").default;
            armor: typeof import("./module/item/InventoryItem/Armor/model").default;
            heroClass: typeof import("./module/item/HeroClass/model").default;
            inventoryItem: typeof import("./module/item/InventoryItem/model").default;
            spell: typeof import("./module/item/Spell/model").default;
            status: typeof import("./module/item/Status/model").default;
            weapon: typeof import("./module/item/InventoryItem/Weapon/model").default;
        }
        
    }
}

export {};