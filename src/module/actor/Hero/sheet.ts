import App from "./sheet.svelte";
import { SystemActorSheet } from "../sheet";
import { HeroSystemData } from "./model";
import SystemActor from "@/module/actor/document";
import { Component } from "svelte";
import { renderNumberEditor } from "@/lib/utils";

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
            rollSkillCheck: this.#onRollSkillCheck,
            edit: this.#edit,
            incdec: this.#incDec,
            piptrack: this.onPipTrackChange,
        }
    };

    static async #onRollSkillCheck(this: HeroSheet, event: PointerEvent, target: HTMLElement) {
        event.preventDefault();

        const skill = target.dataset.skill;
        const checkMod = target.dataset.checkMod as "favoured" | "hindered";
        if (!skill) return;
        await (this.document as SystemActor<"hero">).rollSkillCheck(skill, checkMod);

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
}