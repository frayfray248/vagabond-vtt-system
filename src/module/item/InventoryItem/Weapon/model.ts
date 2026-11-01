import InventoryItemDataModel, { InventoryItemDataSchema, InventoryItemSystemData } from "../model";
import { HERO_SKILL } from "@module/actor/Hero/model";

const { ArrayField, StringField } = foundry.data.fields;

export enum WEAPON_PROPERTY {
    CLEAVE = "cleave",
    DEFENSE = "defense",
    GRAPPLE = "grapple",
    KEEN = "keen",
    LONG = "long",
    THROWN = "thrown",
    VICIOUS = "vicious",
}

export enum WEAPON_RANGE {
    NEAR = "near",
    CLOSE = "close",
    FAR = "far",
}

export enum WEAPON_GRIP {
    TWO_HANDED = "2H",
    ONE_HANDED = "1H",
    VERSATILE = "V",
}

export interface WeaponDataSchema extends InventoryItemDataSchema {
    types: InstanceType<typeof ArrayField<InstanceType<typeof StringField<{}, {}, HERO_SKILL>>>>;
    properties: InstanceType<typeof ArrayField<InstanceType<typeof StringField<{}, {}, WEAPON_PROPERTY>>>>;
    range: InstanceType<typeof StringField<{}, {}, WEAPON_RANGE>>;
    grip: InstanceType<typeof StringField<{}, {}, WEAPON_GRIP>>;
    damage: InstanceType<typeof StringField<{}, {}, string>>;
}

export interface WeaponSystemData extends InventoryItemSystemData {
    types: HERO_SKILL[];
    properties: WEAPON_PROPERTY[];
    range: WEAPON_RANGE;
    grip: WEAPON_GRIP;
    damage: string;
}

export default class WeaponDataModel extends InventoryItemDataModel<WeaponDataSchema, WeaponSystemData> {
    static defineSchema(): WeaponDataSchema {
        return {
            ...super.defineSchema(),
            types: new ArrayField(
                new StringField<{}, {}, HERO_SKILL>({
                    required: false,
                    choices: Object.values(HERO_SKILL),
                })
            ),
            properties: new ArrayField(
                new StringField<{}, {}, WEAPON_PROPERTY>({
                    required: false,
                    choices: Object.values(WEAPON_PROPERTY),
                })
            ),
            range: new StringField<{}, {}, WEAPON_RANGE>({
                required: false,
                choices: Object.values(WEAPON_RANGE),
            }),
            grip: new StringField<{}, {}, WEAPON_GRIP>({
                required: false,
                choices: Object.values(WEAPON_GRIP),
            }),
            damage: new StringField({
                required: false,
                initial: "",
            }),
        }
    }
}