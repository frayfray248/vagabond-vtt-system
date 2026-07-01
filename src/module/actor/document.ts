import SystemActorDataModel, { SystemActorDataSchema, SystemActorSystemData } from "./model";

export default class SystemActor<
DataModelType extends SystemActorDataModel<SystemActorDataSchema, SystemActorSystemData>,
SystemActorType extends Actor.SubType = Actor.SubType,
> extends Actor<SystemActorType> {


    getSystem(): DataModelType {
        return this.system as DataModelType;
    }

    toPlainObject() {
        const system = this.getSystem();
        return {
            system: system.toPlainObject() as ReturnType<DataModelType["toPlainObject"]>,
            name: this.name,
        }
    }

    

}