import App from "./sheet.svelte";
import Hero from "./document";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";

export type HeroSheetData = {
    name: string;
    system: HeroSystemData
}

export class HeroSheet extends SystemActorSheet<HeroSheetData, Hero> {

    constructor(data: Hero, options: ActorSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/vagabond-vtt-system/templates/sheet.hbs",
            types: ["hero"],
        })
    }

}