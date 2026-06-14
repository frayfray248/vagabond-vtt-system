import InventoryItemDataModel from "../model";

export default class ArmorDataModel extends InventoryItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}
