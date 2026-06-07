import SystemItemDataModel from "../model";

export default class InventoryItemDataModel extends SystemItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}