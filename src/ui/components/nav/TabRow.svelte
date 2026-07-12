<script lang="ts">
    import FlexBox from "@/ui/components/layout/FlexBox.svelte";

    export let tabs: string[] = [];
    export let onTabChange: (index: number) => void = () => {};

    let selectedTabIndex = 0;

    const handleTabClick = (index: number) => {
        selectedTabIndex = index;
        onTabChange(index);
    };

</script>


<FlexBox direction="row" justify="evenly">
    {#each tabs as tab, index}
        <div
            class="tw:mr-2 tw:cursor-pointer tw:rounded tw:px-2 tw:py-1 tw:text-sm   hover:tw:bg-[#ffffff22] {selectedTabIndex === index ? 'tw:font-bold' : ''}"
            on:click={() => handleTabClick(index)}
        >
            {tab}
        </div>
    {/each}
</FlexBox>