import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";
import SystemActor from "@/module/actor/document";

export type HeroSheetData = {
    name: string
    system: HeroSystemData
    img: string
}

export class HeroSheet extends SystemActorSheet<HeroSheetData, "hero"> {

    constructor(data: SystemActor<"hero">, options: ActorSheet.Options) {
        super(data, options);
        this.App = App;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {

            types: ["hero"],
        })
    }

    /** @override */
    activateListeners(html: JQuery): void {
        super.activateListeners(html);

        html.on("click", '.rollable', this._onRoll.bind(this))

    }

    async handleTargetedRoll(target: number, formula: string, label: string) {

        if (!Number.isFinite(target)) {
            ui.notifications?.warn("Roll target is missing or invalid.");
            return;
        }

        const roll = await new Roll(formula, this.document.getRollData()).evaluate();
        const total = roll.total ?? 0;
        const success = total > target;

        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor as Actor.Stored<"hero"> }),
            flavor: `${label} (Target: ${target}): ${success ? "Success" : "Failure"}`,
        });

    }

    async _onRoll(event: JQuery.ClickEvent) {
        event.preventDefault();
        const element = event.currentTarget as HTMLElement | null;
        if (!element) return;

        const dataset = element.dataset;

        const formula = dataset.rollFormula ?? "1d20";
        const target = dataset.rollTarget;
        const label = dataset.rollLabel ?? "Roll";

        if (target) await this.handleTargetedRoll(Number(target), formula, label);
        else {
            const roll = new Roll(formula, this.document.getRollData());
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor as Actor.Stored<"hero"> }),
                flavor: label,
            });
        }


    }

}