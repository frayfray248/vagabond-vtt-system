type SystemSubType = "base" | foundry.abstract.Document.ModuleSubType;

export default class SystemItem<SubType extends SystemSubType = SystemSubType> extends Item<SubType> {
    
}