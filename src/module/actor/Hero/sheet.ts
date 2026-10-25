import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";
import SystemActor from "@/module/actor/document";
import { mount } from "svelte";
import { renderDialog, renderNumberEditor } from "@/lib/utils";
import NumberEditorDialog from "@/ui/components/Actor/Hero/dialogs/NumberEditorDialog.svelte";

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
        html.on("click", '.edit', this.onEdit.bind(this))
        html.on("click", '.incdec', this.onIncDec.bind(this))
        html.on("piptrack:change", ".piptrack", this.onPipTrackChange.bind(this));

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

    onPipTrackChange(event: JQuery.TriggeredEvent) {
        const { value, name } = (
            event.originalEvent as CustomEvent<{ value: number, name: string }>
        ).detail;

        if (name !== "fatigue") return;

        const newValue = Math.max(0, value);
        this.document.update({ system: { fatigue: newValue } });
    }

    onIncDec(event: JQuery.ClickEvent) {
        event.preventDefault();

        const element = event.currentTarget as HTMLElement | null;
        if (!element) return;

        const dataset = element.dataset;
        const target = dataset.incdecTarget;
        const value = Number(dataset.incdec);
        if (!target || !Number.isFinite(value)) return;

        if (target !== "luckPool") return;

        const current = (this.document as SystemActor<"hero">).system[target] ?? 0;
        const newValue = Math.max(0, current + value);
        this.document.update({ system: { [target]: newValue } });
    }


    onEdit(event: JQuery.ClickEvent) {
        event.preventDefault();

        const element = event.currentTarget as HTMLElement | null;
        if (!element) return;

        const dataset = element.dataset;

        const target = dataset.editTarget;
        if (!target) return;

        if (target !== "hp" && target !== "mana") return;

        renderNumberEditor({
            name: target,
            value: (this.document as SystemActor<"hero">).system[target].current,
            onSubmit: async (value) => {
                try {
                    const newValue = Math.max(0, Math.trunc(value));
                    await this.document.update({ system: { [target]: { current: newValue } } });

                } catch (error) {
                    console.error(`Error updating ${target}:`, error);
                }

            }
        })


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