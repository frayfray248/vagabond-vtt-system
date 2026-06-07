import InventoryItemDataModel from "../model";

export default class AlchemicalItemDataModel extends InventoryItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}
