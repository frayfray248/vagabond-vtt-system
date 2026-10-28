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

// type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
// type RenderContext = foundry.applications.sheets.ActorSheetV2.RenderContext;

// export class SystemActorSheet<
//     SheetData,
//     SubType extends Actor.SubType = Actor.SubType,
// > extends foundry.applications.sheets.ActorSheetV2 {

//     App: Component<{ sheetData: SheetData }> | null = null
//     component: {} | null = null

//     static DEFAULT_OPTIONS = {
//         position: {
//             width: 800,
//             height: 600,
//         },
//         window: {
//             resizable: true,
//         }
//     }

//     getDocument(): SystemActor<SubType> {
//         return this.document as SystemActor<SubType>;
//     }

//     override async _prepareContext(options: DeepPartial<RenderOptions> & { isFirstRender: boolean }): Promise<RenderContext> {

//         const context = (await super._prepareContext(options)) as RenderContext & { sheetData?: SheetData };
//         const actor = this.getDocument();

//         context.sheetData = actor.toPlainObject() as unknown as SheetData;

//         return context;
//     }


//     async _renderHTML(context: RenderContext & { sheetData: SheetData }, options: DeepPartial<foundry.applications.api.ApplicationV2.RenderOptions>) {

//         if (!this.App) return;

//         const root = $(`#${context.rootId}`);

//         root.css("padding", "0");
//         root.css("background", "#000000");

//         if (!this.component) {
//             this.component = mount(this.App, {
//                 target: root[0],
//                 props: {
//                     sheetData: context.sheetData
//                 }
//             })
//         }

//     }

//     async _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: DeepPartial<foundry.applications.api.ApplicationV2.RenderOptions>) {


//         flushSync();
//     }

//     _onClose(options: any) {
//         if (this.component) {
//             void unmount(this.component);
//             this.component = null;
//         }
//         super._onClose(options);
//     }

// }