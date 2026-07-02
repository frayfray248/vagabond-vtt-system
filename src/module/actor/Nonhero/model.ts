import SystemActorDataModel, { SystemActorDataSchema, SystemActorSystemData } from "../model";

const { NumberField, StringField } = foundry.data.fields;

export enum NON_HERO_ZONE {
    FRONTLINE = "frontline",
    MIDLINE = "midline",
    BACKLINE = "backline",
}

export interface NonHeroDataSchema extends SystemActorDataSchema {
    threatLevel: InstanceType<typeof NumberField<{}, {}, number>>;
    hd: InstanceType<typeof NumberField<{}, {}, number>>;
    zone: InstanceType<typeof StringField<{}, {}, NON_HERO_ZONE>>;
    morale: InstanceType<typeof NumberField<{}, {}, number>>;
    appearing: InstanceType<typeof StringField<{}, {}, string>>;
    description: InstanceType<typeof StringField<{}, {}, string>>;
}

export interface NonHeroSystemData extends SystemActorSystemData {
    threatLevel: number;
    hd: number;
    zone: NON_HERO_ZONE;
    morale: number | null;
    appearing: string;
    description: string;
}

export default class NonheroDataModel extends SystemActorDataModel<NonHeroDataSchema, NonHeroSystemData> {
    static defineSchema(): NonHeroDataSchema {
        return {
            ...super.defineSchema(),
            threatLevel: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
            hd: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
            zone: new StringField<{}, {}, NON_HERO_ZONE>({
                required: true,
                choices: Object.values(NON_HERO_ZONE),
                initial: NON_HERO_ZONE.FRONTLINE,
            }),
            morale: new NumberField({
                required: false,
                initial: null,
                nullable: true,
                min: 0,
            }),
            appearing: new StringField({
                required: false,
                initial: "-",
            }),
            description: new StringField({
                required: false,
                initial: "",
            }),
        }
    }
}