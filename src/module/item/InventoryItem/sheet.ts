import App from "./sheet.svelte";
import { SystemItemSheet } from "../sheet";
import { InventoryItemSystemData } from "./model";
import { Component } from "svelte";

export type InventoryItemSheetData = {
    name: string;
    system: InventoryItemSystemData;
    img: string;
}

export class InventoryItemSheet extends SystemItemSheet<InventoryItemSheetData, "inventoryItem"> {

    svelteApp: Component<{ sheetData: InventoryItemSheetData }> | null = App

}
