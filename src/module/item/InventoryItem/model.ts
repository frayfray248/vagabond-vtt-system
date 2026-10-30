import SystemItemDataModel from "../model";

const { NumberField } = foundry.data.fields;

export interface InventoryItemDataSchema extends foundry.data.fields.DataSchema {
    cost: InstanceType<typeof NumberField<{}, {}, number>>;
    slots: InstanceType<typeof NumberField<{}, {}, number>>;
}

export type InventoryItemSystemData = {
    cost: number;
    slots: number;
}

export default class InventoryItemDataModel<
    Schema extends InventoryItemDataSchema = InventoryItemDataSchema,
    SystemDataType extends InventoryItemSystemData = InventoryItemSystemData
> extends SystemItemDataModel<Schema, SystemDataType> {
    static defineSchema(): InventoryItemDataSchema {
        return {
            ...super.defineSchema(),
            cost: new NumberField({
                required: true,
                initial: 0,
                min: 0
            }),
            slots: new NumberField({
                required: true,
                initial: 0,
                min: 0
            })
        }
    }
}