import { SystemActorSystemData } from "@/module/actor/model";

export default class SystemActor<
SystemActorType extends Actor.SubType = Actor.SubType,
> extends Actor<SystemActorType> {

    toPlainObject() {
        const system = this.system
        return {
            system: system.toPlainObject() as ReturnType<typeof system["toPlainObject"]>,
            name: this.name,
            img: this.img,
        }
    }

    getRollData() {

        return this.system.toPlainObject() as SystemActorSystemData
    }

}