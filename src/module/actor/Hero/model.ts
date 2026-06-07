import SystemActorDataModel from "../model";

const { SchemaField, NumberField } = foundry.data.fields;

export default class HeroDataModel extends SystemActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}