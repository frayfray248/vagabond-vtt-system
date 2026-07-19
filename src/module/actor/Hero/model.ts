import SystemActorDataModel, { SystemActorDataSchema, SystemActorSystemData } from "../model";

const { SchemaField, NumberField, BooleanField } = foundry.data.fields;

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

export const HERO_SKILL_KEY_STAT_MAP: Record<HERO_SKILL, HERO_STAT> = {
    [HERO_SKILL.ARCANA]: HERO_STAT.REASON,
    [HERO_SKILL.BRAWL]: HERO_STAT.MIGHT,
    [HERO_SKILL.CRAFT]: HERO_STAT.REASON,
    [HERO_SKILL.DETECT]: HERO_STAT.AWARENESS,
    [HERO_SKILL.FINESSE]: HERO_STAT.DEXTERITY,
    [HERO_SKILL.INFLUENCE]: HERO_STAT.PRESENCE,
    [HERO_SKILL.LEADERSHIP]: HERO_STAT.PRESENCE,
    [HERO_SKILL.MEDICINE]: HERO_STAT.REASON,
    [HERO_SKILL.MYSTICISM]: HERO_STAT.AWARENESS,
    [HERO_SKILL.PERFORMANCE]: HERO_STAT.PRESENCE,
    [HERO_SKILL.SNEAK]: HERO_STAT.DEXTERITY,
    [HERO_SKILL.SURVIVAL]: HERO_STAT.AWARENESS,
    [HERO_SKILL.MELEE]: HERO_STAT.MIGHT,
    [HERO_SKILL.RANGED]: HERO_STAT.DEXTERITY,
}

type StatFields = {
    [K in HERO_STAT]: InstanceType<typeof NumberField<{}, {}, number>>;
};

export interface SkillDataSchema extends foundry.data.fields.DataSchema {
    value: InstanceType<typeof NumberField<{}, {}, number>>;
    trained: InstanceType<typeof BooleanField>;
}

type SkillFields = {
    [K in HERO_SKILL]: InstanceType<typeof SchemaField<SkillDataSchema>>;
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
        [K in HERO_SKILL]: {
            value: number;
            trained: boolean;
        };
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
                    acc[skill] = new SchemaField<SkillDataSchema>({
                        value: new NumberField({ required: true, initial: 0, min: 0 }),
                        trained: new BooleanField({ required: true, initial: false }),
                    });
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

        // saves
        this.endure = 20 - (this.stats.might * 2);
        this.reflex = 20 - (this.stats.dexterity + this.stats.awareness);
        this.will = 20 - (this.stats.reason + this.stats.presence);

        this.maxSlots = 8 + this.stats.might;

        // speed
        const dexMod = Math.floor((this.stats.dexterity - 2) / 2);
        this.speed.normal = 25 + (dexMod * 5);
        this.speed.crawl = 75 + (dexMod * 15);
        this.speed.travel = 5 + dexMod;

        // mana
        this.mana.current = Math.min(this.mana.current, this.mana.max);

        // skills

        for (const skill of Object.values(HERO_SKILL)) {
            const keyStat = HERO_SKILL_KEY_STAT_MAP[skill];
            const keyStatValue = this.stats[keyStat];
            this.skills[skill].value = 20 - (this.skills[skill].trained ? keyStatValue * 2 : keyStatValue);
        }
    }
}