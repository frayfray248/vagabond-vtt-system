import { Component, mount } from "svelte";
import SystemItem from "./document";

export class SystemItemSheet<
    SheetData,
    SubType extends Item.SubType = Item.SubType,
> extends foundry.appv1.sheets.ItemSheet {

    App: Component<{ sheetData: SheetData }> | null

    constructor(data: SystemItem<SubType>, options: ItemSheet.Options) {
        super(data, options);
        this.App = null;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/vagabond-vtt-system/templates/sheet.hbs",
            height: 400,
            width: 500,
            resizable: true,
        })
    }

    getDocument(): SystemItem<SubType> {
        return this.document as SystemItem<SubType>;
    }

    getData(): ReturnType<SystemItem<SubType>["toPlainObject"]> {
        const item = this.getDocument();

        return item.toPlainObject() as ReturnType<SystemItem<SubType>["toPlainObject"]>;
    }

    protected mountApp(html: JQuery) {

        if (!this.App) return;

        html.find(".window-content")
        .css({ padding: 0, background: "#000000" })

        mount(this.App, {
            target: html.find("form")[0],
            props: {
                sheetData: this.getData() as SheetData,
            }
        })

    }

    async _injectHTML(html: JQuery) {
        // html here is the whole sheet window

        super._injectHTML(html);
        this.mountApp(html);

    }

    async _replaceHTML(element: JQuery, html: JQuery) {
        // html here is just the handlebars template content for some reason.
        // element is the whole sheet window

        super._replaceHTML(element, html);
        this.mountApp(element);

    }

}
