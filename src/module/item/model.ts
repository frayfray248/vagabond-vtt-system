import SystemBaseDataModel from "@/module/model";

export default class SystemItemDataModel<
    Schema extends foundry.data.fields.DataSchema = {},
    SystemDataType extends Record<string, unknown> = {}
> extends SystemBaseDataModel<Schema, SystemDataType> {
    static defineSchema() {
        return {
        }
    }
}