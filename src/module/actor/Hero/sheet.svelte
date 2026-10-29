<script lang="ts">
    import HeroInfoSection from "@ui/components/Actor/Hero/HeroInfoSection.svelte";
    import HeroCombatPanel from "@ui/components/Actor/Hero/CombatPanel/HeroCombatPanel.svelte";
    import HeroSkillsPage from "@ui/components/Actor/Hero/pages/HeroSkillsPage.svelte";
    import HeroAttacksPage from "@ui/components/Actor/Hero/pages/HeroAttacksPage.svelte";
    import HeroInventoryPage from "@ui/components/Actor/Hero/pages/HeroInventoryPage.svelte";
    import HeroAbilitiesPage from "@ui/components/Actor/Hero/pages/HeroAbilitiesPage.svelte";
    import HeroMagicPage from "@ui/components/Actor/Hero/pages/HeroMagicPage.svelte";
    import SheetBox from "@ui/components/SheetBox.svelte";
    import type { HeroSheetData } from "./sheet";
    import TabRow from "@ui/components/nav/TabRow.svelte";

    export let sheetData: HeroSheetData;
    export let uiState: { selectedTabIndex?: number } = {};

    let selectedTabIndex = uiState.selectedTabIndex ?? 0;

    const handleTabChange = (index: number) => {
        selectedTabIndex = index;
        uiState.selectedTabIndex = index;
    };
</script>

<div
    class="tw:grid tw:w-full tw:min-h-[78vh] tw:box-border tw:gap-2 tw:bg-[#000000] tw:p-2 tw:grid-cols-[minmax(180px,20%)_1fr] tw:grid-rows-[minmax(200px,25%)_1fr] tw:text-black"
    data-has-sheet={sheetData ? "1" : "0"}
>
    <HeroCombatPanel system={sheetData.system} />
    <HeroInfoSection sheetData={sheetData} />
    <SheetBox class="tw:col-2 tw:row-2 tw:flex tw:flex-col tw:min-h-0">
        <div class="tw:shrink-0 tw:border-b tw:border-[#cfcfcf]"><TabRow tabs={["Skills", "Attacks", "Inventory", "Abilities", "Magic"]} onTabChange={handleTabChange} initialIndex={selectedTabIndex} /></div>
        <div class="tw:flex-1 tw:min-h-0 tw:overflow-y-auto">
        {#if selectedTabIndex === 0}
            <HeroSkillsPage sheetData={sheetData} />
        {:else if selectedTabIndex === 1}
            <HeroAttacksPage sheetData={sheetData}/>
        {:else if selectedTabIndex === 2}
            <HeroInventoryPage sheetData={sheetData} />
        {:else if selectedTabIndex === 3}
            <HeroAbilitiesPage sheetData={sheetData} />
        {:else}
            <HeroMagicPage sheetData={sheetData} />
        {/if}
        </div>
    </SheetBox>
</div>
