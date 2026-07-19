import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { NonHeroSystemData } from "./model";

export type NonheroSheetData = {
    name: string;
    system: NonHeroSystemData;
}

import SystemActor from "@/module/actor/document";

export class NonheroSheet extends SystemActorSheet<NonheroSheetData, "nonhero"> {

    constructor(data: SystemActor<"nonhero">, options: ActorSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            types: ["nonhero"],
        })
    }
}
