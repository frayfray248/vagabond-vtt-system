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

    

}