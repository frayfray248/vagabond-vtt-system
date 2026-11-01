import App from "./sheet.svelte";
import { SystemItemSheet } from "../../sheet";
import { Component } from "svelte";
import type { WeaponSystemData } from "./model";

export type WeaponSheetData = {
    name: string;
    img: string;
    system: WeaponSystemData;
}

export class WeaponSheet extends SystemItemSheet<WeaponSheetData, "weapon"> {

    svelteApp: Component<{ sheetData: WeaponSheetData }> | null = App

}
