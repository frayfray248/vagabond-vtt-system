<script lang="ts">
    import SheetBox from "@/ui/components/SheetBox.svelte";
    import FlexBox from "@/ui/components/layout/FlexBox.svelte";
    import HeroInfoGrid from "@/ui/components/Actor/Hero/HeroInfoGrid.svelte";
    import StatBox from "@/ui/components/Actor/Hero/StatBox.svelte";

    import type { HeroSheetData } from "@/module/actor/Hero/sheet";
    import Input from "@/ui/components/form/Input.svelte";
    export let sheetData: HeroSheetData;
</script>

<SheetBox class="tw:col-2 tw:row-1 tw:h-full">
    <FlexBox direction="col" gap="1">
        <FlexBox direction="row" gap="2" className="tw:flex-1">
            <div
                class="tw:h-29 tw:overflow-hidden tw-border tw-border-[#ffffff33]"
            >
                <img
                    class="tw:h-full tw:w-full tw:object-cover tw:object-center"
                    src={sheetData.img}
                    alt={sheetData.name}
                    data-edit="img"
                    style=""
                />
            </div>
            <FlexBox direction="col" gap="1" className="tw:flex-1">
                <h1 class="tw:border-b-0 tw:mb-0">{sheetData.name}</h1>
                <HeroInfoGrid {sheetData} />
            </FlexBox>
        </FlexBox>
        <div class="tw:grid tw:grid-cols-6 tw:gap-1">
            <StatBox name="might" value={sheetData.system.stats.might} />
            <StatBox name="dexterity" value={sheetData.system.stats.dexterity} />
            <StatBox name="awareness" value={sheetData.system.stats.awareness} />
            <StatBox name="reason" value={sheetData.system.stats.reason} />
            <StatBox name="presence" value={sheetData.system.stats.presence} />
            <StatBox name="luck" value={sheetData.system.stats.luck} />
        </div>
    </FlexBox>
</SheetBox>
