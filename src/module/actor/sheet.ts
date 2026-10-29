import { Component, flushSync, mount, unmount } from "svelte";
import SystemActor from "./document";
import { DeepPartial } from "fvtt-types/utils";
import { HeroSheetData } from "@/module/actor/Hero/sheet";
import SvelteApplicationMixin from "@/module/api/svelte-application";

const ActorSheetV2 = foundry.applications.sheets.ActorSheetV2
type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
type RenderContext = foundry.applications.sheets.ActorSheetV2.RenderContext;

export class SystemActorSheet<
    AppData,
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

        const context = (await super._prepareContext(options)) as RenderContext & { sheetData?: AppData };
        const actor = this.document as unknown as SystemActor<SubType>;

        context.sheetData = actor.toPlainObject() as unknown as AppData;

        return context;
    }

}