import { Component, flushSync, mount, unmount } from "svelte";
import SystemActor from "./document";
import { DeepPartial } from "fvtt-types/utils";
import { HeroSheetData } from "@/module/actor/Hero/sheet";
import SvelteApplicationMixin from "@/module/api/svelte-application";
import SystemItem from "@/module/item/document";

const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2
type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
type RenderContext = foundry.applications.sheets.ActorSheetV2.RenderContext;


export class SystemActorSheet<
    SheetData,
    SubType extends Actor.SubType = Actor.SubType
> extends SvelteApplicationMixin(ActorSheetV2) {

    static DEFAULT_OPTIONS = {
        tag: "form",
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        position: {
            width: 800,
            height: 600,
        },
        window: {
            resizable: true,
        }
    }

    get document() {
        return this.options.document
    }

    override async _prepareContext(options: DeepPartial<RenderOptions> & { isFirstRender: boolean }): Promise<RenderContext> {

        const context = (await super._prepareContext(options)) as RenderContext & SheetData;
        const actor = this.document as unknown as SystemActor<SubType>;

        foundry.utils.mergeObject(
            context, 
            actor.toPlainObject()
        )

        return context;
    }

}