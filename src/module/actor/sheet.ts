import { Component, mount } from "svelte";
import SystemActor from "./document";

export class SystemActorSheet<
    SheetData,
    SubType extends Actor.SubType = Actor.SubType,
> extends foundry.appv1.sheets.ActorSheet {

    App: Component<{ sheetData: SheetData }> | null

    constructor(data: SystemActor<SubType>, options: ActorSheet.Options) {
        super(data, options);
        this.App = null;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/vagabond-vtt-system/templates/sheet.hbs",
            height: 600,
            width: 800,
            resizable: true,
        })
    }

    getDocument (): SystemActor<SubType> {
        return this.document as SystemActor<SubType>;
    }

    getData(): ReturnType<SystemActor<SubType>["toPlainObject"]> {
        const actor = this.getDocument();
        
        return actor.toPlainObject() as ReturnType<SystemActor<SubType>["toPlainObject"]>;
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