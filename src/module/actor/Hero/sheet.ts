import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";
import SystemActor from "@/module/actor/document";

export type HeroSheetData = {
    name: string
    system: HeroSystemData
    img: string
}

export class HeroSheet extends SystemActorSheet<HeroSheetData, "hero"> {

    constructor(data: SystemActor<"hero">, options: ActorSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            
            types: ["hero"],
        })
    }

}