type SystemSubType = "base" | foundry.abstract.Document.ModuleSubType;

export default class SystemActor<SubType extends SystemSubType = SystemSubType> extends Actor<SubType> {
    
}