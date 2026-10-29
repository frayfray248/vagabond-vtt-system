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

export default class InventoryItemDataModel extends SystemItemDataModel<InventoryItemDataSchema, InventoryItemSystemData> {
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