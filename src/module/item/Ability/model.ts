import SystemItemDataModel, { SystemItemDataSchema, SystemItemSystemData } from "../model";

const { NumberField, StringField, SchemaField, ArrayField } = foundry.data.fields;

export type AbilityModifierMode = "add" | "subtract" | "multiply" | "divide";

export interface AbilityModifierSchema extends foundry.data.fields.DataSchema {
    target: InstanceType<typeof StringField<{}, {}, string>>;
    value: InstanceType<typeof NumberField<{}, {}, number>>;
    mode: InstanceType<typeof StringField<{}, {}, AbilityModifierMode>>;
}

export interface AbilityDataSchema extends SystemItemDataSchema {
    modifiers: InstanceType<typeof ArrayField<InstanceType<typeof SchemaField<AbilityModifierSchema>>>>;
}

export type AbilitySystemData = SystemItemSystemData & {
    modifiers: {
        target: string;
        value: number;
        mode: AbilityModifierMode;
    }[];
}


export default class AbilityDataModel extends SystemItemDataModel<AbilityDataSchema, AbilitySystemData> {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            modifiers: new ArrayField(
                new SchemaField<AbilityModifierSchema>({
                    target: new StringField<{}, {}, string>({
                        required: true,
                    }),
                    value: new NumberField<{}, {}, number>({
                        required: true,
                        initial: 0
                    }),
                    mode: new StringField<{}, {}, AbilityModifierMode>({
                        required: true,
                        choices: ["add", "subtract", "multiply", "divide"],
                        initial: "add"
                    })
                })
            )

        }
    }
}
