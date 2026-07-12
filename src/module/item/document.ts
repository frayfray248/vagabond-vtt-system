export default class SystemItem<SubType extends Item.SubType = Item.SubType> extends Item<SubType> {

    toPlainObject() {
        const system = this.system
        return {
            system: system.toPlainObject() as ReturnType<typeof system["toPlainObject"]>,
            name: this.name,
            img: this.img,
        }
    }
    
}