import App from "./sheet.svelte";
import Nonhero from "./document";
import { SystemActorSheet } from "../sheet";
import { NonHeroSystemData } from "./model";

export type NonheroSheetData = {
    name: string;
    system: NonHeroSystemData;
}

export class NonheroSheet extends SystemActorSheet<NonheroSheetData, Nonhero> {

    constructor(data: Nonhero, options: ActorSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            types: ["nonhero"],
        })
    }
}
