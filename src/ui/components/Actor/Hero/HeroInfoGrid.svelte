<script lang="ts">

    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import { ACTOR_SIZE } from "@/module/actor/model";
    import Input from "@/ui/components/form/Input.svelte";
    import Select from "@/ui/components/form/Select.svelte";
    export let sheetData: HeroSheetData;
</script>

<div class="tw:grid tw:h-20 tw:grid-cols-3 tw:grid-rows-2">
    <div class="tw:border-t-2 tw:border-r-2 tw:border-[#cfcfcf]">
       <Input
            name="system.size"
            value={sheetData.system.size}
            label="Size"
            placeholder="Enter size"
        />
    </div>
    <div class="tw:border-t-2 tw:border-r-2 tw:border-[#cfcfcf]">
        <Input
            name="system.beingType"
            value={sheetData.system.beingType}
            label="Being Type"
            placeholder="Enter being type"
        />
    </div>
    <div class="tw:border-t-2 tw:border-[#cfcfcf]">
        <Input
            name="system.ancestry"
            value="Human"
            label="Ancestry"
            placeholder="Enter ancestry"
        />
    </div>
    <div class="tw:border-t-2 tw:border-r-2 tw:border-[#cfcfcf]">
        <Input
            name="system.level"
            value={sheetData.system.level}
            label="Level"
            placeholder="Enter level"
        />
    </div>
    <div class="tw:border-t-2 tw:border-r-2 tw:border-[#cfcfcf]">
        <Input
            name="system.class"
            value="Warrior"
            label="Class"
            placeholder="Enter class"
        />
    </div>
    <div class="tw:border-t-2 tw:border-[#cfcfcf]">
        <Input
            name="system.xp"
            value={sheetData.system.xp}
            label="XP"
            placeholder="Enter XP"
        />
    </div>
</div>
