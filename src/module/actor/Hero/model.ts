import SystemActorDataModel, { SystemActorDataSchema, SystemActorSystemData } from "../model";

const { SchemaField, NumberField } = foundry.data.fields;

export enum HERO_STAT {
    MIGHT = "might",
    DEXTERITY = "dexterity",
    AWARENESS = "awareness",
    REASON = "reason",
    PRESENCE = "presence",
    LUCK = "luck",
}

export enum HERO_SKILL {
    ARCANA = "arcana",
    BRAWL = "brawl",
    CRAFT = "craft",
    DETECT = "detect",
    FINESSE = "finesse",
    INFLUENCE = "influence",
    LEADERSHIP = "leadership",
    MEDICINE = "medicine",
    MYSTICISM = "mysticism",
    PERFORMANCE = "performance",
    SNEAK = "sneak",
    SURVIVAL = "survival",
    MELEE = "melee",
    RANGED = "ranged",
}

type StatFields = {
    [K in HERO_STAT]: InstanceType<typeof NumberField<{}, {}, number>>;
};

type SkillFields = {
    [K in HERO_SKILL]: InstanceType<typeof NumberField<{}, {}, number>>;
};

export interface ManaDataSchema extends foundry.data.fields.DataSchema {
    current: InstanceType<typeof NumberField<{}, {}, number>>;
    max: InstanceType<typeof NumberField<{}, {}, number>>;
}


export interface HeroDataSchema extends SystemActorDataSchema {
    level: InstanceType<typeof NumberField<{}, {}, number>>;
    xp: InstanceType<typeof NumberField<{}, {}, number>>;
    stats: InstanceType<typeof SchemaField<StatFields>>;
    skills: InstanceType<typeof SchemaField<SkillFields>>;
    mana: InstanceType<typeof SchemaField<ManaDataSchema>>;
    fatigue: InstanceType<typeof NumberField<{}, {}, number>>;
    endure: InstanceType<typeof NumberField<{}, {}, number>>;
    reflex: InstanceType<typeof NumberField<{}, {}, number>>;
    will: InstanceType<typeof NumberField<{}, {}, number>>;
    maxSlots: InstanceType<typeof NumberField<{}, {}, number>>;
    castingMax: InstanceType<typeof NumberField<{}, {}, number>>;
    luckPool: InstanceType<typeof NumberField<{}, {}, number>>;
}

export interface HeroSystemData extends SystemActorSystemData {
    level: number;
    xp: number;
    stats: {
        [K in HERO_STAT]: number;
    };
    skills: {
        [K in HERO_SKILL]: number;
    };
    mana: {
        current: number;
        max: number;
    };
    fatigue: number;
    endure: number;
    reflex: number;
    will: number;
    maxSlots: number;
    castingMax: number | null;
    luckPool: number;
}

export default class HeroDataModel extends SystemActorDataModel<HeroDataSchema, HeroSystemData> {

    static defineSchema(): HeroDataSchema {
        return {
            ...super.defineSchema(),
            level: new NumberField({
                required: true,
                initial: 1
            }),
            xp: new NumberField({
                required: true,
                initial: 0
            }),
            stats: new SchemaField(
                Object.values(HERO_STAT).reduce((acc, stat) => {
                    acc[stat] = new NumberField({ required: true, initial: 2, min: 2, max: 7 });
                    return acc;
                }, {} as StatFields)
            ),
            skills: new SchemaField(
                Object.values(HERO_SKILL).reduce((acc, skill) => {
                    acc[skill] = new NumberField({ required: true, initial: 0, min: 0 });
                    return acc;
                }, {} as SkillFields)
            ),
            mana: new SchemaField<ManaDataSchema>({
                current: new NumberField({
                    required: true,
                    initial: 0,
                }),
                max: new NumberField({
                    required: true,
                    initial: 0,
                })
            }),
            fatigue: new NumberField({
                required: true,
                initial: 0,
                min: 0,
                max: 5,
            }),
            endure: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
            reflex: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
            will: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
            maxSlots: new NumberField({
                required: true,
                initial: 8,
                min: 0,
            }),
            castingMax: new NumberField({
                required: false,
            }),
            luckPool: new NumberField({
                required: true,
                initial: 0,
                min: 0,
            }),
        }
    }

    prepareDerivedData(): void {
        super.prepareDerivedData();

        this.endure = 20 - (this.stats.might * 2);
        this.reflex = 20 - (this.stats.dexterity + this.stats.awareness);
        this.will = 20 - (this.stats.reason + this.stats.presence);
        this.maxSlots = 8 + this.stats.might;

        const dexMod = Math.floor((this.stats.dexterity - 2) / 2);
        this.speed.normal = 25 + (dexMod * 5);
        this.speed.crawl = 75 + (dexMod * 15);
        this.speed.travel = 5 + dexMod;

        this.mana.current = Math.min(this.mana.current, this.mana.max);
    }
}