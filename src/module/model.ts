export default abstract class SystemBaseDataModel<
    Schema extends foundry.data.fields.DataSchema,
    SystemDataType extends Record<string, unknown>
> extends foundry.abstract.TypeDataModel<Schema, any> {
    static defineSchema() {
        return {
        }
    }

    toPlainObject(): SystemDataType {
        const plainObject: unknown = {
            ...this,
        };

        return plainObject as SystemDataType;
    }
}