import SystemItem from "./document";
import { DeepPartial } from "fvtt-types/utils";
import SvelteApplicationMixin from "@/module/api/svelte-application";

const ItemSheetV2 = foundry.applications.sheets.ItemSheetV2
type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
type RenderContext = foundry.applications.sheets.ItemSheetV2.RenderContext;

export class SystemItemSheet<
    SheetData,
    SubType extends Item.SubType = Item.SubType,
> extends SvelteApplicationMixin(ItemSheetV2) {

    static DEFAULT_OPTIONS = {
        tag: "form",
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        position: {
            width: 500,
            height: 400,
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
        const item = this.document as unknown as SystemItem<SubType>;

        foundry.utils.mergeObject(
            context,
            item.toPlainObject()
        )

        return context;
    }

}
