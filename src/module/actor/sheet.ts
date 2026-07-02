import { Component, mount } from "svelte";
import SystemActor from "./document";
import SystemActorDataModel, { SystemActorDataSchema, SystemActorSystemData } from "./model";

export class SystemActorSheet<
    SheetData,
    SystemActorType extends SystemActor,

> extends foundry.appv1.sheets.ActorSheet {

    App: Component<{ sheetData: SheetData }> | null

    constructor(data: SystemActorType, options: ActorSheet.Options) {
        super(data, options);
        this.App = null;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/vagabond-vtt-system/templates/sheet.hbs",
        })
    }

    getDocument (): SystemActorType {
        return this.document as SystemActorType;
    }

    getData(): ReturnType<SystemActorType["toPlainObject"]> {
        const actor = this.getDocument();
        return actor.toPlainObject() as ReturnType<SystemActorType["toPlainObject"]>;
    }


    protected mountApp(html: JQuery) {

        if (!this.App) return;

        html.find(".window-content").removeClass("window-content").addClass("tw:bg-gray-900 tw:p-4 tw:rounded-lg tw:shadow-md tw:overflow-y-auto");

        mount(this.App, {
            target: html.find("form")[0],
            props: {
                sheetData: this.getData() as SheetData,
            }
        })

    }

    async _injectHTML(html: JQuery) {

        super._injectHTML(html);
        this.mountApp(html);

    }

    async _replaceHTML(element: JQuery, html: JQuery) {

        super._replaceHTML(element, html);
        this.mountApp(html);
    }

}