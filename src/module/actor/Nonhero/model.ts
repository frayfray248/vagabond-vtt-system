import SystemActorDataModel from "../model";

const { SchemaField, NumberField } = foundry.data.fields;

export default class NonheroDataModel extends SystemActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}