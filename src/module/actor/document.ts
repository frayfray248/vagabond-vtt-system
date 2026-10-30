import { HeroSystemData } from "@/module/actor/Hero/model";
import { SystemActorSystemData } from "@/module/actor/model";
import SystemItem, { INVENTORY_ITEM_TYPES } from "@/module/item/document";

export default class SystemActor<
    SystemActorType extends Actor.SubType = Actor.SubType,
> extends Actor<SystemActorType> {

    toPlainObject() {
        const system = this.system
        return {
            system: system.toPlainObject() as ReturnType<typeof system["toPlainObject"]>,
            name: this.name,
            img: this.img,
            inventory: {
                items: this.items.filter(item => item.type === "inventoryItem"
                ).map(item => (item as unknown as SystemItem<"inventoryItem">).toPlainObject()).sort((a, b) => a.name.localeCompare(b.name)),
                weapons: this.items.filter(item => item.type === "weapon"
                ).map(item => (item as unknown as SystemItem<"weapon">).toPlainObject()).sort((a, b) => a.name.localeCompare(b.name))
            }
        }
    }

    getRollData() {

        return this.system.toPlainObject() as SystemActorSystemData
    }

    #getCheckFormula(checkMod?: "favoured" | "hindered") {
        return "1d20" + (checkMod === "favoured" ? " + 1d6" : checkMod === "hindered" ? " -1d6" : "");
    }

    async rollSkillCheck(skill: string, checkMod?: "favoured" | "hindered") {

        if (this.type !== "hero") return;

        const system = this.system as HeroSystemData
        const difficulty = system.skills[skill as keyof HeroSystemData["skills"]].value

        const formula = this.#getCheckFormula(checkMod)

        const roll = await new Roll(formula).evaluate()

        const result = roll.total ?? 0
        const success = result > difficulty

        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this as Actor.Stored<"hero"> }),
            flavor: `${game!.i18n?.localize(`VAGABOND.Skills.${skill.capitalize()}.Long`)} (Target: ${difficulty}): ${success ? "Success" : "Failure"}`,
        })

    }

}