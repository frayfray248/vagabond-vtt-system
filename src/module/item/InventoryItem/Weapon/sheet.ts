import App from "./sheet.svelte";
import { SystemItemSheet } from "../../sheet";
import SystemItem from "@/module/item/document";
import type { WeaponSystemData } from "./model";

export type WeaponSheetData = {
    name: string;
    img: string;
    system: WeaponSystemData;
}

export class WeaponSheet extends SystemItemSheet<WeaponSheetData, "weapon"> {

    constructor(data: SystemItem<"weapon">, options: ItemSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            types: ["weapon"],
            submitOnChange: true,
            closeOnSubmit: false,
        })
    }
}
