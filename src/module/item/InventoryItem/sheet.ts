import App from "./sheet.svelte";
import { SystemItemSheet } from "../sheet";
import { InventoryItemSystemData } from "./model";
import SystemItem from "@/module/item/document";

export type InventoryItemSheetData = {
    name: string;
    system: InventoryItemSystemData;
    img: string;
}

export class InventoryItemSheet extends SystemItemSheet<InventoryItemSheetData, "inventoryItem"> {

    constructor(data: SystemItem<"inventoryItem">, options: ItemSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            types: ["inventoryItem", "weapon", "armor", "alchemicalItem"],
            submitOnChange: true,
            closeOnSubmit: false,
        })
    }
}
