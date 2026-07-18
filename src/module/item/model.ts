import SystemBaseDataModel from "@/module/model";

const { NumberField, StringField, SchemaField, ArrayField } = foundry.data.fields;

export interface SystemItemDataSchema extends foundry.data.fields.DataSchema {
    description: InstanceType<typeof StringField<{}, {}, string>>;
}

export type SystemItemSystemData = {
    description: string;
}

export default class SystemItemDataModel
<Schema extends SystemItemDataSchema,
SystemDataType extends SystemItemSystemData
>
 extends SystemBaseDataModel<Schema, SystemDataType> {
    static defineSchema() {
        return {
            description: new StringField<{}, {}, string>({
                required: true,
                initial: ""
            })
        }
    }
}