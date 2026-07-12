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

    let selectedTabIndex = 0;

    const handleTabChange = (index: number) => {
        selectedTabIndex = index;
    };
</script>

<div
    class="tw:grid tw:w-full tw:min-h-[78vh] tw:box-border tw:gap-2 tw:bg-[#000000] tw:p-2 tw:grid-cols-[minmax(180px,22%)_1fr] tw:grid-rows-[minmax(180px,25%)_1fr]"
    data-has-sheet={sheetData ? "1" : "0"}
>
    <HeroCombatPanel system={sheetData.system} />
    <HeroInfoSection sheetData={sheetData} />
    <SheetBox class="tw:col-2 tw:row-2">
        <TabRow tabs={["Skills", "Attacks", "Inventory", "Abilities", "Magic"]} onTabChange={handleTabChange} />

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
    </SheetBox>
</div>
