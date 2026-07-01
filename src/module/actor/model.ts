const { NumberField, StringField, SchemaField, ArrayField } = foundry.data.fields;

export enum ACTOR_SIZE {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    HUGE = "huge",
    GIANT = "giant",
    COLOSSAL = "colossal"
}

export enum BEING_TYPE {
    HUMANLIKE = "humanlike",
    ARTIFICIAL = "artificial",
    BEAST = "beast",
    CRYPTID = "cryptid",
    FAE = "fae",
    OUTER = "outer",
    PRIMORDIAL = "primordial",
    UNDEAD = "undead",
}

export enum ACTOR_SENSES {
    ALLSIGHT = "allsight",
    BLINDSIGHT = "blindsight",
    DARKSIGHT = "darksight",
    ECHOLOCATION = "echolocation",
    SEISMICSENSE = "seismicsense",
    TELEPATHY = "telepathy",
}

export enum ACTOR_STATUS {
    BERSERK = "berserk",
    BLINDED = "blinded",
    BURNING = "burning",
    CHARMED = "charmed",
    CONFUSED = "confused",
    DAZED = "dazed",
    FATIGUED = "fatigued",
    FRIGHTENED = "frightened",
    INCAPACITATED = "incapacitated",
    INVISIBLE = "invisible",
    PARALYZED = "paralyzed",
    PRONE = "prone",
    RESTRAINED = "restrained",
    SICKENED = "sickened",
    SUFFOCATING = "suffocating",
    UNCONSCIOUS = "unconscious",
    VULNERABLE = "vulnerable"
}

export interface ActorDataHPDataSchema extends foundry.data.fields.DataSchema {
    current: InstanceType<typeof NumberField<{}, {}, number>>;
    max: InstanceType<typeof NumberField<{}, {}, number>>;
}

export interface ActorDataSpeedDataSchema extends foundry.data.fields.DataSchema {
    normal: InstanceType<typeof NumberField<{}, {}, number>>;
    crawl: InstanceType<typeof NumberField<{}, {}, number>>;
    travel: InstanceType<typeof NumberField<{}, {}, number>>;
    swim: InstanceType<typeof NumberField<{}, {}, number>>;
    fly: InstanceType<typeof NumberField<{}, {}, number>>;
}

export interface SystemActorDataSchema extends foundry.data.fields.DataSchema {
    size: InstanceType<typeof StringField<{}, {}, ACTOR_SIZE>>;
    beingType: InstanceType<typeof StringField<{}, {}, BEING_TYPE>>;
    hp: InstanceType<typeof SchemaField<ActorDataHPDataSchema>>;
    speed: InstanceType<typeof SchemaField<ActorDataSpeedDataSchema>>;
    armor: InstanceType<typeof NumberField<{}, {}, number>>;
    senses: InstanceType<typeof ArrayField<InstanceType<typeof StringField<{}, {}, ACTOR_SENSES>>>>;
    immune: InstanceType<typeof StringField<{}, {}, string>>;
    weak: InstanceType<typeof StringField<{}, {}, string>>;
    statuses: InstanceType<typeof ArrayField<InstanceType<typeof StringField<{}, {}, ACTOR_STATUS>>>>;
}

export type SystemActorSystemData = {
    size: ACTOR_SIZE;
    beingType: BEING_TYPE;
    hp: {
        current: number;
        max: number;
    };
    speed: {
        normal: number;
        crawl: number | null;
        travel: number | null;
        swim: number | null;
        fly: number | null;
    };
    armor: number;
    senses: ACTOR_SENSES[];
    immune: string;
    weak: string;
    statuses: ACTOR_STATUS[];
}

export default class SystemActorDataModel<
    Schema extends SystemActorDataSchema,
    SystemDataType extends SystemActorSystemData
> extends foundry.abstract.TypeDataModel<Schema, any> {
    static defineSchema(): SystemActorDataSchema {
        return {
            size: new StringField<{}, {}, ACTOR_SIZE>({
                required: true,
                choices: Object.values(ACTOR_SIZE),
                initial: ACTOR_SIZE.MEDIUM
            }),
            beingType: new StringField<{}, {}, BEING_TYPE>({
                required: false,
                choices: Object.values(BEING_TYPE)
            }),
            hp: new SchemaField<ActorDataHPDataSchema>({
                current: new NumberField({
                    required: true,
                    initial: 0,
                    min: 0
                }),
                max: new NumberField({
                    required: true,
                    initial: 0,
                    min: 0
                })
            }),
            speed: new SchemaField<ActorDataSpeedDataSchema>({
                normal: new NumberField({
                    required: true,
                    initial: 0,
                    min: 0,
                }),
                crawl: new NumberField({
                    required: false,
                    initial: null,
                    nullable: true,
                }),
                travel: new NumberField({
                    required: false,
                    initial: null,
                    nullable: true,
                }),
                swim: new NumberField({
                    required: false,
                    initial: null,
                    nullable: true,
                }),
                fly: new NumberField({
                    required: false,
                    initial: null,
                    nullable: true,
                }),
            }),
            armor: new NumberField({
                required: true,
                initial: 0,
            }),
            senses: new ArrayField(
                new StringField<{}, {}, ACTOR_SENSES>({
                    required: false,
                    choices: Object.values(ACTOR_SENSES)
                })
            ),
            immune: new StringField({
                required: false,
                initial: ""
            }),
            weak: new StringField({
                required: false,
                initial: ""
            }),
            statuses: new ArrayField(
                new StringField<{}, {}, ACTOR_STATUS>({
                    required: false,
                    choices: Object.values(ACTOR_STATUS)
                })
            )
        };
    }

    prepareDerivedData(): void {
        this.hp.current = Math.min(this.hp.current, this.hp.max);
    }

    toPlainObject(): SystemDataType {
        const plainObject: unknown = {
            ...this,
        };

        return plainObject as SystemDataType;
    }
}