import InventoryItemDataModel from "../model";

export default class WeaponDataModel extends InventoryItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema()
        }
    }
}