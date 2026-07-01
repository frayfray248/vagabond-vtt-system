import SystemActor from "../document";
import HeroDataModel, { HeroSystemData } from "./model";

export default class Hero extends SystemActor<HeroDataModel> {

    prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}