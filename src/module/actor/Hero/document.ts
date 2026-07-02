import SystemActor from "../document";
import HeroDataModel, { HeroSystemData } from "./model";

export default class Hero extends SystemActor<"hero"> {

    prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}