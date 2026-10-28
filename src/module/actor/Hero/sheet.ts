import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";
import SystemActor from "@/module/actor/document";
import { Component, mount } from "svelte";
import { renderDialog, renderNumberEditor } from "@/lib/utils";
import NumberEditorDialog from "@/ui/components/Actor/Hero/dialogs/NumberEditorDialog.svelte";
import SystemItem from "@/module/item/document";

export type HeroSheetData = {
    name: string
    system: HeroSystemData
    img: string,
}

export class HeroSheet extends SystemActorSheet<HeroSheetData, "hero"> {

    svelteApp: Component<{ sheetData: HeroSheetData }> | null = App

    static DEFAULT_OPTIONS = {
        ...super.DEFAULT_OPTIONS,
        actions: {
            roll: this.#roll,
            edit: this.#edit,
            incdec: this.#incDec,
            piptrack: this.onPipTrackChange,
        }
    };

    // /** @override */
    // activateListeners(html: JQuery): void {
    //     super.activateListeners(html);

    //     html.on("click", '.rollable', this._onRoll.bind(this))
    //     html.on("click", '.edit', this.onEdit.bind(this))
    //     html.on("click", '.incdec', this.onIncDec.bind(this))
    //     html.on("piptrack:change", ".piptrack", this.onPipTrackChange.bind(this));

    // }

    async #handleTargetedRoll(target: number, formula: string, label: string) {

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

    static onPipTrackChange(this: HeroSheet, event: PointerEvent, target: HTMLElement) {

        const value = Number(target.dataset.value);
        const name = target.dataset.name;

        if (name !== "fatigue") return;

        const newValue = Math.max(0, value);
        this.document.update({ system: { fatigue: newValue } });
    }

    static async #incDec(this: HeroSheet, event: PointerEvent, target: HTMLElement) {
        event.preventDefault();

        const dataset = target.dataset;
        const incdecTarget = dataset.incdecTarget;
        const value = Number(dataset.incdec);
        if (!target || !Number.isFinite(value)) return;

        if (incdecTarget !== "luckPool") return;

        const current = (this.document as SystemActor<"hero">).system[incdecTarget] ?? 0;
        const newValue = Math.max(0, current + value);
        this.document.update({ system: { [incdecTarget]: newValue } });
    }


    static async #edit(this: HeroSheet, event: PointerEvent, target: HTMLElement) {
        event.preventDefault();

        const dataset = target.dataset;

        const editTarget = dataset.editTarget;
        if (!editTarget) return;

        if (editTarget !== "hp" && editTarget !== "mana") return;

        renderNumberEditor({
            name: editTarget,
            value: (this.document as SystemActor<"hero">).system[editTarget].current,
            onSubmit: async (value) => {
                try {
                    const newValue = Math.max(0, Math.trunc(value));
                    await this.document.update({ system: { [editTarget]: { current: newValue } } });

                } catch (error) {
                    console.error(`Error updating ${editTarget}:`, error);
                }

            }
        })


    }

    static async #roll(this: HeroSheet, event: PointerEvent, target: HTMLElement) {
        event.preventDefault();

        const dataset = target.dataset;

        const formula = dataset.rollFormula ?? "1d20";
        const rollTarget = dataset.rollTarget;
        const label = dataset.rollLabel ?? "Roll";

        if (rollTarget) await this.#handleTargetedRoll(Number(rollTarget), formula, label);
        else {
            const roll = new Roll(formula, this.document.getRollData());
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor as Actor.Stored<"hero"> }),
                flavor: label,
            });
        }
    }
}